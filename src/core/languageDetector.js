class LanguageDetector {
    detect(text) {
        // Logika sederhana deteksi bahasa berbasis kata umum.
        // Bisa dikembangkan pakai library eksternal (seperti 'franc') di Level 6.
        const lowerText = text.toLowerCase();
        
        if (lowerText.match(/\b(how|what|why|who|is|are|you|and|the)\b/)) {
            return 'English';
        } else if (lowerText.match(/\b(watashi|arigato|konnichiwa|desu)\b/)) {
            return 'Japanese';
        } else if (lowerText.match(/\b(aku|kamu|apa|siapa|bagaimana|dan|di|ke)\b/)) {
            return 'Indonesian';
        }
        
        return 'Indonesian'; // Default bahasa
    }
}

module.exports = new LanguageDetector();
