import { betterAuth } from 'better-auth';
import { MongoClient } from 'mongodb';
import { mongodbAdapter } from 'better-auth/adapters/mongodb';
import { MONGODB_URI } from '$env/static/private';
import { getRequestEvent } from '$app/server';
import { sveltekitCookies } from 'better-auth/svelte-kit';

// Single Mongo client for the server
const client = new MongoClient(MONGODB_URI);
const db = client.db('ToDoDB');

//better Auth instance acting as the auth server
export const auth = betterAuth({
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

	trustedOrigins: ['http://localhost:5174'],

	plugins: [sveltekitCookies(getRequestEvent)]
});
