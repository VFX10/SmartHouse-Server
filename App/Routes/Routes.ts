import KoaRouter from 'koa-router';
import Sensors from './Sensors';
import { verifyToken } from '../token';



const router = new KoaRouter({ prefix: '/api' });
export { router };


router
    .post("/registerSensor", Sensors.register)
    .post("/sendEventToSensor", Sensors.sendEventToSensor)
    .use(verifyToken)
    // .post("/recordSensorData", SensorData.recordSensorData)