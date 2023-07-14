import * as jose from 'jose'
import { JWT_SECRET } from "$env/static/private";
import { error } from '@sveltejs/kit';

type JWTPayload = {
    firstName: string;
    lastName: string;
    email: string;
    id: number;
}

export const createJWT = async (data: JWTPayload) => {
    const jwt = await new jose.SignJWT(data)
        .setProtectedHeader({alg: "HS256"})
        .sign(new TextEncoder().encode(JWT_SECRET));
    return jwt;
}

export const verifyJWT = async (token: string) => {
    try {
        const { payload } = await jose.jwtVerify(
            token,
            new TextEncoder().encode(JWT_SECRET)
        );
        return payload as JWTPayload;
    } catch {
        throw error(401, "You are not logged in!");
    }
}