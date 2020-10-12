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
        mqttConnection.mqttConnection.publish("SensorsSettingsChannel", JSON.stringify(payload));
        ctx.body = { success: "event sent successfully" };
    }
    async getSensorLastState(ctx: any) {
        try {
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
        } catch (e) {
            console.log(e);
        }

    }
    async addSensor(ctx: any) {

        let obj = ctx.request.body;
        console.log(obj);

        if (obj.sensorName &&
            obj.sensorType &&
            //obj.roomId &&
            obj.macAddress &&
            obj.readingFrequency >= 0) {
            if (obj.roomId != null) {
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
                const data = await executeQuery(query.addSensorWithoutRoom(obj));
                console.log(data);
                if (data[0].AddSensorWithoutRoom) {
                    ctx.body = {
                        success: "Sensor added Successfully",
                        sensor: data[0].AddSensorWithoutRoom
                    };
                    ctx.status = 200;
                } else {
                    ctx.body = { error: "Room doesn\'t exist" };
                    ctx.status = 500;
                }
            }

        } else {
            ctx.body = { error: 'Unprocessable entity' }
            ctx.status = 401;
        }

    }

    async getWeeklyPowerConsumption(ctx: any) {
        let obj = ctx.request.query;
        console.log(obj);
        if (obj.macAddress && obj.currentDateTime) {
            const data = await executeQuery(query.getWeeklyPowerStats(obj));
            console.log(data);
            if (data[0].array_to_json) {
                ctx.body = {
                    data: data[0].array_to_json,
                };
                ctx.status = 200;
            } else {
                ctx.body = { error: 'Error retriving information' };
                ctx.status = 500;
            }
        }
        else {
            ctx.body = { error: 'Unprocessable entity' }
            ctx.status = 401;
        }
    }
    async getMonthlyPowerConsumption(ctx: any) {
        let obj = ctx.request.query;
        console.log(obj);
        if (obj.macAddress && obj.currentDateTime) {
            const data = await executeQuery(query.getMonthlyPowerStats(obj));
            console.log(data);
            if (data[0].array_to_json) {
                ctx.body = {
                    data: data[0].array_to_json,
                };
                ctx.status = 200;
            } else {
                ctx.body = { error: 'Error retriving information' };
                ctx.status = 500;
            }
        } else {
            ctx.body = { error: 'Unprocessable entity' }
            ctx.status = 401;
        }
    }
    async getYearlyPowerConsumption(ctx: any) {
        let obj = ctx.request.query;
        console.log(obj);
        if (obj.macAddress) {
            const data = await executeQuery(query.getYearlyPowerStats(obj));
            console.log(data);
            if (data[0].array_to_json) {
                ctx.body = {
                    data: data[0].array_to_json,
                };
                ctx.status = 200;
            } else {
                ctx.body = { error: 'Error retriving information' };
                ctx.status = 500;
            }
        } else {
            ctx.body = { error: 'Unprocessable entity' }
            ctx.status = 401;
        }
    }
    async getMonthsPowerConsumption(ctx: any) {
        let obj = ctx.request.query;
        console.log(obj);
        console.log(ctx.request.body);
        if (obj.macAddress && obj.year) {
            const data = await executeQuery(query.getMonthsPowerStats(obj));
            console.log(data);
            if (data[0].array_to_json) {
                ctx.body = {
                    data: data[0].array_to_json,
                };
                ctx.status = 200;
            } else {
                ctx.body = { error: 'Error retriving information' };
                ctx.status = 500;
            }
        } else {
            ctx.body = { error: 'Unprocessable entity' }
            ctx.status = 401;
        }
    }
    async getWeeksPowerConsumption(ctx: any) {
        let obj = ctx.request.query;
        console.log(obj);
        console.log(ctx.request.body);
        if (obj.macAddress && obj.month && obj.year) {
            const data = await executeQuery(query.getWeeksPowerStats(obj));
            console.log(data);
            if (data[0].array_to_json) {
                ctx.body = {
                    data: data[0].array_to_json,
                };
                ctx.status = 200;
            } else {
                ctx.body = { error: 'Error retriving information' };
                ctx.status = 500;
            }
        } else {
            ctx.body = { error: 'Unprocessable entity' }
            ctx.status = 401;
        }
    }
    async sendEventToAllDevices(ctx: any) {
        console.log(ctx.request.body);
        if (ctx.request.body.devices && (ctx.request.body.event || ctx.request.body.config)) {
            // console.log('it is good');
            ctx.request.body.devices.forEach(async (device: string) => {
                const payload = {
                    macAddress: device,
                    event: ctx.request.body.event,
                    config: ctx.request.body.config
                }
                mqttConnection.mqttConnection.publish("SensorsSettingsChannel", JSON.stringify(payload));
            });
            ctx.body = { success: "event sent successfully" };
            ctx.status = 200;
        } else {
            ctx.body = { error: 'Unprocessable entity' }
            ctx.status = 401;
        }

    }
    livolo(ctx: any) {
        mqttConnection.mqttConnection.publish("zigbee2mqtt/0x00124b0018027c33/left/set", ctx.request.body.event);
        ctx.body = { success: "event sent successfully" };
    }

    async addSensorsToRoom(ctx: any) {

        let obj = ctx.request.body;
        console.log(obj);
        ctx.status = 200;
        if (obj.roomId &&
            obj.devices) {
            const data = await executeQuery(query.addSensorsToRoom(obj));
            console.log(data);
            if (data[0].AddSensorsToRoom.success) {
                ctx.body = {
                    success: data[0].AddSensorsToRoom.success,//"Sensors added Successfully"
                };
                ctx.status = 200;
            } else {
                ctx.body = data[0].AddSensorsToRoom.error;
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