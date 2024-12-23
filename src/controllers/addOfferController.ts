import {Context} from "hono";
import {connectDb} from "../db/connectDb.ts";
import Offer from "../model/Offer.ts";
import {Buffer} from 'npm:buffer';
import validateOffer from "../validators/offerValidator.ts";
import {verifyToken} from "../auth/verifyToken.ts";

export const addOfferController = async (c: Context) => {
  try {
    const token = c.req.header()["authorization"].split(" ")[1];
    const payload = await verifyToken(token);

    if (!payload.iss) {
        c.status(401);
        return c.json({ message: "Unauthorized" });
    }

    await connectDb();

    const data = await c.req.formData();

    if (!data.has("title") || !data.has("description") || !data.has("details") || !data.has("image")) {
        return c.json({ message: "All properties are required " });
    }

    const imageFile = data.get("image") as File;
    const imageBuffer = await imageFile.arrayBuffer();
    const imageData = new Uint8Array(imageBuffer);

    const offer = new Offer({
        title: data.get("title") as string,
        description: data.get("description") as string,
        details: data.get("details") as string,
        image: {
            data: Buffer.from(imageData),
            fileName: imageFile.name,
            contentType: imageFile.type
        },
    });

    const validationErrors = validateOffer(offer);

    if (validationErrors.length > 0) {
      return c.json({ errors: validationErrors });
    }

    await offer.save();

    return c.json({ message: "Offer added successfully" });
  } catch (error) {
    console.error((error as Error).message);
    return c.json({ error });
  }
};
