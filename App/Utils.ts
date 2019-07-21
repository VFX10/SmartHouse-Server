import Crypto from "crypto-js";
import { secretKey } from "./config";

class Utils {
    constructor() { }


    encryptText = (plainText: any) => {
        return Crypto.AES.encrypt(plainText, secretKey).toString();
    }
    decryptText = (encrtptedText: string) => {

        var bytes = Crypto.AES.decrypt(encrtptedText, secretKey);
        return bytes.toString(Crypto.enc.Utf8);
    }
    fromHex = (hex: any) => {
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
    toHex = (str: any) => {
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
}

export default new Utils();