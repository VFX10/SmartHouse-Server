
import Utils from "./Utils";

import { executeQuery } from "./Utils/db";
import * as query from './Utils/routes.query';
import { getAllSensors } from "./Utils/routes.query";

class RegisterSensor {
    constructor() { }
    register = async (ctx: any) => {
        console.log(ctx.request.body);

        if ((await executeQuery(query.searchSensor(ctx.request.body.macAddress)))[0].count == 0) {
            await executeQuery(query.insertSensor(ctx.request.body.sensorName, ctx.request.body.macAddress, ctx.request.body.ipAddress));
            ctx.body = { success: "sensor saved" };
        } else {
            ctx.body = { success: "sensor already exist" };
        }
    }
}
export default new RegisterSensor();