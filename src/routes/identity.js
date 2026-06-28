const express = require('express');
const router = express.Router();
const db = require('../db');
const validator = require('../utils/validator');

// Cek status identitas saat web pertama dibuka
router.get('/', async (req, res) => {
    const data = await db.read();
    if (!data) return res.status(500).json({ error: 'Database error' });
    
    res.json(data.identity);
});

// Setup identitas Sohib
router.post('/setup', validator.validateIdentitySetup, async (req, res) => {
    try {
        const newIdentity = await db.updateIdentity(req.body);
        if (newIdentity) {
            res.json({ success: true, message: 'Identitas berhasil dibuat!', identity: newIdentity });
        } else {
            res.status(500).json({ error: 'Gagal menyimpan identitas.' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;
