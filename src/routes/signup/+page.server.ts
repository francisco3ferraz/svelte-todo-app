import { database } from '$lib/server/db.js';
import { createJWT } from '$lib/server/jwt.js';
import { users } from '$lib/server/schema.js';
import { error, redirect } from '@sveltejs/kit';
import bcrypt from 'bcryptjs';
import { eq } from 'drizzle-orm';

export const config = {
    runtime: "nodejs18.x",
};

export const load = async (event) => {

    const token = event.cookies.get("auth_token");
  
    if (token && token !== "") {
      throw redirect(301, "/");
    }
};

export const actions = {
    default: async (event) => {
        const data = await event.request.formData();
        const first_name = data.get("first_name");
        const last_name = data.get("last_name");
        const email = data.get("email");
        const password = data.get("password");

        if (!email || !password || !first_name || !last_name) {
            throw error(400, "Must provide valid credentials!");
        }

        const user = await database
            .select({
                email: users.email,
                password: users.password,
                first_name: users.first_name,
                last_name: users.last_name,
                id: users.id
            })
            .from(users)
            .where(eq(users.email, email.toString()))
            .limit(1);

        if ( user.length !== 0) {
            throw error(404, "Email already registered");
        }

        const hashedPassword = bcrypt.hashSync(password?.toString(), 10);

        const newUserId = await database.insert(users)
            .values({
                first_name: first_name.toString(),
                last_name: last_name.toString(),
                email: email.toString(),
                password: hashedPassword,
            }).returning({ insertedId: users.id });;
        
        const token = await createJWT({
            firstName: first_name.toString(),
            lastName: last_name.toString(),
            email: email.toString(),
            id: parseInt(newUserId.toString()),
        });
    
        event.cookies.set("auth_token", token, {
            path: "/",
        });
    
        throw redirect(301, "/profile");
    }
}