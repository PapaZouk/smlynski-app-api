import { Context } from "hono";
import { connectDb } from "../db/connectDb.ts";
import { ObjectId } from "mongodb";
import ProjectSchema from "../model/Project.ts";

export const getProjectController = async (c: Context) => {
    try {
        await connectDb();
        const id = c.req.param('id');
        const result = await ProjectSchema.findOne({ _id: new ObjectId(id) });
        return c.json({ result });
    } catch (error) {
        console.error((error as Error).message);
        return c.json({ error: (error as Error).message });
    }
}
