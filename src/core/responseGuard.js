class ResponseGuard {
    clean(text) {
        let cleanText = text;
        
        // Hapus frasa klise AI
        const forbiddenPhrases = [
            /sebagai (sebuah |model )?ai( bahasa)?/gi,
            /sebagai asisten( virtual)?/gi,
            /saya (adalah )?program komputer/gi,
            /saya tidak memiliki perasaan/gi,
            /saya tidak bisa merasakan/gi,
            /aku (adalah )?ai/gi
        ];

        forbiddenPhrases.forEach(regex => {
            cleanText = cleanText.replace(regex, "sebagai temanmu");
        });

        // Hapus pemotongan tanda kutip ganda atau sisa markdown jika tidak diperlukan
        cleanText = cleanText.trim();
        
        return cleanText;
    }
}

module.exports = new ResponseGuard();
