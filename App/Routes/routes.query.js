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
        text: "SELECT row_to_json(res)\n        FROM (SELECT s.name,\n                     coalesce(s.\"networkStatus\" = 'online', false)    as \"networkStatus\",\n                     coalesce(SD.data, '{}'::json)                    as \"data\",\n                     coalesce(SD.\"recordDateTime\", current_timestamp) as \"recordDateTime\"\n              FROM \"Sensors\" S\n                       LEFT JOIN \"SensorsData\" SD on S.id = SD.\"idSensor\"\n              WHERE s.\"macAddress\" = $1\n              ORDER BY SD.\"recordDateTime\" DESC\n              LIMIT 1) res;",
        values: [sensorData.macAddress,]
    };
}
exports.getSensorLastState = getSensorLastState;
function getWeeklyPowerStats(sensorData) {
    return {
        text: "SELECT array_to_json(ARRAY(SELECT row_to_json(rec)\n        FROM (\n                 SELECT ROUND(AVG(CAST(data ->> 'power' AS NUMERIC)), 2) AS power,\n                        MAX(SD.\"recordDateTime\")                         AS date,\n                        MAX(EXTRACT(DOW FROM SD.\"recordDateTime\"))       AS \"dayOfWeek\"\n                 FROM \"SensorsData\" SD\n                          INNER JOIN \"Sensors\" S ON SD.\"idSensor\" = S.id\n                 WHERE S.\"macAddress\" = $1\n                   AND CAST(data ->> 'power' AS NUMERIC) > 0\n                   AND extract(WEEK FROM SD.\"recordDateTime\") = EXTRACT(WEEK FROM CAST($2 AS DATE))\n                   AND EXTRACT(YEAR FROM SD.\"recordDateTime\") =\n                       EXTRACT(YEAR FROM CAST($2 AS DATE))\n                 GROUP BY EXTRACT(YEAR FROM SD.\"recordDateTime\"),\n                          EXTRACT(MONTH FROM SD.\"recordDateTime\"), \n                          EXTRACT(DAY FROM SD.\"recordDateTime\")\n                 ORDER BY \"dayOfWeek\") rec));",
        values: [sensorData.macAddress, sensorData.currentDateTime]
    };
}
exports.getWeeklyPowerStats = getWeeklyPowerStats;
function getMonthlyPowerStats(sensorData) {
    return {
        text: "SELECT array_to_json(ARRAY(SELECT row_to_json(rec)\n        FROM (\n                 SELECT ROUND(AVG(CAST(data ->> 'power' AS NUMERIC)), 2) AS power,\n                        EXTRACT(MONTH FROM SD.\"recordDateTime\")          AS month,\n                        MAX(SD.\"recordDateTime\")                         AS date\n                 FROM \"SensorsData\" SD\n                          INNER JOIN \"Sensors\" S ON SD.\"idSensor\" = S.id\n                 WHERE S.\"macAddress\" = $1\n                   AND CAST(data ->> 'power' AS NUMERIC) > 0\n                   AND EXTRACT(YEAR FROM SD.\"recordDateTime\") =\n                       EXTRACT(YEAR FROM CAST($2 AS DATE))\n                 GROUP BY EXTRACT(YEAR FROM SD.\"recordDateTime\"),\n                          EXTRACT(MONTH FROM SD.\"recordDateTime\")\n                 ORDER BY month) rec));",
        values: [sensorData.macAddress, sensorData.currentDateTime]
    };
}
exports.getMonthlyPowerStats = getMonthlyPowerStats;
function getYearlyPowerStats(sensorData) {
    return {
        text: "SELECT array_to_json(ARRAY(SELECT row_to_json(rec)\n        FROM (\n                 SELECT ROUND(AVG(CAST(data ->> 'power' AS NUMERIC)), 2) AS power,\n                        MAX(SD.\"recordDateTime\")                         AS date,\n                        EXTRACT(YEAR FROM SD.\"recordDateTime\")           AS year\n                 FROM \"SensorsData\" SD\n                          INNER JOIN \"Sensors\" S ON SD.\"idSensor\" = S.id\n                 WHERE S.\"macAddress\" = $1\n                   AND CAST(data ->> 'power' AS NUMERIC) > 0\n                 GROUP BY EXTRACT(YEAR FROM SD.\"recordDateTime\")\n                 ORDER BY EXTRACT(YEAR FROM SD.\"recordDateTime\")) rec));",
        values: [sensorData.macAddress]
    };
}
exports.getYearlyPowerStats = getYearlyPowerStats;
function getMonthsPowerStats(sensorData) {
    return {
        text: "SELECT array_to_json(ARRAY(SELECT row_to_json(rec)\n        FROM (\nselect Date(s), trim(TO_CHAR(s, 'Month')) AS \"monthName\", coalesce(t.power, 0) as \"powerAverage\"\nFROM generate_series(Concat($1::text, '-01-01')::timestamp, Concat($1::text, '-12-31')::timestamp, '1 month') s\nLEFT JOIN (SELECT ROUND(AVG(CAST(data ->> 'power' AS NUMERIC)), 2) AS power,\n        EXTRACT(MONTH FROM SD.\"recordDateTime\")          AS month,\n        MAX(SD.\"recordDateTime\")                         AS date\n FROM \"SensorsData\" SD\n          INNER JOIN \"Sensors\" S ON SD.\"idSensor\" = S.id\n WHERE S.\"macAddress\" = $2\n   AND CAST(data ->> 'power' AS NUMERIC) > 0\n   AND EXTRACT(YEAR FROM SD.\"recordDateTime\") =\n       $1::int\n GROUP BY EXTRACT(YEAR FROM SD.\"recordDateTime\"),\n          EXTRACT(MONTH FROM SD.\"recordDateTime\")\n ORDER BY month) t on EXTRACT(MONTH FROM t.date) = EXTRACT(MONTH FROM s)\norder by s) rec), true);",
        values: [sensorData.year, sensorData.macAddress]
    };
}
exports.getMonthsPowerStats = getMonthsPowerStats;
function getWeeksPowerStats(sensorData) {
    return {
        text: "SELECT array_to_json(ARRAY(SELECT row_to_json(rec)\n        FROM (\nselect Date(s), coalesce(t.power, 0) as \"powerAverage\"\nFROM generate_series(Concat($1::int, '-', $2::int ,'-01')::timestamp, Concat($1::int, '-', ($2 +1)::int,'-01')::timestamp, '1 week') s\nLEFT JOIN (SELECT ROUND(AVG(CAST(data ->> 'power' AS NUMERIC)), 2) AS power,\n        EXTRACT(week FROM SD.\"recordDateTime\")          AS week,\n        MAX(SD.\"recordDateTime\")                         AS date\n FROM \"SensorsData\" SD\n          INNER JOIN \"Sensors\" S ON SD.\"idSensor\" = S.id\n WHERE S.\"macAddress\" = $3\n   AND CAST(data ->> 'power' AS NUMERIC) > 0\n   AND EXTRACT(YEAR FROM SD.\"recordDateTime\") = $1::int\n GROUP BY EXTRACT(YEAR FROM SD.\"recordDateTime\"),\n          EXTRACT(week FROM SD.\"recordDateTime\")\n ORDER BY week) t on EXTRACT(Week FROM t.date) = EXTRACT(Week FROM s)\norder by s) rec), true);",
        values: [sensorData.year, sensorData.month, sensorData.macAddress]
    };
}
exports.getWeeksPowerStats = getWeeksPowerStats;
function addSensorsToRoom(data) {
    return {
        text: "SELECT \"AddSensorsToRoom\"($1, $2);",
        values: [data.roomId, data.devices]
    };
}
exports.addSensorsToRoom = addSensorsToRoom;
