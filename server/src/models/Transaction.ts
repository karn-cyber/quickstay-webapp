import mongoose, { Schema, Document } from 'mongoose';

export interface ITransaction extends Document {
    booking: mongoose.Types.ObjectId;
    user: mongoose.Types.ObjectId;
    amount: number;
    type: 'payment' | 'refund';
    status: 'success' | 'failed' | 'pending';
    createdAt: Date;
}

const TransactionSchema: Schema = new Schema({
    booking: { type: Schema.Types.ObjectId, ref: 'Booking', required: true },
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    amount: { type: Number, required: true },
    type: { type: String, enum: ['payment', 'refund'], required: true },
    status: { type: String, enum: ['success', 'failed', 'pending'], default: 'pending' },
}, { timestamps: true });

export default mongoose.model<ITransaction>('Transaction', TransactionSchema);
