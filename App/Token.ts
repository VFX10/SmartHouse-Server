    
import Koa from 'koa';
import jwt from 'jsonwebtoken';
import { encript, decript } from './cripting';
import { tokenKey } from './../config';

export function generateToken(data: Object) {
    return new Promise((res, rej) => {
        jwt.sign(data, tokenKey, (err: any, token: any) => {
            if (err) {
                rej(err);
            }
            res(encript(token));
        });
    });
}

export async function verifyToken(ctx: Koa.Context, next: any) {
    try {
        const bearerHeader = ctx.request.headers['authorization'];
        if (bearerHeader) {
            ctx.user = await checkToken(decript(bearerHeader.split(' ')[1]));
            return await next();
        }
        ctx.throw(401);
    } catch (error) {
        ctx.throw(error.status || 401, error.message || error);
    }
}

export function checkToken(token: any) {
    return new Promise((res, rej) => {
        jwt.verify(token, tokenKey, (err: any, authData: any) => {
            if (err) {
                rej(err);
            }
            res(authData);
        });
    });
}
