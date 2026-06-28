const db = require('../db');
const logger = require('../utils/logger');

class EmotionEngine {
    constructor() {
        this.emotions = ['neutral', 'happy', 'sad', 'angry', 'thinking'];
    }

    async getCurrentEmotion() {
        const data = await db.read();
        return data ? data.state.currentEmotion : 'neutral';
    }

    async updateEmotion(text) {
        // Logika sederhana deteksi emosi dari teks AI.
        // Di versi lanjutan, ini bisa diatur oleh instruksi prompt AI itu sendiri.
        let newEmotion = 'neutral';
        const lowerText = text.toLowerCase();

        if (lowerText.match(/(haha|wkwk|senang|mantap|keren|bagus|hehe)/)) {
            newEmotion = 'happy';
        } else if (lowerText.match(/(sedih|maaf|sayang sekali|kecewa|huhu)/)) {
            newEmotion = 'sad';
        } else if (lowerText.match(/(marah|kesal|bodoh|jangan|berhenti)/)) {
            newEmotion = 'angry';
        }

        const data = await db.read();
        if (data && data.state.currentEmotion !== newEmotion) {
            data.state.currentEmotion = newEmotion;
            await db.write(data);
            logger.ai(`Perubahan emosi: -> ${newEmotion}`);
        }

        return newEmotion;
    }
}

module.exports = new EmotionEngine();
