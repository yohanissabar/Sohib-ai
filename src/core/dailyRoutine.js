const db = require('../db');
const logger = require('../utils/logger');

class DailyRoutine {
    init() {
        // Berjalan setiap 24 jam (86400000 ms)
        setInterval(async () => {
            logger.info('Sohib sedang melakukan rutinitas harian (Memory Maintenance)...');
            const data = await db.read();
            if (!data) return;

            // Jika memori jangka pendek terlalu panjang tapi tidak melebihi batas (misal nyangkut),
            // Sohib "tidur" dan membersihkannya untuk memulai hari baru.
            if (data.memory.shortTerm.length > 0) {
                data.memory.shortTerm = [];
                await db.write(data);
                logger.success('Memori jangka pendek dibersihkan saat Sohib tertidur.');
            }
        }, 86400000);
    }
}

module.exports = new DailyRoutine();
