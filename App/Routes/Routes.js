"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var koa_router_1 = __importDefault(require("koa-router"));
var Sensors_1 = __importDefault(require("./Sensors"));
var Token_1 = require("./../Token");
var Register_1 = __importDefault(require("./Register/Register"));
var Login_1 = __importDefault(require("./Login/Login"));
var House_1 = __importDefault(require("./Add/House/House"));
var Room_1 = __importDefault(require("./Add/Room/Room"));
var router = new koa_router_1.default({ prefix: '/api' });
exports.router = router;
router
    .post("/sendEventToSensor", Sensors_1.default.sendEventToSensor)
    .post("/register", Register_1.default.registerUser)
    .post("/login", Login_1.default.loginUser)
    .get('/checkEmail', Register_1.default.checkEmail)
    .get('/getSensorLastStatus', Sensors_1.default.getSensorLastState)
    .post('/add/house', House_1.default.addHouse)
    .post('/add/room', Room_1.default.addRoom)
    .post('/remove/room', Room_1.default.removeRoom)
    .post('/update/room', Room_1.default.updateRoom)
    .post('/add/sensor', Sensors_1.default.addSensor)
    .post('/add/sensorsToRoom', Sensors_1.default.addSensorsToRoom)
    .get('/getWeeklyPowerConsumption', Sensors_1.default.getWeeklyPowerConsumption)
    .get('/getMonthlyPowerConsumption', Sensors_1.default.getMonthlyPowerConsumption)
    .get('/getYearlyPowerConsumption', Sensors_1.default.getYearlyPowerConsumption)
    .get('/getMonthsPowerConsumption', Sensors_1.default.getMonthsPowerConsumption)
    .get('/getWeeksPowerConsumption', Sensors_1.default.getWeeksPowerConsumption)
    .post('/remove/sensorFromRoom', Sensors_1.default.removeSensorFromRoom)
    .post('/sendEventToAllDevices', Sensors_1.default.sendEventToAllDevices)
    .post('/livolo', Sensors_1.default.livolo)
    .use(Token_1.verifyToken);
// .post("/recordSensorData", SensorData.recordSensorData)
