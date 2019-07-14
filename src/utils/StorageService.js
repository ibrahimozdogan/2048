class StorageService {
    constructor () {
        this.storage = localStorage;
    }

    /**
     * @param {string} key
     * @return {*}
     */
    get (key) {
        return this.storage[key];
    }

    /**
     * @param {string} key
     * @param {*} value
     */
    set ({ key, value }) {
        this.storage[key] = value
    }
}

export default StorageService;
