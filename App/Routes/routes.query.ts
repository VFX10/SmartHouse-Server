export function getAllSensors() {
    return {
        text: `SELECT * FROM "Sensors"`,
        values: []
    }
}
export function insertSensor(sensorName: string, macAddress:string, sensorType: string, readingFrequency:number) {
    return {
        text: `INSERT INTO "Sensors"("name", "macAddress", "sensorType", "readingFrequency") VALUES ($1, $2, $3, $4)`,
        values:  [sensorName, macAddress, sensorType, readingFrequency]
    }
}
export function updateSensor(sensorName: string, macAddress:string, sensorType: string, readingFrequency:number) {
    return {
        text: `UPDATE "Sensors" SET name = $1, "sensorType" = $2, "readingFrequency" = $3 WHERE "macAddress" = $4`,
        values:  [sensorName, sensorType, readingFrequency, macAddress]
    }
}
export function searchSensor(macAddress:string) {
    return {
        text: `SELECT count(*) FROM "Sensors" WHERE "macAddress" = $1`,
        values:  [macAddress]
    }
}
export function recordSensorData(sensorId:number, data: any, date:any) {
    return {
        text: `INSERT INTO "SensorsData"("idSensor", data, "recordDateTime") VALUES ($1, $2, $3)`,
        values:  [sensorId, data, date]
    }
}
export function sensorId(macAddress:string) {
    return {
        text: `SELECT id FROM "Sensors" WHERE "macAddress" = $1`,
        values:  [macAddress]
    }
}

