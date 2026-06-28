const config = require('../config');

class OpenRouterService {
    async chat(messages) {
        if (!config.openRouterKey) {
            throw new Error("OpenRouter API Key tidak ditemukan.");
        }

        const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
            method: "POST",
            headers: {
                "Authorization": `Bearer ${config.openRouterKey}`,
                "Content-Type": "application/json",
                "HTTP-Referer": "http://localhost:3000",
                "X-Title": "Sohib AI v5"
            },
            body: JSON.stringify({
                model: "meta-llama/llama-3-8b-instruct:free", // Bisa diganti sesuai kebutuhan
                messages: messages,
                temperature: 0.7,
                max_tokens: 250 // Jaga agar balasan cepat dan ringkas layaknya chatting
            })
        });

        const data = await response.json();
        
        if (!response.ok) {
            throw new Error(`OpenRouter Error: ${data.error?.message || response.statusText}`);
        }

        return data.choices[0].message.content;
    }
}

module.exports = new OpenRouterService();


