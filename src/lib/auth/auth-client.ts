import { createAuthClient } from 'better-auth/svelte';
import { PUBLIC_BASE_URL } from '$env/static/public';
export const authClient = createAuthClient({ baseURL: PUBLIC_BASE_URL });

// The authClient instance can now be used to sign in, sign up, and manage user sessions.