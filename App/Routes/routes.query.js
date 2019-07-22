"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function getAllSensors() {
    return {
        text: "SELECT * FROM \"Sensors\"",
        values: []
    };
}
exports.getAllSensors = getAllSensors;
function insertSensor(sensorName, macAddress, sensorType, readingFrequency) {
    return {
        text: "INSERT INTO \"Sensors\"(\"name\", \"macAddress\", \"sensorType\", \"readingFrequency\") VALUES ($1, $2, $3, $4)",
        values: [sensorName, macAddress, sensorType, readingFrequency]
    };
}
exports.insertSensor = insertSensor;
function searchSensor(macAddress) {
    return {
        text: "SELECT count(*) FROM \"Sensors\" WHERE \"macAddress\" = $1",
        values: [macAddress]
    };
}
exports.searchSensor = searchSensor;
function recordSensorData(sensorId, data, date) {
    return {
        text: "INSERT INTO \"SensorsData\"(\"idSensor\", data, \"recordDateTime\") VALUES ($1, $2, $3)",
        values: [sensorId, data, date]
    };
}
exports.recordSensorData = recordSensorData;
function sensorId(macAddress) {
    return {
        text: "SELECT id FROM \"Sensors\" WHERE \"macAddress\" = $1",
        values: [macAddress]
    };
}
exports.sensorId = sensorId;
