// test-db.js
const { connectDB } = require('./db');

connectDB().then(() => {
  console.log("✅ Success: Connected to DB");
  process.exit(0);
}).catch((err) => {
  console.error("❌ Connection failed:", err);
  process.exit(1);
});
