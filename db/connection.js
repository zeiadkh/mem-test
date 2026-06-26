import "dotenv/config";
import { Pool } from "pg";

const requiredEnv = ["DB_USERNAME", "DB_HOST", "DB_DATABASE", "DB_PASSWORD"];
const missingEnv = requiredEnv.filter((name) => !process.env[name]);

if (missingEnv.length > 0) {
  throw new Error(`Missing required database environment variables: ${missingEnv.join(", ")}`);
}

const pool = new Pool({
  user: process.env.DB_USERNAME,
  host: process.env.DB_HOST,
  database: process.env.DB_DATABASE,
  password: process.env.DB_PASSWORD,
  port: 5432,
});

export default pool;
