import * as jwt from 'jsonwebtoken';
import Utils from './Utils';
import { tokenKey } from './config';

class Token {
    constructor() {
    }

    public generateToken = (data: any) => {

        if (data.status.StatusMessage == 'Success') {
            return new Promise((res: any, rej: any) => {

                jwt.sign({ branch: data.result[0].Branch, type: data.result[0].Type }, tokenKey, (err: any, token: any) => {
                    if (err) {
                        rej(err)
                    }
                    res(Utils.encryptText(token));
                });

            });
        }
    }

    public verifyToken = async (ctx: any, next: any) => {
        try {
            const bearerHeader = ctx.request.headers['authorization'];
            if (bearerHeader) {
                await this.checkToken(bearerHeader.split(' ')[1]);
                await next();
            } else {
                ctx.status = 401;
            }
        } catch (error) {
            ctx.status = 401;
        }
    }

    public checkToken = (token: any) => {
        return new Promise((res: any, rej: any) => {
            jwt.verify(Utils.decryptText(token), tokenKey, (err: any, authData: any) => {
                if (err) { rej(err) };
                res(authData);
            });
        });
    }

}

export default new Token();