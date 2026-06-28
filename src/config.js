require('dotenv').config();

module.exports = {
    port: process.env.PORT || 3000,
    openRouterKey: process.env.OPENROUTER_API_KEY,
    ollamaBaseUrl: process.env.OLLAMA_BASE_URL || 'http://localhost:11434',
    creatorName: process.env.CREATOR_NAME || 'Yostandi',
    dbPath: 'sohib-db.json',
    aiProvider: process.env.OPENROUTER_API_KEY ? 'openrouter' : 'ollama' // Auto switch
};
