import { Context } from "hono";
import {connectDb} from "../db/connectDb.ts";
import Project from "../model/Project.ts";
import { verifyToken } from "../auth/verifyToken.ts";

export const deleteProjectController = async (c: Context) => {
    console.log('Requesting to delete project with ID: ' + c.req.param('id'));
    try {
        const token = c.req.header()["authorization"].split(" ")[1];
        const payload = await verifyToken(token);

        if (!payload.iss) {
            c.status(401);
            return c.json({ message: "Unauthorized" });
        }

        await connectDb();

        const id = c.req.param('id');

        if (!id) {
            c.status(400);
            return c.json({ message: 'ID is required' });
        }

        const project = await Project.findOne({ _id: id });

        if (!project) {
            c.status(404);
            return c.json({ message: 'Project not found' });
        }

        await project.deleteOne();
        return c.json({ message: 'Project deleted' });
    } catch (error) {
        console.error(error);
    }
}