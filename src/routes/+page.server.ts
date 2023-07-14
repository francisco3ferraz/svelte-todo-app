import { verifyJWT } from '$lib/server/jwt.js';
import { redirect, type ServerLoadEvent } from '@sveltejs/kit';

export const load = async (event: ServerLoadEvent) => {
    const token = event.cookies.get('auth_token');

    if (!token) {
        throw redirect(301, '/');
    }

    return verifyJWT(token);
};

export const actions = {
    create: async (event) => {

    },
    update: async (event) => {
        
    },
    delete: async (event) => {
        
    }
}