"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var koa_1 = __importDefault(require("koa"));
var koa_bodyparser_1 = __importDefault(require("koa-bodyparser"));
var Routes_1 = require("./Routes");
var config_1 = require("./config");
var Mqtt_1 = __importDefault(require("./Utils/Mqtt"));
var App = /** @class */ (function () {
    function App(app) {
        this.app = app;
        var mqtt = new Mqtt_1.default('192.168.0.112', 1883);
        this.app = new koa_1.default();
        this.app
            .use(koa_bodyparser_1.default({ jsonLimit: '10mb' }))
            .use(Routes_1.router.routes())
            .use(Routes_1.router.allowedMethods())
            .listen(config_1.port);
        console.log("Running on " + config_1.port + " port!");
    }
    return App;
}());
exports.App = App;
