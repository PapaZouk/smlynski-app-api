import mongoose, { Schema, Document } from "mongoose";
import { Buffer } from 'npm:buffer';

export interface Project extends Document {
    name: string;
    description: string;
    details: string;
    date: Date;
    localization: string;
    images: {
        data: Buffer;
        fileName: string;
        contentType: string;
    }[];
}

const ProjectSchema: Schema = new Schema({
    name: { type: String, required: true },
    description: { type: String, required: true },
    details: { type: String, required: true },
    date: { type: Date, required: true },
    localization: { type: String, required: true },
    images: [
        {
            data: { type: Buffer, required: true },
            fileName: { type: String, required: true },
            contentType: { type: String, required: true },
        },
    ],
});

export default mongoose.model<Project>("Project", ProjectSchema);