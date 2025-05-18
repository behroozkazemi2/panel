"use strict";

var notification = function () {

    var getNotification = function () {

        $.ajax({
            url: '/admin/notification/get',
            type: 'post',
            success: function (response) {
                console.log(response);

                $('#notificationCount').text(response.length);

                let event = $('.event-container').html('');
                let alarm = $('.alarm-container').html('');

                let eventCount = 0;
                let alarmCount = 0;

                let eventList = '';
                let alarmList = '';

                $.each(response, function (index, data) {
                    switch (response[index].notificationType.id){
                        case 1:
                            alarmCount++;
                            alarmList +=
                                '<a href="' + generateLink(response[index]) + '" class="kt-notification__item">' +
                                '   <div class="kt-notification__item-icon">' +
                                '       <i class="flaticon2-notification ' + getIconColor(response[index].expired) + '"></i>' +
                                '   </div>' +
                                '   <div class="kt-notification__item-details">' +
                                '       <div class="kt-notification__item-title">' + generateNotificationTitle(response[index]) +
                                '       </div>' +
                                '       <div class="kt-notification__item-time">' + checkNotificationTime(response[index].date) +
                                '       </div>' +
                                '   </div>' +
                                '</a>';
                            break;
                        case 2:
                            eventCount++;
                            eventList +=
                                '<a href="' + generateLink(response[index]) + '" class="kt-notification__item">' +
                                '   <div class="kt-notification__item-icon">' +
                                '       <i class="flaticon2-notification ' + getIconColor(response[index].expired) + '"></i>' +
                                '   </div>' +
                                '   <div class="kt-notification__item-details">' +
                                '       <div class="kt-notification__item-title">' + generateEventNotificationTitle(response[index]) +
                                '       </div>' +
                                '       <div class="kt-notification__item-time">' + checkNotificationTime(response[index].date) +
                                '       </div>' +
                                '   </div>' +
                                '</a>';
                            break;
                    };
                });

                if (alarmCount == 0){
                    alarm.html(
                        '<div class="kt-grid kt-grid--ver" style="min-height: 200px;">' +
                        '                                        <div class="kt-grid kt-grid--hor kt-grid__item kt-grid__item--fluid kt-grid__item--middle">' +
                        '                                            <div class="kt-grid__item kt-grid__item--middle kt-align-center event-container">' +
                        '                                                همه اعلان‌ها بررسی شده!' +
                        '                                                <br>اعلان جدید ثبت نشده است' +
                        '                                            </div>' +
                        '                                        </div>' +
                        '                                    </div>')
                }else {
                    alarm.html(alarmList);
                }

                if (eventCount == 0){
                    event.html(
                        '<div class="kt-grid kt-grid--ver" style="min-height: 200px;">' +
                        '                                        <div class="kt-grid kt-grid--hor kt-grid__item kt-grid__item--fluid kt-grid__item--middle">' +
                        '                                            <div class="kt-grid__item kt-grid__item--middle kt-align-center event-container">' +
                        '                                                همه اعلان‌ها بررسی شده!' +
                        '                                                <br>اعلان جدید ثبت نشده است' +
                        '                                            </div>' +
                        '                                        </div>' +
                        '                                    </div>')
                }else {
                    event.html(eventList);
                }


            },
            error: function () {}
        });

    };

    var generateLink = function (data) {
        switch (data.type.id) {

            case 5:
                return '/admin/contract';
            case 6:
                return '/admin/vacation';
            case 7:
                return '/admin/request';
            case 8:
                return '/admin/travel';
            case 9:
                return '/admin/travel';
            case 10:
                return '/admin/travel';
            case 11:
                return '/admin/travel';

            default:
                return '/admin/driver/edit/' + data.driverId + '/' + data.vehicleId

        }
    };

    var getIconColor = function (expired) {
        return expired ? 'kt-font-danger' : 'kt-font-warning';
    };

    var generateNotificationTitle = function (data) {
        let title = data.type.name + ' ';

        title += data.driverName + ' ';
        title += data.expired ? 'پایان‌ یافته‌است.' : 'در حال اتمام می‌باشد.';

        return title;
    };
    var generateEventNotificationTitle = function (data) {
        return  data.type.name +' '+data.driverName + ' ثبت شده است ';
    };

    var checkNotificationTime = function (notifDate) {

        var date = new Date();

        var diff = date.getTime() - notifDate;

        return convertMillisecondsToDigitalClock(diff);

    };

    var convertMillisecondsToDigitalClock = function (ms) {
        var hours = Math.floor(ms / 3600000); // 1 Hour = 36000 Milliseconds
        var minutes = Math.floor((ms % 3600000) / 60000); // 1 Minutes = 60000 Milliseconds
        var seconds = Math.floor(((ms % 360000) % 60000) / 1000); // 1 Second = 1000 Milliseconds

        var clock = {
            hours : hours,
            minutes : minutes,
            seconds : seconds,
            clock : hours + ":" + minutes + ":" + seconds
        };

        if (hours > 0) {

            if (hours >= 24) {
                return (hours/24).toFixed() + " روز پیش";
            }

            if (minutes > 30) {
                return (hours+1) + " ساعت پیش";
            }


            return hours + " ساعت پیش";
        }

        if (minutes > 0) {
            return minutes + " دقیقه پیش";
        }

        return "الان";

    };


    var getNotificationInterval = function() {
        setInterval(function() {

            getNotification();

        }, 60000);
    };

    return {
        init: function () {
            getNotification();
            getNotificationInterval();
        },
    };
}();

jQuery(document).ready(function () {
    notification.init();
});