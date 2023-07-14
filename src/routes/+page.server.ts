import { database } from '$lib/server/db.js';
import { verifyJWT } from '$lib/server/jwt.js';
import { todos } from '$lib/server/schema.js';
import { redirect, type ServerLoadEvent } from '@sveltejs/kit';
import { eq } from 'drizzle-orm';

export const load = async (event: ServerLoadEvent) => {
    const token = event.cookies.get('auth_token');

    if (!token) {
        throw redirect(301, "/signin");
    }

    const currentUser = await verifyJWT(token);

    const availableTodos = await database
            .select({
                id: todos.id,
                title: todos.title,
                description: todos.description,
                completed: todos.completed,
            })
            .from(todos)
            .where(eq(todos.user_id, currentUser.id));
    
    return { availableTodos };
};

export const actions = {
    create: async ({ request, fetch, cookies }) => {
        const data = await request.formData();
        const todo = data.get("todo") || "";

        const token = cookies.get("auth_token");
        if (!token) {
          throw redirect(301, "/sign-in");
        }

        const currentUser = await verifyJWT(token);

        await database.insert(todos).values({
            title: todo.toString(),
            user_id: currentUser.id,
            completed: false,
        });

        return { success: true };
        
    },
    delete: async (event) => { 
    },
    complete: async (event) => {
    }
}