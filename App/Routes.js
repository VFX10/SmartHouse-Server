"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var koa_router_1 = __importDefault(require("koa-router"));
var RegisterSensor_1 = __importDefault(require("./RegisterSensor"));
var router = new koa_router_1.default({ prefix: '/api' });
exports.router = router;
router
    .post("/registerSensor", RegisterSensor_1.default.register);
// .post("/recordSensorData", SensorData.recordSensorData)
