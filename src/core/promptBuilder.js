const identityManager = require('./identityManager');
const memoryEngine = require('./memoryEngine');

class PromptBuilder {
    async buildMessages(userText) {
        // 1. Ambil System Prompt (Identitas & Aturan)
        const systemPrompt = await identityManager.buildSystemPrompt();
        
        // 2. Ambil Riwayat Percakapan (Context)
        const memory = await memoryEngine.getContext();

        // 3. Susun Pesan
        const messages = [
            { role: 'system', content: systemPrompt }
        ];

        // 4. Masukkan memori jangka pendek agar AI ingat obrolan sebelumnya
        if (memory && memory.shortTerm) {
            memory.shortTerm.forEach(msg => {
                // Hindari memasukkan input terakhir dua kali
                if (msg.content !== userText) {
                    messages.push({ role: msg.role, content: msg.content });
                }
            });
        }

        // 5. Masukkan input user yang baru
        messages.push({ role: 'user', content: userText });

        return messages;
    }
}

module.exports = new PromptBuilder();
