import crypto from 'crypto';

import { cryptoKey } from './../config';

export function encript(text: string) {
    let iv = Buffer.from('FnJL7EDzjqWjcaY9');
    let cipher = crypto.createCipheriv('aes-128-cbc', cryptoKey, iv);
    let encrypted = cipher.update(text);

    encrypted = Buffer.concat([encrypted, cipher.final()]);

    return iv.toString('hex') + ':' + encrypted.toString('hex');
}

export function decript(text: any) {
    let textParts = text.split(':');
    let iv = Buffer.from(textParts.shift(), 'hex');
    let encryptedText = Buffer.from(textParts.join(':'), 'hex');
    let decipher = crypto.createDecipheriv('aes-128-cbc', cryptoKey, iv);
    let decrypted = decipher.update(encryptedText);

    decrypted = Buffer.concat([decrypted, decipher.final()]);

    return decrypted.toString();
}

export function fromHex(hex: any){
    let str: any;
    try {
        str = decodeURIComponent(hex.replace(/(..)/g, '%$1'));
    }
    catch (e) {
        str = hex;
        console.log('invalid hex input: ' + hex)
    }
    return str;
}
export function toHex(str: any){
    let hex: any;
    try {
        hex = unescape(encodeURIComponent(str))
            .split('').map(function (v) {
                return v.charCodeAt(0).toString(16);
            }).join('') as any;
    }
    catch (e) {
        hex = str;
        console.log('invalid text input: ' + str);
    }
    return hex;
}