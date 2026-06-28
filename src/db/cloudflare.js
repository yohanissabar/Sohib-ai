class CloudflareDatabase {

    async read() {
        return {
            identity: {},
            memory: [],
            state: {}
        };
    }

    async write(data) {
        return true;
    }

    async updateIdentity(identityData) {
        return identityData;
    }
}

module.exports = new CloudflareDatabase();
