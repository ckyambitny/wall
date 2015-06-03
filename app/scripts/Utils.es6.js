'use strict';

class Utils {
    static isObjEmpty(obj) {
        return Object.getOwnPropertyNames(obj).length === 0;
    }

    /**
     * Returns LS object by key, if no obj returns empty obj.
     *
     * @param {string} key
     * @returns {*}
     */
    static getLocalStorage(key) {
        let post;
        let data = localStorage.getItem(key);

        try {
            post = JSON.parse(data);
        } catch (e) {
            console.error(e);
            post = null;
        }

        return post;
    }

    static formatNumber(num) {
        return num < 10 ? '0' + num : num;
    }

    static formatDate(date) {
        var hours = Utils.formatNumber(date.getHours());
        var minutes = Utils.formatNumber(date.getMinutes());
        var seconds = Utils.formatNumber(date.getSeconds());

        return hours + ':' + minutes + ':' + seconds;
    }

    static isEnter(e) {
        return e.keyCode === 13;
    }
}

module.exports = Utils;
