import mongoose, { Schema, Document } from 'mongoose';

export interface IRoom extends Document {
    name: string;
    description: string;
    pricePerNight: number;
    capacity: number;
    amenities: string[];
    images: string[];
    isAvailable: boolean;
    createdAt: Date;
}

const RoomSchema: Schema = new Schema({
    name: { type: String, required: true },
    description: { type: String, required: true },
    pricePerNight: { type: Number, required: true },
    capacity: { type: Number, required: true },
    amenities: { type: [String], default: [] },
    images: { type: [String], default: [] },
    isAvailable: { type: Boolean, default: true },
}, { timestamps: true });

export default mongoose.model<IRoom>('Room', RoomSchema);
