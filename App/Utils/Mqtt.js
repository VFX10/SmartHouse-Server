"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
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
var MqttHelpers = /** @class */ (function () {
    function MqttHelpers() {
        var _this = this;
        //executeQuery(query.getAllSensors()).then((val:any) => {
        this.client = mqtt.connect("mqrr://" + config_1.mqttServerAddress, config_1.mqttOptions);
        this.client.on('connect', function () { return __awaiter(_this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                // val.forEach((element: any) => {
                //console.log(element);
                this.client.subscribe("SensorsDataChannel", function (err) {
                    if (!err) {
                        console.log("successfully subscribed to SensorsDataChannel");
                    }
                    else {
                        console.log(err);
                    }
                });
                //  });
                //})
                this.client.on('message', function (topic, message) { return __awaiter(_this, void 0, void 0, function () {
                    var obj, sensorId, e_1;
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0:
                                console.log(message.toString());
                                _a.label = 1;
                            case 1:
                                _a.trys.push([1, 5, , 6]);
                                obj = JSON.parse(message.toString());
                                return [4 /*yield*/, db_1.executeQuery(query.sensorId(obj.macAddress))];
                            case 2:
                                sensorId = _a.sent();
                                if (!sensorId) return [3 /*break*/, 4];
                                return [4 /*yield*/, db_1.executeQuery(query.recordSensorData(sensorId[0].id, obj.data, Time_1.getCurrentDateTime()))];
                            case 3:
                                _a.sent();
                                _a.label = 4;
                            case 4: return [3 /*break*/, 6];
                            case 5:
                                e_1 = _a.sent();
                                // do nothing
                                console.error(e_1.message || e_1);
                                return [3 /*break*/, 6];
                            case 6: return [2 /*return*/];
                        }
                    });
                }); });
                return [2 /*return*/];
            });
        }); });
    }
    MqttHelpers.prototype.publish = function (topic, message) {
        this.client.publish(topic, message);
    };
    MqttHelpers.prototype.subscribe = function (topic) {
        this.client.subscribe(topic);
    };
    return MqttHelpers;
}());
var mqttConnection = new MqttHelpers();
exports.default = mqttConnection;
