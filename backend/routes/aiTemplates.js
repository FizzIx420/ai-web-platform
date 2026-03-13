const express = require('express');
const router = express.Router();

// Mock AI generation – in production call OpenAI or similar
router.post('/generate-layout', async (req, res) => {
  const { prompt } = req.body;
  // For demo, return a fixed layout based on prompt keywords
  let layout = ['hero', 'features', 'pricing', 'contact'];
  if (prompt.toLowerCase().includes('portfolio')) {
    layout = ['hero', 'gallery', 'about', 'contact'];
  } else if (prompt.toLowerCase().includes('blog')) {
    layout = ['header', 'posts', 'sidebar', 'footer'];
  }
  res.json({ layout });
});

// Generate full HTML/CSS/JS (simplified)
router.post('/generate-template', async (req, res) => {
  const { prompt, style } = req.body;
  // Here you'd call an AI service to generate code
  const html = `<!DOCTYPE html><html>... generated content ...</html>`;
  const css = `body { ... }`;
  const js = `console.log('generated');`;
  res.json({ html, css, js });
});

module.exports = router;