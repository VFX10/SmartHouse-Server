import * as mqtt from 'mqtt'
import { executeQuery } from "./db";
import * as query from './../Routes/routes.query';
import { getCurrentDateTime } from '../Time/Time';
import { mqttServerAddress, mqttOptions } from '../../config';
class MqttHelpers {
    client: any;
    topics: any;
    constructor() {

        //executeQuery(query.getAllSensors()).then((val:any) => {
        this.client = mqtt.connect(`mqrr://${mqttServerAddress}`, mqttOptions);
        this.client.on('connect', async () => {
            // val.forEach((element: any) => {
            //console.log(element);
            this.client.subscribe("SensorsDataChannel", (err: any) => {
                if (!err) {
                    console.log("successfully subscribed to SensorsDataChannel");
                    //this.client.publish("SensorsSetingsChannel", "salut");
                }
                else {
                    console.log(err);
                }
            });
            //  });

            //})

            this.client.on('message', async (topic: any, message: any) => {
                console.log(message.toString());
                try {
                    let obj = JSON.parse(message.toString());
                    let sensorId = await executeQuery(query.sensorId(obj.macAddress));
                    if (sensorId) {
                        await executeQuery(query.recordSensorData(sensorId[0].id, obj.data, getCurrentDateTime()))
                    }
                } catch (e) {
                    // do nothing
                    console.error(e.message || e);
                }


            })
        });

    }
    eroare(err:any){
        console.error(err);
    }
    publish = (topic: string, message: string) => {
        // console.log('aici');
        // console.log({topic, da: "SensorsSetingsChannel"});
        console.log(topic === "SensorsSetingsChannel");
        console.log('asd', message);
        // this.client.publish("SensorsSetingsChannel", `{"macAddress":"68:c6:3a:ac:86:1d","event":"reboot"}`, 2,this.eroare);
        this.client.publish("SensorsSetingsChannel", message, 1, (e: any) => {
            if (e) return console.log('aici:', e);
            console.log('nu ii eroare');
        });
    }
    subscribe(topic: string) {
        this.client.subscribe(topic);
    }
}

const mqttConnection = new MqttHelpers();

export { mqttConnection };