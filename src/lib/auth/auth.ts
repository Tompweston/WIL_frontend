import { betterAuth } from 'better-auth';
import { MongoClient } from 'mongodb';
import { mongodbAdapter } from 'better-auth/adapters/mongodb';

import { getRequestEvent } from '$app/server';
import { sveltekitCookies } from 'better-auth/svelte-kit';

import { dev } from '$app/environment';
import { MONGODB_URI } from '$env/static/private';
import { BETTER_AUTH_SECRET } from '$env/static/private';
import { PUBLIC_BETTER_AUTH_ORIGIN } from '$env/static/public';

// Single Mongo client for the server
const client = new MongoClient(MONGODB_URI);
const db = client.db('ToDoDB');

//better Auth instance acting as the auth server
export const auth = betterAuth({
	secret: BETTER_AUTH_SECRET,
	database: mongodbAdapter(db, { client }),
	emailAndPassword: {
		enabled: true,
		emailVerification: 'disabled'
	},
	user: {
		deleteUser: {
			enabled: true
		}
	},

	trustedOrigins: [dev ? 'http://localhost:5173' : PUBLIC_BETTER_AUTH_ORIGIN],

	plugins: [sveltekitCookies(getRequestEvent)]
});
