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
                     coalesce(s."networkStatus" = 'online', false)    as "networkStatus",
                     coalesce(SD.data, '{}'::json)                    as "data",
                     coalesce(SD."recordDateTime", current_timestamp) as "recordDateTime"
              FROM "Sensors" S
                       LEFT JOIN "SensorsData" SD on S.id = SD."idSensor"
              WHERE s."macAddress" = $1
              ORDER BY SD."recordDateTime" DESC
              LIMIT 1) res;`,
        values: [sensorData.macAddress,]
    }
}

export function getWeeklyPowerStats(sensorData: any) {
    return {
        text: `SELECT array_to_json(ARRAY(SELECT row_to_json(rec)
        FROM (
                 SELECT ROUND(AVG(CAST(data ->> 'power' AS NUMERIC)), 2) AS power,
                        MAX(SD."recordDateTime")                         AS date,
                        MAX(EXTRACT(DOW FROM SD."recordDateTime"))       AS "dayOfWeek"
                 FROM "SensorsData" SD
                          INNER JOIN "Sensors" S ON SD."idSensor" = S.id
                 WHERE S."macAddress" = $1
                   AND CAST(data ->> 'power' AS NUMERIC) > 0
                   AND extract(WEEK FROM SD."recordDateTime") = EXTRACT(WEEK FROM CAST($2 AS DATE))
                   AND EXTRACT(YEAR FROM SD."recordDateTime") =
                       EXTRACT(YEAR FROM CAST($2 AS DATE))
                 GROUP BY EXTRACT(YEAR FROM SD."recordDateTime"),
                          EXTRACT(MONTH FROM SD."recordDateTime"), 
                          EXTRACT(DAY FROM SD."recordDateTime")
                 ORDER BY "dayOfWeek") rec));`,
        values: [sensorData.macAddress,sensorData.currentDateTime]
    }
}
export function getMonthlyPowerStats(sensorData: any) {
    return {
        text: `SELECT array_to_json(ARRAY(SELECT row_to_json(rec)
        FROM (
                 SELECT ROUND(AVG(CAST(data ->> 'power' AS NUMERIC)), 2) AS power,
                        EXTRACT(MONTH FROM SD."recordDateTime")          AS month,
                        MAX(SD."recordDateTime")                         AS date
                 FROM "SensorsData" SD
                          INNER JOIN "Sensors" S ON SD."idSensor" = S.id
                 WHERE S."macAddress" = $1
                   AND CAST(data ->> 'power' AS NUMERIC) > 0
                   AND EXTRACT(YEAR FROM SD."recordDateTime") =
                       EXTRACT(YEAR FROM CAST($2 AS DATE))
                 GROUP BY EXTRACT(YEAR FROM SD."recordDateTime"),
                          EXTRACT(MONTH FROM SD."recordDateTime")
                 ORDER BY month) rec));`,
        values: [sensorData.macAddress,sensorData.currentDateTime]
    }
}
export function getYearlyPowerStats(sensorData: any) {
    return {
        text: `SELECT array_to_json(ARRAY(SELECT row_to_json(rec)
        FROM (
                 SELECT ROUND(AVG(CAST(data ->> 'power' AS NUMERIC)), 2) AS power,
                        MAX(SD."recordDateTime")                         AS date,
                        EXTRACT(YEAR FROM SD."recordDateTime")           AS year
                 FROM "SensorsData" SD
                          INNER JOIN "Sensors" S ON SD."idSensor" = S.id
                 WHERE S."macAddress" = $1
                   AND CAST(data ->> 'power' AS NUMERIC) > 0
                 GROUP BY EXTRACT(YEAR FROM SD."recordDateTime")
                 ORDER BY EXTRACT(YEAR FROM SD."recordDateTime")) rec));`,
        values: [sensorData.macAddress]
    }
}
export function getMonthsPowerStats(sensorData: any) {
    return {
        text: `SELECT array_to_json(ARRAY(SELECT row_to_json(rec)
        FROM (
select Date(s), trim(TO_CHAR(s, 'Month')) AS "monthName", coalesce(t.power, 0) as "powerAverage"
FROM generate_series(Concat($1::text, '-01-01')::timestamp, Concat($1::text, '-12-31')::timestamp, '1 month') s
LEFT JOIN (SELECT ROUND(AVG(CAST(data ->> 'power' AS NUMERIC)), 2) AS power,
        EXTRACT(MONTH FROM SD."recordDateTime")          AS month,
        MAX(SD."recordDateTime")                         AS date
 FROM "SensorsData" SD
          INNER JOIN "Sensors" S ON SD."idSensor" = S.id
 WHERE S."macAddress" = $2
   AND CAST(data ->> 'power' AS NUMERIC) > 0
   AND EXTRACT(YEAR FROM SD."recordDateTime") =
       $1::int
 GROUP BY EXTRACT(YEAR FROM SD."recordDateTime"),
          EXTRACT(MONTH FROM SD."recordDateTime")
 ORDER BY month) t on EXTRACT(MONTH FROM t.date) = EXTRACT(MONTH FROM s)
order by s) rec), true);`,
        values: [sensorData.year, sensorData.macAddress]
    }
}
export function getWeeksPowerStats(sensorData: any) {
    return {
        text: `SELECT array_to_json(ARRAY(SELECT row_to_json(rec)
        FROM (
select Date(s), coalesce(t.power, 0) as "powerAverage"
FROM generate_series(Concat($1::int, '-', $2::int ,'-01')::timestamp, Concat($1::int, '-', ($2 +1)::int,'-01')::timestamp, '1 week') s
LEFT JOIN (SELECT ROUND(AVG(CAST(data ->> 'power' AS NUMERIC)), 2) AS power,
        EXTRACT(week FROM SD."recordDateTime")          AS week,
        MAX(SD."recordDateTime")                         AS date
 FROM "SensorsData" SD
          INNER JOIN "Sensors" S ON SD."idSensor" = S.id
 WHERE S."macAddress" = $3
   AND CAST(data ->> 'power' AS NUMERIC) > 0
   AND EXTRACT(YEAR FROM SD."recordDateTime") = $1::int
 GROUP BY EXTRACT(YEAR FROM SD."recordDateTime"),
          EXTRACT(week FROM SD."recordDateTime")
 ORDER BY week) t on EXTRACT(Week FROM t.date) = EXTRACT(Week FROM s)
order by s) rec), true);`,
        values: [sensorData.year, sensorData.month, sensorData.macAddress]
    }
}


export function addSensorsToRoom(data: any) {
    return {
        text: `SELECT "AddSensorsToRoom"($1, $2);`,
        values: [data.roomId, data.devices]
    }
}

