const { connectDB, sql } = require('../utils/db');

exports.getAllContent = async (req, res) => {
  try {
    const pool = await connectDB();
    const result = await pool.request().query(`SELECT * FROM dbo.encreagecontent`);
    res.json(result.recordset);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getContentById = async (req, res) => {
  const { id } = req.params;
  try {
    const pool = await connectDB();
    const result = await pool.request()
      .input('ID', sql.Int, id)
      .query('SELECT * FROM dbo.encreagecontent WHERE ID = @ID');
    res.json(result.recordset[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.createContent = async (req, res) => {
  const { section, content, type } = req.body;
  try {
    const pool = await connectDB();
    await pool.request()
      .input('SECTION', sql.NVarChar, section)
      .input('CONTENT', sql.NVarChar, content)
      .input('TYPE', sql.NVarChar, type)
      .query(`
        INSERT INTO dbo.encreagecontent (SECTION, CONTENT, TYPE, CREATED_AT)
        VALUES (@SECTION, @CONTENT, @TYPE, SYSDATETIME())
      `);
    res.status(201).json({ message: '✅ Content created' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.updateContent = async (req, res) => {
  const { id } = req.params;
  const { section, content, type } = req.body;
  try {
    const pool = await connectDB();
    await pool.request()
      .input('ID', sql.Int, id)
      .input('SECTION', sql.NVarChar, section)
      .input('CONTENT', sql.NVarChar, content)
      .input('TYPE', sql.NVarChar, type)
      .query(`
        UPDATE dbo.encreagecontent 
        SET SECTION = @SECTION, CONTENT = @CONTENT, TYPE = @TYPE
        WHERE ID = @ID
      `);
    res.json({ message: '✅ Content updated' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.deleteContent = async (req, res) => {
  const { id } = req.params;
  try {
    const pool = await connectDB();
    await pool.request()
      .input('ID', sql.Int, id)
      .query('DELETE FROM dbo.encreagecontent WHERE ID = @ID');
    res.json({ message: '🗑️ Content deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
