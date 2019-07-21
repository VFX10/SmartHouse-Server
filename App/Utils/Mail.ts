import Utils from '../Utils';
import * as nodemailer from 'nodemailer';
import IMailOption from '../Interfaces/IMailOption';
import ITransporter from '../Interfaces/ITransporter';
class Mail{
    private transporter?: any;
     mailOptions: IMailOption = {
        from: '<noreply@maltez.ro>',
        to: '',
        subject: 'Password reset!',
        text: '',
        html: ''
    };
    private configTransporter?: ITransporter = {
        host: 'smtp.office365.com',
        port: 587,
        secure: false,
        auth: {
            user: 'noreply@maltez.ro',
            pass: 'MR*Support2018#'
        }
    }
    constructor(subject: string, to: string) {
        this.mailOptions = {
            from: '<noreply@maltez.ro>',
            to: to,
            subject: subject,
            text: '',
            html: ''
        };
        this.transporter = nodemailer.createTransport(this.configTransporter);
    }

    public sendhtmlMail = (html: any)=>{
        return new Promise((res, rej) => {
            this.mailOptions.html = html;
            this.transporter.sendMail(this.mailOptions, (error: any, info: any) => {
                if (error) { rej(error) }
                this.transporter.close();
                res({
                    statusMessage: 'Success',
                    statusCode: 200
                });
            });
        });
    }
    public sendTextMail = (message: string)=>{
        return new Promise((res, rej) => {
            this.mailOptions.text = message;
            this.transporter.sendMail(this.mailOptions, (error: any, info: any) => {
                if (error) { rej(error) }
                this.transporter.close();
                res({
                    statusMessage: 'Success',
                    statusCode: 200
                });
            });
        });
    }
}
export default Mail;