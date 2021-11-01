const storage = {

    exists(key) {
        return localStorage.getItem(key) != null;
    },

    getItemString(key) {
        return localStorage.getItem(key);
    },

    getItemObject(key) {
        return JSON.parse(localStorage.getItem(key));
    },

    setItemString(key, stringValue) {
        localStorage.setItem(key, stringValue)
    },

    setItemObject(key, objectValue) {
        localStorage.setItem(key, JSON.stringify(objectValue));
    }
}