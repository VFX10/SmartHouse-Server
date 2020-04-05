import * as mqtt from 'mqtt'
import { executeQuery } from "./db";
import * as query from './../Routes/routes.query';
import { getCurrentDateTime } from '../Time/Time';
import { mqttServerAddress, mqttOptions } from '../../config';
import * as admin from 'firebase-admin';
// import * as conf from '../../homey-admin-sdk';
// const = ../../homey-admin-sdk
var serviceAccount = require("../../homey-admin-sdk.json");
class MqttHelpers {
    client: any;
    topics: any;
    constructor() {
        admin.initializeApp({
            credential: admin.credential.cert(serviceAccount),
        })
        //executeQuery(query.getAllSensors()).then((val:any) => {
        this.client = mqtt.connect(`mqrr://${mqttServerAddress}`, mqttOptions);
        this.client.on('connect', async () => {
            // val.forEach((element: any) => {
            //console.log(element);
            this.client.subscribe(["SensorsDataChannel", 'SensorsConfigChannel', 'SensorsStatusChannel', 'response'], (err: any) => {
                if (!err) {
                    console.log("successfully subscribed to SensorsDataChannel");
                    console.log("successfully subscribed to SensorsConfigChannel");
                    console.log("successfully subscribed to SensorsStatusChannel");
                    console.log("successfully subscribed to response");
                }
                else {
                    console.log(err);
                }
            });
            //  }); 

            //}) 

            this.client.on('message', async (topic: any, message: any) => {
                switch (topic) {
                    case 'response':
                        console.log('this is a response ' + message.toString());
                        break;
                    case 'SensorsConfigChannel':
                        try {
                            let obj = JSON.parse(message.toString());
                            console.log(obj);
                            if ((await executeQuery(query.searchSensor(obj.macAddress)))[0].count == 0) {
                                console.log('nu este sensors');
                                await executeQuery(query.insertSensor(obj.sensorName, obj.macAddress, obj.sensorType, obj.readingFrequency));
                            } else {
                                console.log('este sensors');
                                console.log("update sensor information");
                                await executeQuery(query.updateSensor(obj.macAddress, 'online'));
                            }
                        } catch (e) { }

                        break;
                    case 'SensorsDataChannel':
                        try {
                            console.info(message.toString());
                            let obj = JSON.parse(message.toString());
                            // console.log(obj.macAddress)
                            let sensorId = await executeQuery(query.sensorId(obj.macAddress));
                            // console.log(sensorId)
                            if (sensorId) {
                                await executeQuery(query.recordSensorData(sensorId[0].id, obj.data, getCurrentDateTime()))
                            }
                        } catch (e) {
                            // do nothing
                            console.error(e.message || e);
                        }
                        break;
                    case 'SensorsStatusChannel':
                        try {
                            console.log("update sensor status");
                            let obj = JSON.parse(message.toString());
                            console.log(obj);
                            await executeQuery(query.updateSensor(JSON.parse(obj.client).name.toString().toLowerCase(), obj.status));
                            const data = await executeQuery(query.getSensorName(JSON.parse(obj.client).name.toString().toLowerCase()));
                            const notification = {
                                notification: {
                                    title: `Device is ${obj.status}`,
                                    body: obj.status == 'online' ? `${data[0].name} is back online` : `${data[0].name} is offline`
                                }
                            };
                            const options = {
                                priority: 'high',
                                timeToLive: 60 * 60 * 24
                            };
                            console.log('o sa trimit la', JSON.parse(obj.client).account);
                            admin.messaging().sendToTopic(JSON.parse(obj.client).account.toString().replace('@', 'AT'), notification, options).then((response: any) => {
                                console.log('Success', response);
                            }).catch((error: any) => {
                                console.error('Error', error);
                            })
                        } catch (e) {
                            // do nothing 
                            console.error(e.message || e);
                        }
                        break;
                    default:
                        console.warn(`${topic} doesn't exist`);
                }



            })
        });

    }
    eroare(err: any) {
        console.error(err);
    }
    publish = (topic: string, message: string) => {
        this.client.publish(topic, message);
    }
    subscribe(topic: string) {
        this.client.subscribe(topic);
    }
}

const mqttConnection = new MqttHelpers();

export default { mqttConnection };