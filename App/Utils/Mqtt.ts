import * as mqtt from 'mqtt'
import { executeQuery } from "./db";
import * as query from './routes.query';
import Time from '../Time/Time';
class MqttHelpers {
    client: any;
topics:any;
    constructor(server: string, port: number) {
        var options = {
            port: port,
            host: `mqrr://${server}`,
            clientId: 'Hub',
            clean: true,
            encoding: 'utf8'
        };
        // this.topics = executeQuery(query.getAllSensors()).then((val:any)=>{});
        this.client = mqtt.connect(`mqrr://${server}`, options);
        this.client.on('connect', async () => {
            //this.topics.forEach((element: any) => {
                this.client.subscribe("Office temperature sensor", (err: any) => {
                    if (!err) {
                        console.log("subscribed to " + "Office temperature sensor");
                    }
                    else {
                        console.log(err);
                    }
                //});
            });

        })

        this.client.on('message', async (topic: any, message: any) => {
            // message is Buffer
            let obj = JSON.parse(message.toString());
            console.log(obj)
            let sensorId = await executeQuery(query.sensorId(obj.macAddress));
            if (sensorId) {
                await executeQuery(query.recordSensorData(sensorId[0].id, obj.data, Time.getCurrentDateTime()))
            }
            //client.end()
        })
    }
}
export default MqttHelpers;