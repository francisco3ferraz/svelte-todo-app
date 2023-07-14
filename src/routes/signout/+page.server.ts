import { redirect, type ServerLoadEvent } from '@sveltejs/kit';

export const load = async (event: ServerLoadEvent) => {

    const token = event.cookies.set("auth_token", "");
  
    throw redirect(301, "/signin");
};