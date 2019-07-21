export function getAllSensors() {
    return {
        text: `SELECT * FROM sensors`,
        values: []
    }
}
export function insertSensor(sensorName: string, macAddress:string, ipAddress: string) {
    return {
        text: `INSERT INTO "sensors"("sensorName", "macAddress","ipAddress") VALUES ($1, $2, $3)`,
        values:  [sensorName, macAddress, ipAddress]
    }
}
export function searchSensor(macAddress:string) {
    return {
        text: `SELECT count(*) FROM "sensors" WHERE "macAddress" = $1`,
        values:  [macAddress]
    }
}
export function recordSensorData(sensorId:number, data: any, date:any) {
    return {
        text: `INSERT INTO "sensorsData"("sensorId", data, date) VALUES ($1, $2, $3)`,
        values:  [sensorId, data, date]
    }
}
export function sensorId(macAddress:string) {
    return {
        text: `SELECT id FROM "sensors" WHERE "macAddress" = $1`,
        values:  [macAddress]
    }
}

