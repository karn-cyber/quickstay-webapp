import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import { OAuth2Client } from 'google-auth-library';
import jwt from 'jsonwebtoken';
import User from '../models/User';

export const register = async (req: Request, res: Response) => {
    try {
        const { name, email, password } = req.body;

        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: 'User already exists' });
        }

        const hashedPassword = await bcrypt.hash(password, 12);

        const user = new User({
            name,
            email,
            password: hashedPassword,
        });

        await user.save();

        const token = jwt.sign(
            { userId: user._id, role: user.role },
            process.env.JWT_SECRET || 'supersecret',
            { expiresIn: '1h' }
        );

        res.status(201).json({ token, userId: user._id, role: user.role, name: user.name, email: user.email, picture: user.picture });
    } catch (error) {
        res.status(500).json({ message: 'Something went wrong' });
    }
};

export const login = async (req: Request, res: Response) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        const isPasswordCorrect = await bcrypt.compare(password, user.password!);
        if (!isPasswordCorrect) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        const token = jwt.sign(
            { userId: user._id, role: user.role },
            process.env.JWT_SECRET || 'supersecret',
            { expiresIn: '1h' }
        );

        res.status(200).json({ token, userId: user._id, role: user.role, name: user.name, email: user.email, picture: user.picture });
    } catch (error) {
        res.status(500).json({ message: 'Something went wrong' });
    }
};

const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

export const googleLogin = async (req: Request, res: Response) => {
    try {
        console.log('Google login request received');
        const { token } = req.body;
        console.log('Token received:', token ? token.substring(0, 10) + '...' : 'No token');
        console.log('Using Client ID:', process.env.GOOGLE_CLIENT_ID);

        const ticket = await client.verifyIdToken({
            idToken: token,
            audience: process.env.GOOGLE_CLIENT_ID,
        });
        const { name, email, picture } = ticket.getPayload()!;

        let user = await User.findOne({ email });

        if (!user) {
            user = new User({
                name,
                email,
                password: await bcrypt.hash(Math.random().toString(36).slice(-8), 12), // Random password for Google users
                role: 'user',
                picture,
            });
            await user.save();
        } else if (!user.picture && picture) {
            // Update picture if missing
            user.picture = picture;
            await user.save();
        }

        const jwtToken = jwt.sign(
            { userId: user._id, role: user.role },
            process.env.JWT_SECRET || 'supersecret',
            { expiresIn: '1h' }
        );

        res.status(200).json({ token: jwtToken, userId: user._id, role: user.role, picture: user.picture, name: user.name, email: user.email });
    } catch (error) {
        console.error('Google login error:', error);
        res.status(500).json({ message: 'Google login failed' });
    }
};
