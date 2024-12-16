import {Context} from "hono";
import {connectDb} from "../db/connectDb.ts";
import Feedback from "../model/Feedback.ts";
import validateFeedback from "../validators/feedbackValidator.ts";
import {verifyToken} from "../auth/verifyToken.ts";

export const addFeedbackController = async (c: Context) => {
    try {
        const token = c.req.header()['authorization'].split(' ')[1];
        const payload = await verifyToken(token);

        if (!payload.iss) {
            c.status(401);
            return c.json({message: 'Unauthorized'});
        }

        await connectDb();

        const request = await c.req.json();
        const feedback = new Feedback(request);
        const validationErrors = validateFeedback(feedback);

        if (validationErrors.length > 0) {
            return c.json({errors: validationErrors});
        }

        await feedback.save();

        return c.json({message: 'Feedback added successfully'});
    } catch (error) {
        console.error((error as Error).message);
        return c.json({error});
    }
}
