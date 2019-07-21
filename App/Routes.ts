import KoaRouter from 'koa-router';
import * as Token from './Token';
import RegisterSensor from './RegisterSensor';
import SensorData from './SensorData';




const router = new KoaRouter({ prefix: '/api' });
export { router };


router
    .post("/registerSensor", RegisterSensor.register)
    // .post("/recordSensorData", SensorData.recordSensorData)