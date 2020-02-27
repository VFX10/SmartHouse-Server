import { executeQuery } from "../../Utils/db";
import * as query from '../../Routes/routes.query';
var jwt = require('jsonwebtoken');

class Login {
    constructor() { }
    async loginUser(ctx: any) {

        console.log(ctx.request.body);
        if (ctx.request.body.email &&
            ctx.request.body.password) {
            const response = (await executeQuery(query.loginUser(ctx.request.body)))[0];
            if (response.LoginUser.email) {

                var token = jwt.sign({ email: ctx.request.body.email }, 'privateKey');
                console.log(token);
                ctx.body = {
                    success: "Login Successfully",
                    token: token,
                    data: response.LoginUser,
                };
                ctx.status = 200;
            } else {
                ctx.body = { error: "Invalid credentials" };
                ctx.status = 500;
            }

        } else {
            ctx.body = { error: 'Unprocessable entity' }
            ctx.status = 401;
        }
    }
}
export default new Login(); 