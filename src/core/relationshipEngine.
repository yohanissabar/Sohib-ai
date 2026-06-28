const db = require('../db');
const logger = require('../utils/logger');

class RelationshipEngine {
    constructor() {
        this.xpPerMessage = 5;
        this.thresholds = {
            1: "Kenalan Baru",
            2: "Teman Ngobrol",
            3: "Teman Dekat",
            4: "Sahabat",
            5: "Sohib Sejati"
        };
    }

    async getStatus() {
        const data = await db.read();
        return data ? data.relationship : null;
    }

    async addExperience() {
        const data = await db.read();
        if (!data) return;

        data.relationship.score += this.xpPerMessage;
        
        const nextLevelXP = data.relationship.level * 100; // Rumus naik level: Level x 100 XP
        
        if (data.relationship.score >= nextLevelXP && data.relationship.level < 5) {
            data.relationship.level += 1;
            data.relationship.score = 0; // Reset surplus XP atau biarkan jalan terus (opsional)
            data.relationship.status = this.thresholds[data.relationship.level];
            logger.success(`🎉 Level Up! Hubungan naik ke Level ${data.relationship.level} (${data.relationship.status})`);
        }

        // Catat waktu interaksi terakhir
        data.state.lastInteraction = new Date().toISOString();
        
        await db.write(data);
        return data.relationship;
    }
}

module.exports = new RelationshipEngine();
