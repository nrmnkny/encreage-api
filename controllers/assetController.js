const path = require('path');

const assetsDir = path.join(__dirname, '..', 'public', 'assets');

exports.getAsset = (req, res) => {
  const { filename } = req.params;
  res.set('Cache-Control', 'public, max-age=31536000, immutable');
  res.sendFile(filename, { root: assetsDir }, err => {
    if (!err) return;
    if (err.code === 'ENOENT') {
      return res.status(404).json({ error: 'Asset not found' });
    }
    res.status(500).json({ error: 'Error serving asset' });
  });
};