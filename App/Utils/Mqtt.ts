import * as mqtt from 'mqtt'
import { executeQuery } from "./db";
import * as query from './../routes/routes.query';
import { getCurrentDateTime } from '../Time/Time';
import { mqttServerAddress, mqttOptions } from '../../config';
import { try } from 'bluebird';
class MqttHelpers {
    client: any;
    topics:any;
    constructor() {
        
        //executeQuery(query.getAllSensors()).then((val:any) => {
            this.client = mqtt.connect(`mqrr://${mqttServerAddress}`, mqttOptions);
            this.client.on('connect', async () => {
               // val.forEach((element: any) => {
                    //console.log(element);
                    this.client.subscribe("SensorsDataChannel", (err: any) => {
                        if (!err) {
                            console.log("successfully subscribed to SensorsDataChannel");
                            
                        }
                        else {
                            console.log(err);
                        }
                    });
              //  });
    
            //})
    
            this.client.on('message', async (topic: any, message: any) => {
                try{
                    let obj = JSON.parse(message.toString());
                    let sensorId = await executeQuery(query.sensorId(obj.macAddress));
                    if (sensorId) {
                        await executeQuery(query.recordSensorData(sensorId[0].id, obj.data, getCurrentDateTime()))
                    }
                }catch(e) {
                    // do nothing
                    console.error(e.message || e);
                }
                
               
            })
         });
        
    }
    publish(topic:string, message:string){
        this.client.publish(topic, message);
    }
    subscribe(topic:string){
        this.client.subscribe(topic);
    }
}
const mqttConnection = new MqttHelpers();
export default mqttConnection;