import { Context } from "hono";
import { verifyToken } from "../auth/verifyToken.ts";
import {connectDb} from "../db/connectDb.ts";
import Offer from "../model/Offer.ts";

export const deleteOfferController = async (c: Context) => {
  console.log("Requesting to delete offer with ID: " + c.req.param("id"));
  try {
    const token = c.req.header()["authorization"].split(" ")[1];
    const payload = await verifyToken(token);

    if (!payload.iss) {
      c.status(401);
      return c.json({ message: "Unauthorized" });
    }

    await connectDb();

    const id = c.req.param("id");

    if (!id) {
      c.status(400);
      return c.json({ message: "ID is required" });
    }

    const offer = await Offer.findOne({ _id: id });

    if (!offer) {
      c.status(404);
      return c.json({ message: "Offer not found" });
    }

    await offer.deleteOne();
    return c.json({ message: "Offer deleted" });
  } catch (error) {
    console.error(error);
  }
};
