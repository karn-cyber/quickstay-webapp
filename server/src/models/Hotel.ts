import mongoose, { Document, Schema } from 'mongoose';

export interface IHotel extends Document {
    name: string;
    location: {
        address: string;
        latitude: number;
        longitude: number;
    };
    description: string;
    rating: number;
    price: number;
    images: string[];
    amenities: string[];
    createdAt: Date;
    updatedAt: Date;
}

const HotelSchema: Schema = new Schema({
    name: { type: String, required: true },
    location: {
        address: { type: String, required: true },
        latitude: { type: Number, required: true },
        longitude: { type: Number, required: true }
    },
    description: { type: String, required: true },
    rating: { type: Number, default: 0, min: 0, max: 5 },
    price: { type: Number, required: true, min: 0 },
    images: [{ type: String }],
    amenities: [{ type: String }]
}, {
    timestamps: true
});

// Add indexes for better query performance
HotelSchema.index({ name: 'text', description: 'text', 'location.address': 'text' });
HotelSchema.index({ price: 1 });
HotelSchema.index({ rating: -1 });

export default mongoose.model<IHotel>('Hotel', HotelSchema);
