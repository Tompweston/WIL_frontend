import { createAuthClient } from 'better-auth/svelte';
import { PUBLIC_BETTER_AUTH_ORIGIN } from '$env/static/public';
import { dev } from '$app/environment';
export const authClient = createAuthClient({ baseURL: dev ? "https://localhost:5173" : PUBLIC_BETTER_AUTH_ORIGIN });

// The authClient instance can now be used to sign in, sign up, and manage user sessions.
