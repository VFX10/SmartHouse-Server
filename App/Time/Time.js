"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function getCurrentTime() {
    var today = new Date();
    var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
    return time;
}
exports.getCurrentTime = getCurrentTime;
function getCurrentDate() {
    var today = new Date();
    var date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
    return date;
}
exports.getCurrentDate = getCurrentDate;
function getCurrentDateTime() {
    var today = new Date();
    var date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
    var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
    var dateTime = date + ' ' + time;
    return dateTime;
}
exports.getCurrentDateTime = getCurrentDateTime;
