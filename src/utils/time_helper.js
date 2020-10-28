import moment from 'moment'

export function getTodayAt0() {
    return parseInt(new Date(new Date(new Date().toLocaleDateString()).getTime()) / 1000);
}

//单位毫秒
export function changeData(timeStamp, type = 'YYYY-MM-DD') {
    return moment(timeStamp).format(type);
}

//获取一个月的时间戳范围
export function getMouthArrTimeStamp() {
    var StartStringTime = moment(Date.now()).format('YYYY-MM-01').valueOf();
    var startTime = parseInt(Date.parse(new Date(StartStringTime)) / 1000);
    var endStringTime = moment(Date.now()).add(1, 'months')
        .format("YYYY-MM-01 00:00:00")
        .valueOf();
    var endTime = parseInt(Date.parse(new Date(endStringTime)) / 1000);

    return [startTime, endTime];
}

//获取一年范围的时间戳范围
export function getYearArrTimeStamp() {
    var StartStringTime = moment(Date.now()).format('YYYY-01-01').valueOf();
    var startTime = parseInt(Date.parse(new Date(StartStringTime)) / 1000);
    var endStringTime = moment(Date.now()).add(1, 'years')
        .format("YYYY-01-01 00:00:00")
        .valueOf();
    var endTime = parseInt(Date.parse(new Date(endStringTime)) / 1000);

    return [startTime, endTime];
}

export function getTimeArrTimeStamp(timeArr) {
    var startTime = parseInt(Date.parse(new Date(timeArr[0])) / 1000);
    var endTime = parseInt(Date.parse(new Date(timeArr[1])) / 1000);

    return [startTime, endTime];
}

export default {
    getTodayAt0,
    changeData,
    getMouthArrTimeStamp,
    getYearArrTimeStamp,
    getTimeArrTimeStamp
}