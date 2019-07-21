import Koa from 'koa';
import KoaBody from 'koa-bodyparser';
import { router } from './Routes'
import Serve from 'koa-static';
import { any } from 'bluebird';
import { port } from './config';
import MqttHelpers from './Utils/Mqtt';


export class App {
  constructor(private app?: Koa) {

    let mqtt = new MqttHelpers('192.168.0.112', 1883)
    this.app = new Koa();
    this.app
      .use(KoaBody({ jsonLimit: '10mb' }))
      .use(router.routes())
      .use(router.allowedMethods())
      .listen(port);
    console.log(`Running on ${port} port!`);
  }
}