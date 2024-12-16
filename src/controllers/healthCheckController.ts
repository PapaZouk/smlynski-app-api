import { Context } from "hono";
import { connectDb } from "../db/connectDb.ts";

export const healthCheckController = async (c: Context) => {
  try {
    await connectDb();

    return c.json({ status: "ok" });
  } catch (error) {
    console.error((error as Error).message);
    return c.json({
      status: 'Unhealthy',
      error: (error as Error).message,
    });
  }
};
