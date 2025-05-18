var timeStampToYearMonthDay = function (timeStamp) {
    if (timeStamp == null) {
        return "-";
    }
    var year = persianDate.unix((timeStamp / 1000)).pDate.year;
    var month = persianDate.unix((timeStamp / 1000)).pDate.month;
    var day = persianDate.unix((timeStamp / 1000)).pDate.date;


    var yearMonthDay = year + '/' + month + '/' + day;

    return yearMonthDay;
};

var timeStampToYearMonthDayHourLRT = function (timeStamp) {
    var year = persianDate.unix((timeStamp / 1000)).pDate.year;
    var month = persianDate.unix((timeStamp / 1000)).pDate.month;
    var day = persianDate.unix((timeStamp / 1000)).pDate.date;

    var date = new Date(timeStamp);
    var hours = date.getHours();
    var minutes = ":" + (date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes());
    var seconds = ":" + (date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds());


    var yearMonthDay =
        hours + minutes + seconds +
        '   ' +
        year + '/' +
        (month < 10 ? '0' + month : month ) + '/' +
        (day < 10 ? '0' + day : day   );


    return yearMonthDay;
};

var timeStampToHourMinutesLRT = function (timeStamp) {
    var date = new Date(timeStamp);
    var hours = date.getHours();
    var minutes = ":" + (date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes());

    return hours + minutes;
};

var timeStampToHourMinutesSecondLRT = function (timeStamp) {
    var date = new Date(timeStamp);
    var hours = date.getHours();
    var minutes = ":" + (date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes());
    var second = ":" + (date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds());
    return hours + minutes + second;
};

var showMinAndHour = function (perMinutes) {
    var hour = parseInt(perMinutes / 60);
    var min = parseInt(perMinutes % 60);

    if (hour < 10) hour = "0" + hour;
    if (min < 10) min = "0" + min;

    return hour + ' : ' + min
};
var showMinAndHourReverse = function (perMinutes) {

    var hour = parseInt(perMinutes / 60);
    var min = parseInt(perMinutes % 60);

    if (hour < 10 ) hour = "0" + hour;
    if (min < 10) min = "0" + min;

    return min + ' : ' + hour
};