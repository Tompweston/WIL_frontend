import { auth } from "$lib/auth/auth";
import { svelteKitHandler } from "better-auth/svelte-kit";
import { building } from "$app/environment";
import { redirect } from "@sveltejs/kit";

export async function handle({ event, resolve }) {

  if(event.url.pathname.endsWith("/")){
    // Fetch current session from Better Auth
    const session = await auth.api.getSession({
      headers: event.request.headers,
    });

    // Make session and user available on server
    if(!session){
        redirect(302, "/login")
    }
    
    event.locals.session = session.session;
    event.locals.user = session.user;
  }

  return svelteKitHandler({ event, resolve, auth, building });
}