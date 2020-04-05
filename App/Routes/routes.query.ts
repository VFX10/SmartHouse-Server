export function getAllSensors() {
    return {
        text: `SELECT * FROM "Sensors"`,
        values: []
    }
}
export function insertSensor(sensorName: string, macAddress: string, sensorType: string, readingFrequency: number) {
    return {
        text: `INSERT INTO "Sensors"("name", "macAddress", "sensorType", "readingFrequency") VALUES ($1, $2, $3, $4)`,
        values: [sensorName, macAddress, sensorType, readingFrequency]
    }
}
export function updateSensor(macAddress: string, networkStatus: string) {
    return {
        text: `UPDATE "Sensors" SET "networkStatus" = $1 WHERE "macAddress" = $2`,
        values: [networkStatus, macAddress]
    }
}
export function getSensorName(macAddress: string) {
    return {
        text: `SELECT name FROM  "Sensors" WHERE "macAddress" = $1`,
        values: [macAddress]
    }
}
export function searchSensor(macAddress: string) {
    return {
        text: `SELECT count(*) FROM "Sensors" WHERE "macAddress" = $1`,
        values: [macAddress]
    }
}
export function recordSensorData(sensorId: number, data: any, date: any) {
    return {
        text: `INSERT INTO "SensorsData"("idSensor", data, "recordDateTime") VALUES ($1, $2, $3)`,
        values: [sensorId, data, date]
    }
}
export function sensorId(macAddress: string) {
    return {
        text: `SELECT id FROM "Sensors" WHERE "macAddress" = $1`,
        values: [macAddress]
    }
}

export function registerUser(userData: any) {
    return {
        text: `SELECT "CreateUser"($1, $2, $3, $4);`,
        values: [userData.email, userData.password, userData.firstName, userData.lastName]
    }
}
export function checkemail(email: any) {
    return {
        text: `SELECT count(*) FROM "Users" WHERE "email" = $1`,
        values: [email]
    }
}
export function loginUser(userData: any) {
    return {
        text: `SELECT "LoginUser"($1, $2);`,
        values: [userData.email, userData.password]
    }
}
export function addHouse(houseData: any) {
    return {
        text: `SELECT "AddHouse"($1, $2, $3);`,
        values: [houseData.houseName,
        `${houseData.country}, ${houseData.county}, ${houseData.locality}, ${houseData.street}, ${houseData.number}`, houseData.userEmail]
    }
}
export function addSensor(sensorData: any) {
    return {
        text: `SELECT "AddSensor"($1, $2, $3, $4, $5);`,
        values: [sensorData.sensorName,
        sensorData.sensorType, sensorData.macAddress, sensorData.roomId, sensorData.readingFrequency]
    }
}
}
export function addSensorWithoutRoom(sensorData: any) {
    return {
        text: `SELECT "AddSensorWithoutRoom"($1, $2, $3, $4, $5);`,
        values: [sensorData.sensorName,
        sensorData.sensorType, sensorData.macAddress, sensorData.readingFrequency, sensorData.userEmail]
    }
}
export function removeSensorFromRoom(macAddress: any) {
    // return {
    //     text: `Update "Sensors" set "idRoom" = null WHERE "macAddress" = $1;
    //     SELECT ("idRoom" IS NULL) AS RESPONSE FROM "Sensors" WHERE "macAddress" = $1;`,
    //     values: [macAddress]
    // }
    return {
        text: `SELECT "RemoveSensorFromRoom"($1);`,
        values: [macAddress]
    }
}
export function addRoom(houseData: any) {
    return {
        text: `SELECT "AddRoom"($1, $2);`,
        values: [houseData.roomName, houseData.houseId]
    }
}

export function removeRoom(roomId: any) {
    return {
        text: `DELETE FROM "Rooms" WHERE id = $1;`,
        values: [roomId]
    }
}
export function updateRoom(roomName: string, roomId: number) {
    return {
        text: `UPDATE "Rooms" SET name = $1 WHERE id = $2;`,
        values: [roomName, roomId]
    }
}

export function getSensorLastState(sensorData: any) {
    return {
        text: `SELECT row_to_json(res)
        FROM (SELECT s.name,
                     CASE WHEN s."networkStatus" = 'online' THEN true ELSE false END as "networkStatus",
                     CASE WHEN SD.data IS NOT NULL THEN SD.data ELSE '{"status": 0}'::json END as "data",
                     CASE WHEN sd."recordDateTime" IS NOT NULL THEN SD.data END as "recordDateTime"
              FROM "Sensors" S
                       LEFT JOIN "SensorsData" SD on S.id = SD."idSensor"
              WHERE s."macAddress" = $1
              ORDER BY SD."recordDateTime" DESC
              LIMIT 1) res`,
        values: [sensorData.macAddress,]
    }
}
export function addSensorsToRoom(data: any) {
    return {
        text: `SELECT "AddSensorsToRoom"($1, $2);`,
        values: [data.roomId, data.devices]
    }
}

