import mongoose, { Schema, Document } from 'mongoose';

export interface IBooking extends Document {
    user: mongoose.Types.ObjectId;
    room: mongoose.Types.ObjectId;
    checkInDate: Date;
    checkOutDate: Date;
    totalPrice: number;
    status: 'confirmed' | 'cancelled' | 'pending';
    paymentStatus: 'paid' | 'unpaid';
    createdAt: Date;
}

const BookingSchema: Schema = new Schema({
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    room: { type: Schema.Types.ObjectId, ref: 'Room', required: true },
    checkInDate: { type: Date, required: true },
    checkOutDate: { type: Date, required: true },
    totalPrice: { type: Number, required: true },
    status: { type: String, enum: ['confirmed', 'cancelled', 'pending'], default: 'pending' },
    paymentStatus: { type: String, enum: ['paid', 'unpaid'], default: 'unpaid' },
}, { timestamps: true });

export default mongoose.model<IBooking>('Booking', BookingSchema);
