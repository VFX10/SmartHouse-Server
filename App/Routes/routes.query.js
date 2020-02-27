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
function updateSensor(sensorName, macAddress, sensorType, readingFrequency) {
    return {
        text: "UPDATE \"Sensors\" SET name = $1, \"sensorType\" = $2, \"readingFrequency\" = $3 WHERE \"macAddress\" = $4",
        values: [sensorName, sensorType, readingFrequency, macAddress]
    };
}
exports.updateSensor = updateSensor;
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
function registerUser(userData) {
    return {
        text: "SELECT \"CreateUser\"($1, $2, $3, $4);",
        values: [userData.email, userData.password, userData.firstName, userData.lastName]
    };
}
exports.registerUser = registerUser;
function checkemail(email) {
    return {
        text: "SELECT count(*) FROM \"Users\" WHERE \"email\" = $1",
        values: [email]
    };
}
exports.checkemail = checkemail;
function loginUser(userData) {
    return {
        text: "SELECT \"LoginUser\"($1, $2);",
        values: [userData.email, userData.password]
    };
}
exports.loginUser = loginUser;
function addHouse(houseData) {
    return {
        text: "SELECT \"AddHouse\"($1, $2, $3);",
        values: [houseData.houseName,
            houseData.country + ", " + houseData.county + ", " + houseData.locality + ", " + houseData.street + ",\n             " + houseData.number, houseData.userEmail]
    };
}
exports.addHouse = addHouse;
function addRoom(houseData) {
    return {
        text: "SELECT \"AddRoom\"($1, $2);",
        values: [houseData.roomName, houseData.houseId]
    };
}
exports.addRoom = addRoom;
