import mqttConnection from './../Utils/Mqtt';
import { executeQuery } from '../Utils/db';
import * as query from './../Routes/routes.query';


class Sensors {
    constructor() { }
    async sendEventToSensor(ctx: any) {
        const payload = {
            macAddress: ctx.request.body.macAddress,
            event: ctx.request.body.event,
            config: ctx.request.body.config
        }
        console.log('aaaa', JSON.stringify(payload));
        await mqttConnection.mqttConnection.publish("SensorsSettingsChannel", JSON.stringify(payload));

        ctx.body = { success: "event sent successfully" };


    }
    async getSensorLastState(ctx: any) {
        console.log('query', ctx.request.query);
        if (ctx.request.query.macAddress) {
            const data = await executeQuery(query.getSensorLastState(ctx.request.query));
            console.log(data);
            ctx.status = 200;
            ctx.body = data[0].row_to_json;
        } else {
            ctx.body = { error: 'Unprocessable entity' }
            ctx.status = 401;
        }
    }
    async addSensor(ctx: any) {

        let obj = ctx.request.body;
        console.log(obj);

        if (obj.sensorName &&
            obj.sensorType &&
            obj.roomId &&
            obj.macAddress &&
            obj.readingFrequency) {
            const data = await executeQuery(query.addSensor(obj));
            console.log(data);
            if (data[0].AddSensor) {
                ctx.body = {
                    success: "Sensor added Successfully",
                    sensor: data[0].AddSensor
                };
                ctx.status = 200;
            } else {
                ctx.body = { error: "Room doesn\'t exist" };
                ctx.status = 500;
            }

        } else {
            ctx.body = { error: 'Unprocessable entity' }
            ctx.status = 401;
        }

    }
    async removeSensorFromRoom(ctx: any) {

        let obj = ctx.request.body;
        console.log(obj);

        if (obj.macAddress) {
            const data = await executeQuery(query.removeSensorFromRoom(obj.macAddress));
            console.log(data);
            if (data[0].RemoveSensorFromRoom) {
                if ('response' in data[0].RemoveSensorFromRoom) {
                    ctx.body = {
                        success: data[0].RemoveSensorFromRoom.response == true ?
                            'Device removed successfully' : 'Device cannot be removed',
                    };
                    ctx.status = 200;
                } else if (data[0].RemoveSensorFromRoom.error) {
                    ctx.body = {
                        error: data[0].RemoveSensorFromRoom.error,
                    };
                    ctx.status = 200;
                } else {
                    ctx.body = {
                        error: "Unexpected error",
                    };
                    ctx.status = 500;
                }
            } else {
                ctx.body = { error: 'Database error' };
                ctx.status = 500;
            }

        } else {
            ctx.body = { error: 'Unprocessable entity' }
            ctx.status = 401;
        }

    }
}
export default new Sensors();