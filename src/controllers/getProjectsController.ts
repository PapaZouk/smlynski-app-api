import {Context} from 'hono';
import {connectDb} from "../db/connectDb.ts";
import ProjectSchema from "../model/Project.ts";

export const getProjectsController =  async (c: Context) => {
    try {
        await connectDb();
        const result = await ProjectSchema.find({});
        return c.json({result});
    } catch (error) {
        console.error((error as Error).message);
        return c.json({ error });
    }
}
