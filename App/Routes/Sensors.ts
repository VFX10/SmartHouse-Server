import {mqttConnection} from './../Utils/Mqtt';

class Sensors {
    constructor() { }
    async sendEventToSensor(ctx:any){
        const payload = {
            macAddress: ctx.request.body.macAddress,
            event: ctx.request.body.event,
            config: ctx.request.body.config
        }
        console.log(JSON.stringify(payload));
        mqttConnection.publish("SensorsSetingsChannel", JSON.stringify(payload));
        ctx.body = { success: "event sent successfully" };

    }
}
export default new Sensors();