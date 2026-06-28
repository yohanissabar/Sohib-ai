require('dotenv').config();
const express = require('express');
const cors = require('cors');
const path = require('path');
const logger = require('./src/utils/logger');

// Import Rutinitas & Living AI
const dailyRoutine = require('./src/core/dailyRoutine');
const living = require('./src/core/living');

// Import Routes
const chatRoutes = require('./src/routes/chat');
const voiceRoutes = require('./src/routes/voice');
const identityRoutes = require('./src/routes/identity');
const memoryRoutes = require('./src/routes/memory');
const settingsRoutes = require('./src/routes/settings');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve folder public untuk PWA & Frontend
app.use(express.static(path.join(__dirname, 'public')));

// Daftarkan Routes
app.use('/api/chat', chatRoutes);
app.use('/api/voice', voiceRoutes);
app.use('/api/identity', identityRoutes);
app.use('/api/memory', memoryRoutes);
app.use('/api/settings', settingsRoutes);

// Fallback Route untuk SPA/PWA
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Jalankan Engine
dailyRoutine.init();
living.startHeartbeat();

// Jalankan Server
app.listen(PORT, () => {
    logger.success(`Sohib AI v5 Ultimate is alive on http://localhost:${PORT}`);
    logger.info(`ðŸ‘¨â€ðŸ’» Created by Yostandi`);
});
