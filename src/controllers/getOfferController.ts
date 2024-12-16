import {Context} from "hono";
import {connectDb} from "../db/connectDb.ts";
import {ObjectId} from "mongodb";
import Offer from "../model/Offer.ts";

export const getOfferController = async (c: Context) => {
    try {
        await connectDb();
        const id = c.req.param('id');
        const result = await Offer.findOne({ _id: new ObjectId(id) });
        return c.json({ result });
    } catch (error) {
        console.error((error as Error).message);
        return c.json({ error: (error as Error).message });
    }
}
