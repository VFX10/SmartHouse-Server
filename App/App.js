"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var koa_1 = __importDefault(require("koa"));
var koa_bodyparser_1 = __importDefault(require("koa-bodyparser"));
var cors_1 = __importDefault(require("@koa/cors"));
var Routes_1 = require("./Routes/Routes");
var config_1 = require("../config");
// import { MqttServer } from './MQTTServer/mqttServer';
var App = /** @class */ (function () {
    function App(app) {
        this.app = app;
        // let appr = new MqttServer(); 
        this.app = new koa_1.default();
        this.app
            .use(koa_bodyparser_1.default({ jsonLimit: '10mb' }))
            .use(Routes_1.router.routes())
            .use(cors_1.default())
            .use(Routes_1.router.allowedMethods())
            .listen(config_1.port);
        console.log("HTTP Server running on " + config_1.port + " port!");
    }
    return App;
}());
exports.App = App;
