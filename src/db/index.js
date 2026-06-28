// Memilih implementasi database sesuai environment

if (typeof WebSocketPair !== "undefined") {
    // Cloudflare Workers
    module.exports = require("./cloudflare");
} else {
    // Node.js / Termux
    module.exports = require("./node");
}
