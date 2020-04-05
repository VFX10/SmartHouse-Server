"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
var mqtt = __importStar(require("mqtt"));
var db_1 = require("./db");
var query = __importStar(require("./../Routes/routes.query"));
var Time_1 = require("../Time/Time");
var config_1 = require("../../config");
var admin = __importStar(require("firebase-admin"));
// import * as conf from '../../homey-admin-sdk';
// const = ../../homey-admin-sdk
var serviceAccount = require("../../homey-admin-sdk.json");
var MqttHelpers = /** @class */ (function () {
    function MqttHelpers() {
        var _this = this;
        this.publish = function (topic, message) {
            _this.client.publish(topic, message);
        };
        admin.initializeApp({
            credential: admin.credential.cert(serviceAccount),
        });
        //executeQuery(query.getAllSensors()).then((val:any) => {
        this.client = mqtt.connect("mqrr://" + config_1.mqttServerAddress, config_1.mqttOptions);
        this.client.on('connect', function () { return __awaiter(_this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                // val.forEach((element: any) => {
                //console.log(element);
                this.client.subscribe(["SensorsDataChannel", 'SensorsConfigChannel', 'SensorsStatusChannel', 'response'], function (err) {
                    if (!err) {
                        console.log("successfully subscribed to SensorsDataChannel");
                        console.log("successfully subscribed to SensorsConfigChannel");
                        console.log("successfully subscribed to SensorsStatusChannel");
                        console.log("successfully subscribed to response");
                    }
                    else {
                        console.log(err);
                    }
                });
                //  }); 
                //}) 
                this.client.on('message', function (topic, message) { return __awaiter(_this, void 0, void 0, function () {
                    var _a, obj, e_1, obj, sensorId, e_2, obj, data, notification, options, e_3;
                    return __generator(this, function (_b) {
                        switch (_b.label) {
                            case 0:
                                _a = topic;
                                switch (_a) {
                                    case 'response': return [3 /*break*/, 1];
                                    case 'SensorsConfigChannel': return [3 /*break*/, 2];
                                    case 'SensorsDataChannel': return [3 /*break*/, 10];
                                    case 'SensorsStatusChannel': return [3 /*break*/, 16];
                                }
                                return [3 /*break*/, 21];
                            case 1:
                                console.log('this is a response ' + message.toString());
                                return [3 /*break*/, 22];
                            case 2:
                                _b.trys.push([2, 8, , 9]);
                                obj = JSON.parse(message.toString());
                                console.log(obj);
                                return [4 /*yield*/, db_1.executeQuery(query.searchSensor(obj.macAddress))];
                            case 3:
                                if (!((_b.sent())[0].count == 0)) return [3 /*break*/, 5];
                                console.log('nu este sensors');
                                return [4 /*yield*/, db_1.executeQuery(query.insertSensor(obj.sensorName, obj.macAddress, obj.sensorType, obj.readingFrequency))];
                            case 4:
                                _b.sent();
                                return [3 /*break*/, 7];
                            case 5:
                                console.log('este sensors');
                                console.log("update sensor information");
                                return [4 /*yield*/, db_1.executeQuery(query.updateSensor(obj.macAddress, 'online'))];
                            case 6:
                                _b.sent();
                                _b.label = 7;
                            case 7: return [3 /*break*/, 9];
                            case 8:
                                e_1 = _b.sent();
                                return [3 /*break*/, 9];
                            case 9: return [3 /*break*/, 22];
                            case 10:
                                _b.trys.push([10, 14, , 15]);
                                console.info(message.toString());
                                obj = JSON.parse(message.toString());
                                return [4 /*yield*/, db_1.executeQuery(query.sensorId(obj.macAddress))];
                            case 11:
                                sensorId = _b.sent();
                                if (!sensorId) return [3 /*break*/, 13];
                                return [4 /*yield*/, db_1.executeQuery(query.recordSensorData(sensorId[0].id, obj.data, Time_1.getCurrentDateTime()))];
                            case 12:
                                _b.sent();
                                _b.label = 13;
                            case 13: return [3 /*break*/, 15];
                            case 14:
                                e_2 = _b.sent();
                                // do nothing
                                console.error(e_2.message || e_2);
                                return [3 /*break*/, 15];
                            case 15: return [3 /*break*/, 22];
                            case 16:
                                _b.trys.push([16, 19, , 20]);
                                console.log("update sensor status");
                                obj = JSON.parse(message.toString());
                                console.log(obj);
                                return [4 /*yield*/, db_1.executeQuery(query.updateSensor(JSON.parse(obj.client).name.toString().toLowerCase(), obj.status))];
                            case 17:
                                _b.sent();
                                return [4 /*yield*/, db_1.executeQuery(query.getSensorName(JSON.parse(obj.client).name.toString().toLowerCase()))];
                            case 18:
                                data = _b.sent();
                                notification = {
                                    notification: {
                                        title: "Device is " + obj.status,
                                        body: obj.status == 'online' ? data[0].name + " is back online" : data[0].name + " is offline"
                                    }
                                };
                                options = {
                                    priority: 'high',
                                    timeToLive: 60 * 60 * 24
                                };
                                console.log('o sa trimit la', JSON.parse(obj.client).account);
                                admin.messaging().sendToTopic(JSON.parse(obj.client).account.toString().replace('@', 'AT'), notification, options).then(function (response) {
                                    console.log('Success', response);
                                }).catch(function (error) {
                                    console.error('Error', error);
                                });
                                return [3 /*break*/, 20];
                            case 19:
                                e_3 = _b.sent();
                                // do nothing 
                                console.error(e_3.message || e_3);
                                return [3 /*break*/, 20];
                            case 20: return [3 /*break*/, 22];
                            case 21:
                                console.warn(topic + " doesn't exist");
                                _b.label = 22;
                            case 22: return [2 /*return*/];
                        }
                    });
                }); });
                return [2 /*return*/];
            });
        }); });
    }
    MqttHelpers.prototype.eroare = function (err) {
        console.error(err);
    };
    MqttHelpers.prototype.subscribe = function (topic) {
        this.client.subscribe(topic);
    };
    return MqttHelpers;
}());
var mqttConnection = new MqttHelpers();
exports.default = { mqttConnection: mqttConnection };
