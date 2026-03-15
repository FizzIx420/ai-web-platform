export function exportSite() {
  const canvas = document.getElementById('canvas');
  if (!canvas) return;

  // Get all components' HTML structure
  const content = canvas.innerHTML;

  // Build full HTML document with basic styling
  const html = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>My Website</title>
  <style>
    body { margin:0; font-family: system-ui, -apple-system, 'Segoe UI', Roboto, sans-serif; line-height:1.6; }
    .hero { background:#4f46e5; color:white; padding:80px 20px; text-align:center; }
    .features { padding:60px 20px; background:#f9fafb; }
    .features div { display:flex; gap:20px; justify-content:center; }
    .pricing { padding:60px 20px; }
    .contact { padding:60px 20px; background:#f3f4f6; }
    .contact form { max-width:400px; margin:0 auto; }
    input, textarea, button { display:block; width:100%; margin:10px 0; padding:10px; }
    button { background:#4f46e5; color:white; border:none; cursor:pointer; }
  </style>
</head>
<body>
  ${content}
</body>
</html>`;

  const blob = new Blob([html], { type: 'text/html' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = 'website.html';
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}