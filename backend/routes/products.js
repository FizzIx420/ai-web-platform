const express = require('express');
const db = require('../config/db');
const router = express.Router();

// Get all approved templates
router.get('/', async (req, res) => {
  try {
    const [rows] = await db.execute('SELECT * FROM products WHERE approved = 1');
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get single template
router.get('/:id', async (req, res) => {
  try {
    const [rows] = await db.execute('SELECT * FROM products WHERE id = ?', [req.params.id]);
    if (rows.length === 0) return res.status(404).json({ message: 'Template not found' });
    res.json(rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Create template (seller/admin)
router.post('/', async (req, res) => {
  const { title, description, price, preview_url, download_url, creator_id } = req.body;
  try {
    const [result] = await db.execute(
      'INSERT INTO products (title, description, price, preview_url, download_url, creator_id) VALUES (?, ?, ?, ?, ?, ?)',
      [title, description, price, preview_url, download_url, creator_id]
    );
    res.status(201).json({ id: result.insertId });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Update template (admin/creator)
router.put('/:id', async (req, res) => {
  const { title, description, price, approved } = req.body;
  try {
    await db.execute(
      'UPDATE products SET title = ?, description = ?, price = ?, approved = ? WHERE id = ?',
      [title, description, price, approved, req.params.id]
    );
    res.json({ message: 'Template updated' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Delete template
router.delete('/:id', async (req, res) => {
  try {
    await db.execute('DELETE FROM products WHERE id = ?', [req.params.id]);
    res.json({ message: 'Template deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;