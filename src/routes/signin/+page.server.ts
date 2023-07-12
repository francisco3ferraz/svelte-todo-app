import { database } from '$lib/server/db.js';
import { users } from '$lib/server/schema.js';
import { error, redirect } from '@sveltejs/kit';
import { eq } from 'drizzle-orm';
import bcrypt from 'bcryptjs'
import { createAuthJWT } from '$lib/server/jwt.js';

export const load = async (event) => {

    const token = event.cookies.get("auth_token");
  
    if (token && token !== "") {
      throw redirect(301, "/");
    }
};

export const actions = {
    default: async (event) => {
        const data = await event.request.formData();
        const email = data.get("email");
        const password = data.get("password");

        if (!email || !password) {
            throw error(400, "Must provide an email and password")
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

        if ( user.length === 0) {
            throw error(404, "Account not found");
        }

        const passwordIsRight = await bcrypt.compare(
            password.toString(),
            user[0].password
        );

        if (!passwordIsRight) {
            throw error(400, "Incorrect password.");
        }

        const token = await createAuthJWT({
            firstName: user[0].first_name,
            lastName: user[0].last_name,
            email: user[0].email,
            id: user[0].id,
          });

        event.cookies.set(
            "auth_token", 
            token, {
                path: "/"
            }
        )

        throw redirect(301, "/profile");
    
    }
}