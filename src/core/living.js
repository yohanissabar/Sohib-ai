const logger = require('../utils/logger');
const db = require('../db');

class LivingEngine {
    startHeartbeat() {
        logger.info('Living Engine (Heartbeat) diaktifkan. Sohib sekarang hidup.');
        
        // Cek status setiap 1 jam (3600000 ms)
        setInterval(async () => {
            const data = await db.read();
            if (!data) return;

            const lastInteraction = new Date(data.state.lastInteraction).getTime();
            const now = new Date().getTime();
            const hoursIdle = (now - lastInteraction) / (1000 * 60 * 60);

            // Logika Living AI sederhana
            if (hoursIdle > 48 && data.state.currentEmotion !== 'sad') {
                data.state.currentEmotion = 'sad';
                await db.write(data);
                logger.ai('Sohib merasa kesepian karena sudah 2 hari tidak diajak ngobrol.');
            }
        }, 3600000);
    }
}

module.exports = new LivingEngine();
