import { create, getNumericDate, Payload, Header} from "https://deno.land/x/djwt@v2.4/mod.ts";

const secretKey = Deno.env.get('JWT_SECRET_KEY');

async function generateToken(userId: string) {
    const encoder = new TextEncoder();
    const keyBuf = encoder.encode(secretKey);

    const key = await crypto.subtle.importKey(
        "raw",
        keyBuf,
        {name: "HMAC", hash: {name: "SHA-256"}},
        false,
        ["sign", "verify"]
    );

    const payload: Payload = {
        iss: userId,
        exp: getNumericDate(60 * 90),
    }

    const algorithm = "HS256";

    const header: Header = {
        alg: algorithm,
        typ: "JWT",
    };

    return await create(header, payload, key);
}

export { generateToken };