const express = require('express');
const router = express.Router();
const tts = require('../services/tts');

// Menerima teks balasan dari otak AI, dan mengembalikan data suara
router.post('/synthesize', async (req, res) => {
    try {
        const { text, emotion } = req.body;
        if (!text) return res.status(400).json({ error: 'Teks tidak boleh kosong' });

        const audioData = await tts.generateSpeech(text, emotion);
        res.json(audioData);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;
