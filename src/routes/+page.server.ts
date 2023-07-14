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
    
    return { availableTodos, currentUser };
};

export const actions = {
    create: async (event) => {
    },
    delete: async (event) => { 
    },
    complete: async (event) => {
    }
}