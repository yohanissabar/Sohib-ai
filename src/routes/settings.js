const express = require('express');
const router = express.Router();
const db = require('../db');
const relationshipEngine = require('../core/relationshipEngine');

// Mendapatkan status hubungan saat ini
router.get('/relationship', async (req, res) => {
    const status = await relationshipEngine.getStatus();
    if (status) {
        res.json(status);
    } else {
        res.status(500).json({ error: 'Gagal mengambil data relationship' });
    }
});

// Reset seluruh sistem (Kembali ke pabrik)
router.post('/factory-reset', async (req, res) => {
    const defaultData = {
        identity: {
            isInitialized: false,
            name: "",
            age: "",
            gender: "",
            character: "",
            creator: "Yostandi"
        },
        relationship: { level: 1, score: 0, status: "Kenalan Baru" },
        memory: { shortTerm: [], longTerm: [] },
        state: { currentEmotion: "neutral", lastInteraction: null }
    };

    await db.write(defaultData);
    res.json({ success: true, message: 'Sistem Sohib telah di-reset ke pengaturan awal.' });
});

module.exports = router;
