const logger = require('../utils/logger');

const router = {
    async ask(messages) {
        const apiKey = process.env.OPENROUTER_API_KEY;

        if (!apiKey) {
            throw new Error(
                'OPENROUTER_API_KEY tidak ditemukan di file .env'
            );
        }

        try {
            logger.info('Routing ke OpenRouter Free Pool...');

            const response = await fetch(
                'https://openrouter.ai/api/v1/chat/completions',
                {
                    method: 'POST',
                    headers: {
                        Authorization: `Bearer ${apiKey}`,
                        'Content-Type': 'application/json',
                        'HTTP-Referer': 'http://localhost:3000',
                        'X-Title': 'Sohib AI v5 Ultimate'
                    },
                    body: JSON.stringify({
                        model: 'openrouter/free',
                        messages,
                        temperature: 0.7,
                        max_tokens: 2048
                    })
                }
            );

            const data = await response.json();

            if (!response.ok) {
                throw new Error(
                    data?.error?.message ||
                    `HTTP ${response.status}`
                );
            }

            const content =
                data?.choices?.[0]?.message?.content;

            if (!content) {
                throw new Error('Response kosong dari OpenRouter');
            }

            return content;

        } catch (error) {
            logger.error(`AI Router gagal: ${error.message}`);
            throw error;
        }
    },

    async generateResponse(messages) {
        return await router.ask(messages);
    }
};

module.exports = router;
