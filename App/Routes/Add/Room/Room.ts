import { executeQuery } from "../../../Utils/db";
import * as query from '../../../Routes/routes.query';

class Room {
    constructor() { }
    async addRoom(ctx: any) {
        if (ctx.request.body.roomName) {
            if ((await executeQuery(query.addRoom(ctx.request.body)))[0].AddHouse) {
                ctx.body = { success: "Room added Successfully" };
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
export default new Room();