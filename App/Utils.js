"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var crypto_js_1 = __importDefault(require("crypto-js"));
var config_1 = require("./config");
var Utils = /** @class */ (function () {
    function Utils() {
        this.encryptText = function (plainText) {
            return crypto_js_1.default.AES.encrypt(plainText, config_1.secretKey).toString();
        };
        this.decryptText = function (encrtptedText) {
            var bytes = crypto_js_1.default.AES.decrypt(encrtptedText, config_1.secretKey);
            return bytes.toString(crypto_js_1.default.enc.Utf8);
        };
        this.fromHex = function (hex) {
            var str;
            try {
                str = decodeURIComponent(hex.replace(/(..)/g, '%$1'));
            }
            catch (e) {
                str = hex;
                console.log('invalid hex input: ' + hex);
            }
            return str;
        };
        this.toHex = function (str) {
            var hex;
            try {
                hex = unescape(encodeURIComponent(str))
                    .split('').map(function (v) {
                    return v.charCodeAt(0).toString(16);
                }).join('');
            }
            catch (e) {
                hex = str;
                console.log('invalid text input: ' + str);
            }
            return hex;
        };
    }
    return Utils;
}());
exports.default = new Utils();
