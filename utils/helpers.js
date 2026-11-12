function uniqueId(prefix = 'id') {
  return `${prefix}-${Date.now()}-${Math.floor(Math.random() * 1000)}`;
}

function generateEmail(prefix = 'user') {
  return `${prefix}.${Date.now()}@testmail.com`;
}

function generateName(prefix = 'User') {
  return `${prefix}${Date.now()}`;
}

function normalizePrice(priceText) {
  // "£45.00" -> "45.00"
  if (!priceText) return '';
  return priceText.replace(/[^\d.]/g, '');
}

function toLowerTrim(text) {
  return (text || '').toLowerCase().trim();
}

function safeEnv(key, fallback = '') {
  return process.env[key] ? process.env[key].trim() : fallback;
}

function delay(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

module.exports = {
  uniqueId,
  generateEmail,
  generateName,
  normalizePrice,
  toLowerTrim,
  safeEnv,
  delay,
};