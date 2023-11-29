"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class checkers {
    static checkKeys(obj, key) {
        return Object.prototype.hasOwnProperty.call(obj, key);
    }
    static isEmpty(value) {
        return value.length === this.zero;
    }
    static checkEmail(email) {
        return this.emailRegex.test(email);
    }
    static checkOnlyNumbers(id) {
        return this.numberRegex.test(id);
    }
}
exports.default = checkers;
checkers.zero = 0;
checkers.emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
checkers.numberRegex = /^\d+$/;
