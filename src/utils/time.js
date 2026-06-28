module.exports = {
    getCurrentTime: () => {
        const now = new Date();
        return now.toLocaleString('id-ID', { timeZone: 'Asia/Jakarta' });
    },
    getGreeting: () => {
        const hour = new Date().getHours();
        if (hour >= 3 && hour < 11) return 'pagi';
        if (hour >= 11 && hour < 15) return 'siang';
        if (hour >= 15 && hour < 18) return 'sore';
        return 'malam';
    }
};
