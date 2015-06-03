'use strict';

class Utils {
    static isObjEmpty(obj) {
        return Object.getOwnPropertyNames(obj).length === 0;
    }

    // returns LS object by key, if no obj returns empty obj
    static getLocalStorage(key) {
        let post;
        try {
            post = JSON.parse(localStorage.getItem(key));
        }
        catch (e) {
            console.log(e);
            post = false;
        }
        return post;
    }

    static formatNumber(num) {
        return num < 10 ? '0' + num : num;
    }

    static formatDate(date) {
        return Utils.formatNumber(date.getHours()) + ':' + Utils.formatNumber(date.getMinutes()) + ':' + Utils.formatNumber(date.getSeconds());
    }

    static isEnter(e) {
        return e.keyCode === 13;
    }
}

module.exports = Utils;
