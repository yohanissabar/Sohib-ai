const time = require('./time');

const logger = {
    info: (msg) => console.log(`[ℹ️ INFO] ${time.getCurrentTime()} - ${msg}`),
    success: (msg) => console.log(`[✅ SUCCESS] ${time.getCurrentTime()} - ${msg}`),
    warn: (msg) => console.warn(`[⚠️ WARN] ${time.getCurrentTime()} - ${msg}`),
    error: (msg) => console.error(`[❌ ERROR] ${time.getCurrentTime()} - ${msg}`),
    ai: (msg) => console.log(`[🧠 BRAIN] ${time.getCurrentTime()} - ${msg}`)
};

module.exports = logger;
