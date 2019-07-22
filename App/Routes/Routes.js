"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var koa_router_1 = __importDefault(require("koa-router"));
var Sensors_1 = __importDefault(require("./Sensors"));
var Token_1 = require("./../Token");
var router = new koa_router_1.default({ prefix: '/api' });
exports.router = router;
router
    .post("/registerSensor", Sensors_1.default.register)
    .post("/sendEventToSensor", Sensors_1.default.sendEventToSensor)
    .use(Token_1.verifyToken);
// .post("/recordSensorData", SensorData.recordSensorData)
