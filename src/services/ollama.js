const config = require('../config');

class OllamaService {
    async chat(messages) {
        // Karena Ollama menggunakan format prompt yang sedikit berbeda, 
        // kita tetap kirim messages array, Ollama API /api/chat bisa menanganinya.
        
        const response = await fetch(`${config.ollamaBaseUrl}/api/chat`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                model: 'llama3', // Pastikan model ini sudah di-pull di lokal (ollama run llama3)
                messages: messages,
                stream: false
            })
        });

        const data = await response.json();

        if (!response.ok) {
            throw new Error(`Ollama Error: ${response.statusText}`);
        }

        return data.message.content;
    }
}

module.exports = new OllamaService();
