const fs = require('fs').promises;
const path = require('path');
const config = require('../config');
const logger = require('../utils/logger');

const dbPath = path.resolve(__dirname, '../../', config.dbPath);

class Database {
    async read() {
        try {
            const data = await fs.readFile(dbPath, 'utf8');
            return JSON.parse(data);
        } catch (error) {
            logger.error(`Gagal membaca database: ${error.message}`);
            return null;
        }
    }

    async write(data) {
        try {
            await fs.writeFile(dbPath, JSON.stringify(data, null, 2), 'utf8');
            return true;
        } catch (error) {
            logger.error(`Gagal menulis ke database: ${error.message}`);
            return false;
        }
    }

    // Fungsi khusus untuk inisialisasi awal Sohib
    async updateIdentity(identityData) {
        const db = await this.read();
        if (db) {
            db.identity = { 
                ...db.identity, 
                ...identityData, 
                isInitialized: true 
            };
            await this.write(db);
            logger.success('Identitas Sohib berhasil diupdate!');
            return db.identity;
        }
        return null;
    }
}

module.exports = new Database();
