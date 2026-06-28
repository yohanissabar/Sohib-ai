class SpeechService {
    async transcribeAudio(audioBuffer) {
        // TODO (Level 6): Kirim audioBuffer ke OpenAI Whisper / model STT lokal
        // Di v5, STT dilakukan langsung di browser (public/voice.js)
        throw new Error("Backend STT belum diaktifkan. Gunakan Web Speech API di Frontend.");
    }
}

module.exports = new SpeechService();
