import {Context, TypedResponse} from 'hono';
import {connectDb} from "../db/connectDb.ts";
import Feedback from "../model/Feedback.ts";

export const getFeedbacksController = async (c: Context): Promise<TypedResponse> => {
    try {
        await connectDb();
        const result = await Feedback.find({});
        return c.json({result});
    } catch (error) {
        console.error((error as Error).message);
        return c.json({error});
    }
}
