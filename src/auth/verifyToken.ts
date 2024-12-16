import { verify } from "https://deno.land/x/djwt@v2.4/mod.ts";

export async function verifyToken(token: string) {
    const secretKey = Deno.env.get('JWT_SECRET_KEY');
    const keyBuf = new TextEncoder().encode(secretKey);
    const key = await crypto.subtle.importKey(
        "raw",
        keyBuf,
        {name: "HMAC", hash: {name: "SHA-256"}},
        false,
        ["sign", "verify"]
    );
    return await verify(token, key);
}