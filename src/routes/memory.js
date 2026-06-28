const express = require('express');
const router = express.Router();
const memoryEngine = require('../core/memoryEngine');

// Lihat memori
router.get('/', async (req, res) => {
    const memory = await memoryEngine.getContext();
    res.json(memory);
});

// Bersihkan memori jangka pendek (Reset percakapan/Clear Chat)
router.delete('/short-term', async (req, res) => {
    await memoryEngine.clearShortTerm();
    res.json({ success: true, message: 'Memori jangka pendek (konteks obrolan) berhasil dihapus.' });
});

module.exports = router;
