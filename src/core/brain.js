const promptBuilder = require('./promptBuilder');
const aiRouter = require('./aiRouter');
const memoryEngine = require('./memoryEngine');
const emotionEngine = require('./emotionEngine');
const relationshipEngine = require('./relationshipEngine');
const memoryExtractor = require('./memoryExtractor');
const logger = require('../utils/logger');

class Brain {
    async processInput(userText) {
        try {
            // 1. Ekstrak memori potensial dari input pengguna
            await memoryExtractor.extract(userText);

            // 2. Simpan input user ke memori jangka pendek
            await memoryEngine.addInteraction('user', userText);

            // 3. Bangun struktur prompt
            const messages = await promptBuilder.buildMessages(userText);

            // 4. Generate balasan (Berpikir)
            logger.ai('Sedang berpikir memproses jawaban...');
            const reply = await aiRouter.ask(messages);

            // 5. Simpan balasan AI ke memori jangka pendek
            await memoryEngine.addInteraction('assistant', reply);

            // 6. Deteksi dan update emosi berdasarkan teks balasan
            const emotion = await emotionEngine.updateEmotion(reply);

            // 7. Update Relationship XP
            await relationshipEngine.addExperience();

            return {
                reply,
                emotion
            };

        } catch (error) {
            logger.error(`Brain Processing Error: ${error.message}`);

            return {
                reply: "*menghela napas* Kepalaku sedikit pusing nih, sistemku sepertinya sedang error. Bisa ulangi lagi?",
                emotion: "sad"
            };
        }
    }
}

module.exports = new Brain();
