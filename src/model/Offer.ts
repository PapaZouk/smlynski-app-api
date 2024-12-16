import mongoose, { Schema, Document } from "mongoose";
import { Buffer } from 'npm:buffer';

export interface Offer extends Document{
    title: string;
    description: string;
    details: string;
    icon: string;
    image: {
        data: Buffer;
        fileName: string;
        contentType: string;
    };
}

const OfferSchema: Schema = new Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    details: { type: String, required: true },
    icon: { type: String, required: true },
    image: {
        data: { type: Buffer, required: true },
        fileName: { type: String, required: true },
        contentType: { type: String, required: true },
    },
});

export default mongoose.model<Offer>("Offer", OfferSchema);