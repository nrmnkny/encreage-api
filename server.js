require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { connectDB } = require('./db');

const app = express();
app.use(cors());

app.get('/', (req, res) => {
    res.send('🚀 Encreage API is running!');
});

app.get('/api/services', async (req, res) => {
    try {
        const pool = await connectDB();
        const result = await pool.request().query(`
            SELECT 
                SERVICE_NAME,
                SERVICE_DESC,
                SERVICE_DETAIL,
                SERVICE_CATEGORY,
                CREATED_AT
            FROM dbo.SERVICES
            WHERE IS_ACTIVE = 1
        `);

        const services = result.recordset.map(service => ({
            ...service,
            CREATED_AT: new Date(service.CREATED_AT).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric'
            })
        }));

        res.json(services);
    } catch (err) {
        console.error("❌ Error fetching services:", err.message);
        res.status(500).json({ error: err.message });
    }
});


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`✅ Encreage API listening at http://localhost:${PORT}`);
});
