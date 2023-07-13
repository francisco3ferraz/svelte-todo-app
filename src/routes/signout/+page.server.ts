import { redirect } from '@sveltejs/kit';

export const load = async (event) => {

    const token = event.cookies.set("auth_token", "");
  
    throw redirect(301, "/signin");
};