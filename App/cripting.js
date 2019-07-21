"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var crypto_1 = __importDefault(require("crypto"));
var config_1 = require("./../config");
function encript(text) {
    var iv = Buffer.from('FnJL7EDzjqWjcaY9');
    var cipher = crypto_1.default.createCipheriv('aes-128-cbc', config_1.cryptoKey, iv);
    var encrypted = cipher.update(text);
    encrypted = Buffer.concat([encrypted, cipher.final()]);
    return iv.toString('hex') + ':' + encrypted.toString('hex');
}
exports.encript = encript;
function decript(text) {
    var textParts = text.split(':');
    var iv = Buffer.from(textParts.shift(), 'hex');
    var encryptedText = Buffer.from(textParts.join(':'), 'hex');
    var decipher = crypto_1.default.createDecipheriv('aes-128-cbc', config_1.cryptoKey, iv);
    var decrypted = decipher.update(encryptedText);
    decrypted = Buffer.concat([decrypted, decipher.final()]);
    return decrypted.toString();
}
exports.decript = decript;
function fromHex(hex) {
    var str;
    try {
        str = decodeURIComponent(hex.replace(/(..)/g, '%$1'));
    }
    catch (e) {
        str = hex;
        console.log('invalid hex input: ' + hex);
    }
    return str;
}
exports.fromHex = fromHex;
function toHex(str) {
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
}
exports.toHex = toHex;
