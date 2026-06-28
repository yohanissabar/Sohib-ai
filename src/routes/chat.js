const express = require('express');
const router = express.Router();
const brain = require('../core/brain');
const responseGuard = require('../core/responseGuard');
const contextEngine = require('../core/contextEngine');
const languageDetector = require('../core/languageDetector');
const validator = require('../utils/validator');

router.post('/', validator.validateChat, async (req, res) => {
    try {
        const userText = req.body.message;
        
        // Deteksi Bahasa
        const lang = languageDetector.detect(userText);
        
        // Sisipkan Konteks Waktu
        const timeContext = await contextEngine.getCurrentContext();
        
        // Modifikasi sedikit input ke otak agar AI tahu konteks tanpa user melihatnya
        const hiddenContext = `${timeContext} [Gunakan bahasa: ${lang}]\nUser: ${userText}`;

        // Proses di Otak (Brain)
        const result = await brain.processInput(hiddenContext);

        // Bersihkan balasan dari kata-kata robotik
        const cleanReply = responseGuard.clean(result.reply);

        res.json({
            reply: cleanReply,
            emotion: result.emotion
        });

    } catch (error) {
        res.status(500).json({ error: 'Sistem AI sedang sibuk atau error.' });
    }
});

module.exports = router;
