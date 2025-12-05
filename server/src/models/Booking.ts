import mongoose, { Document, Schema } from 'mongoose';

export interface IBooking extends Document {
    user: mongoose.Types.ObjectId;
    room: string; // Can be ObjectId or mock hotel ID
    hotelName: string; // Store hotel name directly
    hotelImage?: string; // Store hotel image
    checkInDate: Date;
    checkOutDate: Date;
    totalPrice: number;
    status: 'pending' | 'confirmed' | 'cancelled';
    createdAt: Date;
    updatedAt: Date;
}

const BookingSchema: Schema = new Schema({
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    room: { type: String, required: true }, // Changed to String to support mock IDs
    hotelName: { type: String, required: true },
    hotelImage: { type: String },
    checkInDate: { type: Date, required: true },
    checkOutDate: { type: Date, required: true },
    totalPrice: { type: Number, required: true },
    status: { type: String, enum: ['pending', 'confirmed', 'cancelled'], default: 'confirmed' }
}, {
    timestamps: true
});

export default mongoose.model<IBooking>('Booking', BookingSchema);
