import pkg from "pg";
const { Pool } = pkg;
import dotenv from "dotenv"

dotenv.config();

const sql_pool = new Pool({
    user: process.env.DB_USER || "",
    host: process.env.DB_HOST || "",
    database: process.env.DB_NAME || "",
    password: process.env.DB_PASSWORD || "",
    port: Number(process.env.DB_PORT) || 5432,
    idleTimeoutMillis: process.env.idleTimeoutMillis || 30000,
    connectionTimeoutMillis: process.env.connectionTimeoutMillis || 6000
})
sql_pool.query("SELECT 1")
    .then(() => console.log("Connected to PostgreSQL"))
    .catch((err) => {
        console.error("PostgreSQL connection error:", err);
        process.exit(1);
    });
sql_pool.on("error", (err) => {
  console.error("Unexpected error on PostgreSQL client:", err);
  process.exit(-1);
});

const pool = {
    query: (sql, args) => sql_pool.query(sql, args),
    getClient: async () => {
        const client = await sql_pool.connect();
        return client;
    }
};

export default pool;
