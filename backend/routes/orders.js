const express = require('express');
const db = require('../config/db');
const router = express.Router();

// Create order (pending payment)
router.post('/', async (req, res) => {
  const { user_id, template_id, transaction_id, payment_method } = req.body;
  try {
    const [result] = await db.execute(
      'INSERT INTO orders (user_id, template_id, transaction_id, payment_method, payment_status) VALUES (?, ?, ?, ?, ?)',
      [user_id, template_id, transaction_id, payment_method, 'pending']
    );
    res.status(201).json({ orderId: result.insertId });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get orders for user
router.get('/user/:userId', async (req, res) => {
  try {
    const [rows] = await db.execute('SELECT * FROM orders WHERE user_id = ?', [req.params.userId]);
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Verify payment (admin)
router.put('/verify/:orderId', async (req, res) => {
  try {
    await db.execute('UPDATE orders SET payment_status = ? WHERE id = ?', ['verified', req.params.orderId]);
    res.json({ message: 'Payment verified' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;