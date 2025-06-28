require('dotenv').config();
const sql = require('mssql');

const dbConfig = {
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    server: process.env.DB_SERVER,
    database: process.env.DB_DATABASE,
    port: parseInt(process.env.DB_PORT, 10),
    options: {
        encrypt: process.env.DB_ENCRYPT === 'true',
        trustServerCertificate: process.env.DB_TRUST_CERT === 'true'
    }
};

async function connectDB() {
    try {
        const pool = await sql.connect(dbConfig);
        console.log("✅ Connected to Azure SQL");
        return pool;
    } catch (err) {
        console.error("❌ DB connection error:", err);
        throw err;
    }
}

module.exports = { connectDB, sql };
