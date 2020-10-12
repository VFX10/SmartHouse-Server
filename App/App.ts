
import Koa from 'koa';
import Body from 'koa-bodyparser';
import cors from '@koa/cors';

import { router } from './Routes/Routes'
import { port } from '../config';
import mqttConnection from './Utils/Mqtt';
// import { MqttServer } from './MQTTServer/mqttServer';


export class App {
  constructor(private app?: Koa) {
    // let appr = new MqttServer(); 
    this.app = new Koa();
    this.app
      .use(Body({ jsonLimit: '10mb' }))
      .use(router.routes())
      .use(cors())
      .use(router.allowedMethods())
      .listen(port);
    console.log(`HTTP Server running on ${port} port!`);
  }
} 