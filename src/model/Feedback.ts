import mongoose, {Document, Schema} from "mongoose";

export interface Feedback extends Document {
    name: string;
    surname: string;
    company: string;
    message: string;
}

const FeedbackSchema: Schema = new Schema({
    name: { type: String, required: true },
    surname: { type: String, required: true },
    company: { type: String, required: true },
    message: { type: String, required: true },
});

export default mongoose.model<Feedback>("Feedback", FeedbackSchema);