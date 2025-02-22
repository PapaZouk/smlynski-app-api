import { Context } from "hono";
import Project from "../model/Project.ts";
import { connectDb } from "../db/connectDb.ts";
import { Buffer } from "npm:buffer";
import validateProject from "../validators/projectValidator.ts";
import { verifyToken } from "../auth/verifyToken.ts";

export const addProjectController = async (c: Context) => {
    console.log('Requesting to add project');
    try {
        const token = c.req.header()["authorization"].split(" ")[1];
        const payload = await verifyToken(token);

        if (!payload.iss) {
            c.status(401);
            return c.json({ message: "Unauthorized" });
        }

        await connectDb();

        const data = await c.req.formData();

        if (
            !data.has("name") ||
            !data.has("description") ||
            !data.has("details") ||
            !data.has("date") ||
            !data.has("localization")
        ) {
            return c.json({ message: "All properties are required", data: data });
        }

        const imageFiles = data.getAll("images") as File[];

        if (imageFiles.length === 0) {
            return c.json({ errors: ["Image is required."] });
        }

        const images = await Promise.all(imageFiles.map(async (imageFile) => {
            const imageBuffer = await imageFile.arrayBuffer();
            const imageData = new Uint8Array(imageBuffer);
            return {
                data: Buffer.from(imageData),
                fileName: imageFile.name,
                contentType: imageFile.type,
            };
        }));

        const project = new Project({
            name: data.get("name") as string,
            description: data.get("description") as string,
            details: data.get("details") as string,
            date: new Date(data.get("date") as string),
            localization: data.get("localization") as string,
            images: images,
        });

        const validationErrors = validateProject(project);

        if (validationErrors.length > 0) {
            return c.json({ errors: validationErrors });
        }

        await project.save();

        return c.json({ message: "Project added successfully" });
    } catch (error) {
        console.error((error as Error).message);
        return c.json({ error });
    }
}