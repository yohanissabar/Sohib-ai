module.exports = {
    validateIdentitySetup: (req, res, next) => {
        const { name, age, gender, character } = req.body;
        if (!name || !age || !gender || !character) {
            return res.status(400).json({ error: 'Semua field identitas (nama, umur, gender, karakter) wajib diisi!' });
        }
        next();
    },
    validateChat: (req, res, next) => {
        const { message } = req.body;
        if (!message || message.trim() === '') {
            return res.status(400).json({ error: 'Pesan tidak boleh kosong!' });
        }
        next();
    }
};
