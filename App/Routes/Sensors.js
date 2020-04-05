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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
var Mqtt_1 = __importDefault(require("./../Utils/Mqtt"));
var db_1 = require("../Utils/db");
var query = __importStar(require("./../Routes/routes.query"));
var Sensors = /** @class */ (function () {
    function Sensors() {
    }
    Sensors.prototype.sendEventToSensor = function (ctx) {
        return __awaiter(this, void 0, void 0, function () {
            var payload;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        payload = {
                            macAddress: ctx.request.body.macAddress,
                            event: ctx.request.body.event,
                            config: ctx.request.body.config
                        };
                        console.log('aaaa', JSON.stringify(payload));
                        return [4 /*yield*/, Mqtt_1.default.mqttConnection.publish("SensorsSettingsChannel", JSON.stringify(payload))];
                    case 1:
                        _a.sent();
                        ctx.body = { success: "event sent successfully" };
                        return [2 /*return*/];
                }
            });
        });
    };
    Sensors.prototype.getSensorLastState = function (ctx) {
        return __awaiter(this, void 0, void 0, function () {
            var data;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        console.log('query', ctx.request.query);
                        if (!ctx.request.query.macAddress) return [3 /*break*/, 2];
                        return [4 /*yield*/, db_1.executeQuery(query.getSensorLastState(ctx.request.query))];
                    case 1:
                        data = _a.sent();
                        console.log(data);
                        ctx.status = 200;
                        ctx.body = data[0].row_to_json;
                        return [3 /*break*/, 3];
                    case 2:
                        ctx.body = { error: 'Unprocessable entity' };
                        ctx.status = 401;
                        _a.label = 3;
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    Sensors.prototype.addSensor = function (ctx) {
        return __awaiter(this, void 0, void 0, function () {
            var obj, data, data;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        obj = ctx.request.body;
                        console.log(obj);
                        if (!(obj.sensorName &&
                            obj.sensorType &&
                            //obj.roomId &&
                            obj.macAddress &&
                            obj.readingFrequency)) return [3 /*break*/, 5];
                        if (!(obj.roomId != null)) return [3 /*break*/, 2];
                        return [4 /*yield*/, db_1.executeQuery(query.addSensor(obj))];
                    case 1:
                        data = _a.sent();
                        console.log(data);
                        if (data[0].AddSensor) {
                            ctx.body = {
                                success: "Sensor added Successfully",
                                sensor: data[0].AddSensor
                            };
                            ctx.status = 200;
                        }
                        else {
                            ctx.body = { error: "Room doesn\'t exist" };
                            ctx.status = 500;
                        }
                        return [3 /*break*/, 4];
                    case 2: return [4 /*yield*/, db_1.executeQuery(query.addSensorWithoutRoom(obj))];
                    case 3:
                        data = _a.sent();
                        console.log(data);
                        if (data[0].AddSensorWithoutRoom) {
                            ctx.body = {
                                success: "Sensor added Successfully",
                                sensor: data[0].AddSensorWithoutRoom
                            };
                            ctx.status = 200;
                        }
                        else {
                            ctx.body = { error: "Room doesn\'t exist" };
                            ctx.status = 500;
                        }
                        _a.label = 4;
                    case 4: return [3 /*break*/, 6];
                    case 5:
                        ctx.body = { error: 'Unprocessable entity' };
                        ctx.status = 401;
                        _a.label = 6;
                    case 6: return [2 /*return*/];
                }
            });
        });
    };
    Sensors.prototype.addSensorsToRoom = function (ctx) {
        return __awaiter(this, void 0, void 0, function () {
            var obj, data;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        obj = ctx.request.body;
                        console.log(obj);
                        ctx.status = 200;
                        if (!(obj.roomId &&
                            obj.devices)) return [3 /*break*/, 2];
                        return [4 /*yield*/, db_1.executeQuery(query.addSensorsToRoom(obj))];
                    case 1:
                        data = _a.sent();
                        console.log(data);
                        if (data[0].AddSensorsToRoom.success) {
                            ctx.body = {
                                success: data[0].AddSensorsToRoom.success,
                            };
                            ctx.status = 200;
                        }
                        else {
                            ctx.body = data[0].AddSensorsToRoom.error;
                            ctx.status = 500;
                        }
                        return [3 /*break*/, 3];
                    case 2:
                        ctx.body = { error: 'Unprocessable entity' };
                        ctx.status = 401;
                        _a.label = 3;
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    Sensors.prototype.removeSensorFromRoom = function (ctx) {
        return __awaiter(this, void 0, void 0, function () {
            var obj, data;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        obj = ctx.request.body;
                        console.log(obj);
                        if (!obj.macAddress) return [3 /*break*/, 2];
                        return [4 /*yield*/, db_1.executeQuery(query.removeSensorFromRoom(obj.macAddress))];
                    case 1:
                        data = _a.sent();
                        console.log(data);
                        if (data[0].RemoveSensorFromRoom) {
                            if ('response' in data[0].RemoveSensorFromRoom) {
                                ctx.body = {
                                    success: data[0].RemoveSensorFromRoom.response == true ?
                                        'Device removed successfully' : 'Device cannot be removed',
                                };
                                ctx.status = 200;
                            }
                            else if (data[0].RemoveSensorFromRoom.error) {
                                ctx.body = {
                                    error: data[0].RemoveSensorFromRoom.error,
                                };
                                ctx.status = 200;
                            }
                            else {
                                ctx.body = {
                                    error: "Unexpected error",
                                };
                                ctx.status = 500;
                            }
                        }
                        else {
                            ctx.body = { error: 'Database error' };
                            ctx.status = 500;
                        }
                        return [3 /*break*/, 3];
                    case 2:
                        ctx.body = { error: 'Unprocessable entity' };
                        ctx.status = 401;
                        _a.label = 3;
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    return Sensors;
}());
exports.default = new Sensors();
