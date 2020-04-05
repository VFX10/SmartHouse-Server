import { executeQuery } from "../../../Utils/db";
import * as query from '../../../Routes/routes.query';

class Room {
    constructor() { }
    async addRoom(ctx: any) {
        if (ctx.request.body.roomName && ctx.request.body.houseId) {
            const data = await executeQuery(query.addRoom(ctx.request.body));
            console.log(data);

            if (data[0].AddRoom) {
                ctx.body = {
                    success: "Room added Successfully",
                    data: data[0].AddRoom
                };
                ctx.status = 200;
            } else {
                ctx.body = { error: "House doesn\'t exist" };
                ctx.status = 500;
            }

        } else {
            ctx.body = { error: 'Unprocessable entity' }
            ctx.status = 401;
        }
    }

    async updateRoom(ctx: any) {
        if (ctx.request.body.roomName && ctx.request.body.roomId) {
            const data = await executeQuery(query.updateRoom(ctx.request.body.roomName, ctx.request.body.roomId));
            console.log(data);
            ctx.body = {
                success: "Room updated Successfully"
            };
            ctx.status = 200;
        } else {
            ctx.body = { error: 'Unprocessable entity' }
            ctx.status = 401;
        }
    }

    async removeRoom(ctx: any) {
        if (ctx.request.body.roomId) {
            const data = await executeQuery(query.removeRoom(ctx.request.body.roomId));
            console.log(data);
            console.log(ctx.request.body);
            ctx.body = {
                success: "Room removed Successfully",
            };
            ctx.status = 200; 
        } else {
            ctx.body = { error: 'Unprocessable entity' }
            ctx.status = 401;
        }
    }
} 
export default new Room(); 