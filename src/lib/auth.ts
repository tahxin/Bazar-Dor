import { betterAuth } from "better-auth";
import { MongoClient } from "mongodb";
import { mongodbAdapter } from "@better-auth/mongo-adapter";

const uri = process.env.MONGODB_URI || "mongodb://localhost:27017/better-auth-db";

const client = new MongoClient(uri);
const db = client.db(process.env.MONGODB_DB_NAME || "better-auth-db");

export const auth = betterAuth({
  emailAndPassword: {
    enabled: true,
  },
  database: mongodbAdapter(db),
  secret: process.env.BETTER_AUTH_SECRET || "bazar-dor-super-secret-jwt-key-2026-secure",
  baseURL: process.env.BETTER_AUTH_URL || "http://localhost:3000",
  socialProviders: {
    google: {
      clientId: process.env.GOOGLE_CLIENT_ID || "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
    },
    github: {
      clientId: process.env.GITHUB_CLIENT_ID || "",
      clientSecret: process.env.GITHUB_CLIENT_SECRET || "",
    },
  },
});

export type Session = typeof auth.$Infer.Session;
export { client, db };
