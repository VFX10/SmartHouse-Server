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
function updateSensor(macAddress, networkStatus) {
    return {
        text: "UPDATE \"Sensors\" SET \"networkStatus\" = $1 WHERE \"macAddress\" = $2",
        values: [networkStatus, macAddress]
    };
}
exports.updateSensor = updateSensor;
function getSensorName(macAddress) {
    return {
        text: "SELECT name FROM  \"Sensors\" WHERE \"macAddress\" = $1",
        values: [macAddress]
    };
}
exports.getSensorName = getSensorName;
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
            houseData.country + ", " + houseData.county + ", " + houseData.locality + ", " + houseData.street + ", " + houseData.number, houseData.userEmail]
    };
}
exports.addHouse = addHouse;
function addSensor(sensorData) {
    return {
        text: "SELECT \"AddSensor\"($1, $2, $3, $4, $5);",
        values: [sensorData.sensorName,
            sensorData.sensorType, sensorData.macAddress, sensorData.roomId, sensorData.readingFrequency]
    };
}
exports.addSensor = addSensor;
function addSensorWithoutRoom(sensorData) {
    return {
        text: "SELECT \"AddSensorWithoutRoom\"($1, $2, $3, $4, $5);",
        values: [sensorData.sensorName,
            sensorData.sensorType, sensorData.macAddress, sensorData.readingFrequency, sensorData.userEmail]
    };
}
exports.addSensorWithoutRoom = addSensorWithoutRoom;
function removeSensorFromRoom(macAddress) {
    // return {
    //     text: `Update "Sensors" set "idRoom" = null WHERE "macAddress" = $1;
    //     SELECT ("idRoom" IS NULL) AS RESPONSE FROM "Sensors" WHERE "macAddress" = $1;`,
    //     values: [macAddress]
    // }
    return {
        text: "SELECT \"RemoveSensorFromRoom\"($1);",
        values: [macAddress]
    };
}
exports.removeSensorFromRoom = removeSensorFromRoom;
function addRoom(houseData) {
    return {
        text: "SELECT \"AddRoom\"($1, $2);",
        values: [houseData.roomName, houseData.houseId]
    };
}
exports.addRoom = addRoom;
function removeRoom(roomId) {
    return {
        text: "DELETE FROM \"Rooms\" WHERE id = $1;",
        values: [roomId]
    };
}
exports.removeRoom = removeRoom;
function updateRoom(roomName, roomId) {
    return {
        text: "UPDATE \"Rooms\" SET name = $1 WHERE id = $2;",
        values: [roomName, roomId]
    };
}
exports.updateRoom = updateRoom;
function getSensorLastState(sensorData) {
    return {
        text: "SELECT row_to_json(res)\n        FROM (SELECT s.name,\n                     CASE WHEN s.\"networkStatus\" = 'online' THEN true ELSE false END as \"networkStatus\",\n                     CASE WHEN SD.data IS NOT NULL THEN SD.data ELSE '{\"status\": 0}'::json END as \"data\",\n                     CASE WHEN sd.\"recordDateTime\" IS NOT NULL THEN SD.data END as \"recordDateTime\"\n              FROM \"Sensors\" S\n                       LEFT JOIN \"SensorsData\" SD on S.id = SD.\"idSensor\"\n              WHERE s.\"macAddress\" = $1\n              ORDER BY SD.\"recordDateTime\" DESC\n              LIMIT 1) res",
        values: [sensorData.macAddress,]
    };
}
exports.getSensorLastState = getSensorLastState;
function addSensorsToRoom(data) {
    return {
        text: "SELECT \"AddSensorsToRoom\"($1, $2);",
        values: [data.roomId, data.devices]
    };
}
exports.addSensorsToRoom = addSensorsToRoom;
