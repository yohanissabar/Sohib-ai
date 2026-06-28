// Placeholder untuk Backend TTS Proxy
// Saat ini Sohib v5 menggunakan Web Speech API (Frontend) untuk TTS offline/gratis.
// File ini disiapkan untuk integrasi Cloud TTS (ElevenLabs / OpenAI) di masa depan.

class TTSService {
    async generateSpeech(text, emotion) {
        // TODO (Level 6): Fetch ke ElevenLabs API berdasarkan 'emotion'
        // Untuk sekarang, kita kembalikan instruksi ke frontend untuk memakai sintesis lokal
        return {
            method: 'frontend_synthesis',
            textToSpeak: text,
            suggestedEmotion: emotion
        };
    }
}

module.exports = new TTSService();
