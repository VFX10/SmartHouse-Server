"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var App_1 = require("./App/App");
var mqttServer_1 = require("./App/MQTTServer/mqttServer");
new mqttServer_1.MqttServer();
new App_1.App();
