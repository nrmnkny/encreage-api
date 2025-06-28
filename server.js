require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { connectDB } = require('./db'); 

const app = express();
app.use(cors());

app.get('api/services', async (req, res) => {
  try {
    const pool = await connectDB();
    const result = await pool.request().query('SELECT * FROM encreageservices;');
    res.json(result.recordset);             
  } catch (err) {
    console.error('Error fetching services:', err.message);
    res.status(500).json({ error: err.message });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
