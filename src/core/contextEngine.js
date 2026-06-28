const time = require('../utils/time');
const db = require('../db');

class ContextEngine {
    async getCurrentContext() {
        const data = await db.read();
        const lastInteraction = data?.state?.lastInteraction;
        
        let contextString = `[Konteks Saat Ini: Waktu lokal adalah ${time.getCurrentTime()}. `;
        
        if (lastInteraction) {
            const timeDiff = new Date() - new Date(lastInteraction);
            const hoursPassed = timeDiff / (1000 * 60 * 60);
            
            if (hoursPassed > 24) {
                contextString += `Kamu belum ngobrol dengan pengguna selama lebih dari sehari. Sapa mereka dengan ramah!]`;
            } else if (hoursPassed > 5) {
                contextString += `Sudah beberapa jam sejak obrolan terakhir.]`;
            } else {
                contextString += `Percakapan sedang aktif berjalan.]`;
            }
        } else {
            contextString += `Ini adalah percakapan pertamamu dengan pengguna.]`;
        }

        return contextString;
    }
}

module.exports = new ContextEngine();	
