"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function getAllSensors() {
    return {
        text: "SELECT * FROM sensors",
        values: []
    };
}
exports.getAllSensors = getAllSensors;
function insertSensor(sensorName, macAddress, ipAddress) {
    return {
        text: "INSERT INTO \"sensors\"(\"sensorName\", \"macAddress\",\"ipAddress\") VALUES ($1, $2, $3)",
        values: [sensorName, macAddress, ipAddress]
    };
}
exports.insertSensor = insertSensor;
function searchSensor(macAddress) {
    return {
        text: "SELECT count(*) FROM \"sensors\" WHERE \"macAddress\" = $1",
        values: [macAddress]
    };
}
exports.searchSensor = searchSensor;
function recordSensorData(sensorId, data, date) {
    return {
        text: "INSERT INTO \"sensorsData\"(\"sensorId\", data, date) VALUES ($1, $2, $3)",
        values: [sensorId, data, date]
    };
}
exports.recordSensorData = recordSensorData;
function sensorId(macAddress) {
    return {
        text: "SELECT id FROM \"sensors\" WHERE \"macAddress\" = $1",
        values: [macAddress]
    };
}
exports.sensorId = sensorId;
