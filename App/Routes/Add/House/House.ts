import { executeQuery } from "../../../Utils/db";
import * as query from '../../../Routes/routes.query';

class Login {
    constructor() { }
    async addHouse(ctx: any) {
        if (ctx.request.body.houseName &&
            ctx.request.body.country &&
            ctx.request.body.county &&
            ctx.request.body.locality &&
            ctx.request.body.street &&
            ctx.request.body.number) {
            const data = await executeQuery(query.addHouse(ctx.request.body));
            console.log(data);
            if (data[0].AddHouse) {
                ctx.body = {
                    success: "House added Successfully",
                    house: data[0].AddHouse
                };
                ctx.status = 200;
            } else {
                ctx.body = { error: "User doesn\'t exist" };
                ctx.status = 500;
            }

        } else {
            ctx.body = { error: 'Unprocessable entity' }
            ctx.status = 401;
        }
    }
}
export default new Login();