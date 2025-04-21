require("dotenv").config();
const sql = require("mssql");

(async () => {
  try {
    console.log("Attempting test connection...");

    const pool = await sql.connect({
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      server: process.env.DB_SERVER,
      database: process.env.DB_DATABASE,
      port: parseInt(process.env.DB_PORT),
      options: {
        encrypt: process.env.DB_ENCRYPT === 'true',
        trustServerCertificate: process.env.DB_TRUST_CERT === 'true',
        enableArithAbort: true,
      },
    });

    console.log("✅ Test connection successful!");

    const result = await pool.request().query("SELECT TOP 1 * FROM Encreage.Services");
    console.log("✅ Query result:", result.recordset);

    sql.close();
  } catch (err) {
    console.error("❌ Test connection failed:", err.message);
  }
})();
