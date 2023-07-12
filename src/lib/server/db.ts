import { drizzle } from 'drizzle-orm/postgres-js'
import postgres from 'postgres'
import { connectionString } from '$env/static/private'

const client = postgres(connectionString);
export const database = drizzle(client);