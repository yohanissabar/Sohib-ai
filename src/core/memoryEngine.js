const db = require('../db');
const logger = require('../utils/logger');

class MemoryEngine {
    constructor() {
        this.maxShortTerm = 10; // Maksimal 10 pasang percakapan terakhir
    }

    async getContext() {
        const data = await db.read();
        if (!data) return { shortTerm: [], longTerm: [] };
        return data.memory;
    }

    async addInteraction(role, content) {
        const data = await db.read();
        if (!data) return;

        // Tambah ke memori jangka pendek
        data.memory.shortTerm.push({ role, content, timestamp: new Date().toISOString() });

        // Jaga agar tidak terlalu panjang (menghindari token limit)
        if (data.memory.shortTerm.length > this.maxShortTerm * 2) {
            // Hapus yang paling lama
            data.memory.shortTerm.shift();
        }

        await db.write(data);
    }

    async addLongTermMemory(fact) {
        const data = await db.read();
        if (!data) return;

        // Mencegah duplikasi memori
        if (!data.memory.longTerm.includes(fact)) {
            data.memory.longTerm.push(fact);
            await db.write(data);
            logger.ai(`Memori jangka panjang baru: ${fact}`);
        }
    }

    async clearShortTerm() {
        const data = await db.read();
        if (data) {
            data.memory.shortTerm = [];
            await db.write(data);
            logger.info('Memori jangka pendek dibersihkan.');
        }
    }
}

module.exports = new MemoryEngine();
