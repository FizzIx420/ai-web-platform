const express = require('express');
const db = require('../config/db');
const path = require('path');
const router = express.Router();

// Check if user has purchased template
router.get('/:templateId/:userId', async (req, res) => {
  const { templateId, userId } = req.params;
  try {
    const [rows] = await db.execute(
      'SELECT * FROM orders WHERE template_id = ? AND user_id = ? AND payment_status = ?',
      [templateId, userId, 'verified']
    );
    if (rows.length === 0) return res.status(403).json({ message: 'Purchase required' });

    // Get download URL from products table
    const [product] = await db.execute('SELECT download_url FROM products WHERE id = ?', [templateId]);
    if (product.length === 0) return res.status(404).json({ message: 'Template not found' });

    // Redirect to signed URL or serve file
    res.json({ downloadUrl: product[0].download_url });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;