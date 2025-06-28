require('dotenv').config();
const express = require('express');
const cors = require('cors');
const contentRoutes = require('./routes/content');
const assetsRoutes = require('./routes/assets');
const compression = require('compression');

const app = express();
app.use(cors());
app.use(express.json());
app.use(compression());

// Root Test
app.get('/', (req, res) => {
  res.send('encreage-api-full-send🚀');
});

// Content Routes
app.use('/api/content', contentRoutes);
app.use('/api/assets', assetsRoutes);

// 404 Catch
app.use((req, res) => {
  res.status(404).send(` Route not found: ${req.method} ${req.url}`);
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🔥 API running on http://localhost:${PORT}`));