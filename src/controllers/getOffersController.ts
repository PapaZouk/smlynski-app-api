import {Context, TypedResponse} from 'hono';
import {connectDb} from "../db/connectDb.ts";
import OfferSchema from "../model/Offer.ts";

export const getOffersController = async (c: Context): Promise<TypedResponse> => {
    try {
        await connectDb();
        const result = await OfferSchema.find({});
        return c.json({ result });
    } catch (error) {
        console.error((error as Error).message);
        c.status(500);
        return c.json({ error: (error as Error).message });
    }
}
