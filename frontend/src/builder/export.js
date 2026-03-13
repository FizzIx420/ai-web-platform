export function exportSite() {
  const canvas = document.getElementById('canvas');
  const content = canvas.innerHTML;

  const html = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>My Website</title>
  <style>
    body { margin:0; font-family: sans-serif; }
    .hero { background:#4f46e5; color:white; padding:80px 20px; text-align:center; }
    .features { padding:60px 20px; }
    .pricing { padding:60px 20px; background:#f9fafb; }
    .contact { padding:60px 20px; }
  </style>
</head>
<body>
  ${content}
</body>
</html>
  `;

  const blob = new Blob([html], { type: 'text/html' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = 'website.html';
  a.click();
  URL.revokeObjectURL(url);
}