import { executeQuery } from "../../Utils/db";
import * as query from '../../Routes/routes.query';

class Register {
    constructor() { }
    async registerUser(ctx: any) {
        if (ctx.request.body.firstName &&
            ctx.request.body.lastName &&
            ctx.request.body.email &&
            ctx.request.body.password) {
            if ((await executeQuery(query.checkemail(ctx.request.body.email)))[0].count > 0) {
                ctx.body = { error: "An account with this email already exist" };
                ctx.status = 500;
            } else if ((await executeQuery(query.registerUser(ctx.request.body)))[0].CreateUser == 2) {
                ctx.body = { success: "User registered successfully" };
                ctx.status = 200;
            } else {
                ctx.body = { error: "Error creating account" };
                ctx.status = 500;
            }

        } else {
            ctx.body = { error: 'Unprocessable entity' }
            ctx.status = 401;
        }
    }
    async checkEmail(ctx: any) {

        if (ctx.request.query.email) {
            // if ((await executeQuery(query.checkemail(ctx.request.query.email)))[0].count > 0) {
            //     ctx.body = { error: "An account with this email already exist" };
            //     ctx.status = 500;
            // } else {
            ctx.body = { error: "Email doesn't exist" };
            ctx.status = 200;
            // }

        } else {
            ctx.body = { error: 'Unprocessable entity' }
            ctx.status = 401;
        }
    }
}
export default new Register();