import KoaRouter from 'koa-router';
import Sensors from './Sensors';
import { verifyToken } from './../Token';
import Register from './Register/Register';
import Login from './Login/Login';
import House from './Add/House/House';
import Room from './Add/Room/Room';



const router = new KoaRouter({ prefix: '/api' });
export { router };


router
    .post("/sendEventToSensor", Sensors.sendEventToSensor)
    .post("/register", Register.registerUser)
    .post("/login", Login.loginUser)
    .get('/checkEmail', Register.checkEmail)
    .post('/add/house', House.addHouse)
    .post('/add/room', Room.addRoom)
    .use(verifyToken)
    // .post("/recordSensorData", SensorData.recordSensorData)