const memoryEngine = require('./memoryEngine');
const logger = require('../utils/logger');

class MemoryExtractor {
    async extract(userText) {
        const text = userText.toLowerCase();
        
        // Pola Regex sederhana untuk menangkap fakta.
        // Pada versi Level 6, ini bisa diganti dengan Named Entity Recognition (NER) berbasis LLM kecil.
        const memoryPatterns = [
            /(?:aku|saya|namaku) (?:suka|gemar|hobi) (.*)/i,
            /(?:nama|panggilanku) (?:adalah|aku|saya) (.*)/i,
            /(?:aku|saya) (?:tinggal di|dari|asal) (.*)/i,
            /(?:aku|saya) (?:seorang|bekerja sebagai) (.*)/i
        ];

        for (let pattern of memoryPatterns) {
            const match = text.match(pattern);
            if (match && match[1]) {
                const fact = `Pengguna mengatakan: "${userText}"`;
                await memoryEngine.addLongTermMemory(fact);
                logger.ai(`Fakta baru diekstrak dan disimpan ke Long-Term Memory!`);
                break; // Simpan satu fakta dominan per pesan
            }
        }
    }
}

module.exports = new MemoryExtractor();
