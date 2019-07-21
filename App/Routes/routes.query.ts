export function getAllSensors() {
    return {
        text: `SELECT * FROM "Sensors"`,
        values: []
    }
}
export function insertSensor(sensorName: string, macAddress:string, sensorType: string) {
    return {
        text: `INSERT INTO "Sensors"("name", "macAddress", "sensorType") VALUES ($1, $2, $3)`,
        values:  [sensorName, macAddress, sensorType]
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

