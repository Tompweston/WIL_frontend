import { betterAuth } from "better-auth";
import { MongoClient } from "mongodb";
import { mongodbAdapter } from "better-auth/adapters/mongodb";
import { MONGODB_URI } from '$env/static/private';

// Single Mongo client for the server
const client = new MongoClient(MONGODB_URI);
const db = client.db();

export const auth = betterAuth({
  database: mongodbAdapter(db, { client }),

  emailAndPassword: {
    enabled: true,
    emailVerification: "disabled"
  },
  trustedOrigins: ['http://localhost:5174']
});