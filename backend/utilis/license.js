function generateLicense() {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  let key = '';
  for (let i = 0; i < 20; i++) {
    key += chars[Math.floor(Math.random() * chars.length)];
    if (i % 5 === 4 && i !== 19) key += '-';
  }
  return key;
}

module.exports = generateLicense;