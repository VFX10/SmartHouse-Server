"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
var nodemailer = __importStar(require("nodemailer"));
var Mail = /** @class */ (function () {
    function Mail(subject, to) {
        var _this = this;
        this.mailOptions = {
            from: '<noreply@maltez.ro>',
            to: '',
            subject: 'Password reset!',
            text: '',
            html: ''
        };
        this.configTransporter = {
            host: 'smtp.office365.com',
            port: 587,
            secure: false,
            auth: {
                user: 'noreply@maltez.ro',
                pass: 'MR*Support2018#'
            }
        };
        this.sendhtmlMail = function (html) {
            return new Promise(function (res, rej) {
                _this.mailOptions.html = html;
                _this.transporter.sendMail(_this.mailOptions, function (error, info) {
                    if (error) {
                        rej(error);
                    }
                    _this.transporter.close();
                    res({
                        statusMessage: 'Success',
                        statusCode: 200
                    });
                });
            });
        };
        this.sendTextMail = function (message) {
            return new Promise(function (res, rej) {
                _this.mailOptions.text = message;
                _this.transporter.sendMail(_this.mailOptions, function (error, info) {
                    if (error) {
                        rej(error);
                    }
                    _this.transporter.close();
                    res({
                        statusMessage: 'Success',
                        statusCode: 200
                    });
                });
            });
        };
        this.mailOptions = {
            from: '<noreply@maltez.ro>',
            to: to,
            subject: subject,
            text: '',
            html: ''
        };
        this.transporter = nodemailer.createTransport(this.configTransporter);
    }
    return Mail;
}());
exports.default = Mail;
