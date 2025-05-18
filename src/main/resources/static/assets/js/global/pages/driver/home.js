"use strict";

var driverHome = function () {

    var getIncomeTravel = function () {

        let travelList = $('.travelList')/*.html('')*/;

        $.ajax({
            url: '/driver/incomeTravel',
            type: 'post',
            success: function (response) {
                var dataResponse = JSON.parse(response.payload);

                $.each(dataResponse, function (index, data) {
                    let requestTimeStart = timeStampToHourMinutesLRT(data.requestTimeStart);
                    let requestTimeEnd = timeStampToHourMinutesLRT(data.requestTimeEnd);
                    travelList.append(
                        '<div class="kt-widget2__item kt-widget2__item--' + getRandomTimeLineColor() + '">' +
                        '                                    <div class="kt-widget2__checkbox"></div>' +
                        '                                    <div class="kt-widget2__info">' +
                        '                                        <p class="kt-widget2__title">' + data.title + '</p>' +
                        '                                        <p class="kt-widget2__title">متقاضی: <span>' + data.requester + '</span> | <span>' + data.requesterMobile + '</span></p>' +
                        '                                        <p class="kt-widget2__username">' +
                        '                                            شروع: <span>' + requestTimeStart + '</span> | پایان: <span>' + requestTimeEnd + '</span><br>' +
                        '                                            واحد: <span>' + data.unit.name + '</span> | وضعیت: <span>' + data.status.name + '</span>' +
                        '                                        </p>' +
                        '                                    </div>' +
                        '                                    <div class="kt-widget2__actions"></div>' +
                        '                                </div>'
                    );
                });

                if (dataResponse.length == 0){
                    travelList.append(
                        '<div class="kt-widget2__item">' +
                        '                                    <div class="kt-widget2__checkbox"></div>' +
                        '                                    <div class="kt-widget2__info">' +
                        '                                        <p class="kt-widget2__title">ماموریتی برای شما ثبت نشده است.</p>' +
                        '                                    </div>' +
                        '                                    <div class="kt-widget2__actions"></div>' +
                        '                                </div>'
                    );
                }

            }
        });
    };

    var numHelper = 0;

    var getRandomTimeLineColor = function () {
        var num = Math.floor(Math.random() * 5) + 1 ;
        if (num == numHelper){
            num = Math.floor(Math.random() * 5) + 1;
        }
        numHelper = num;
        var circleColor = 'danger';
        switch (num) {
            case 1:
                circleColor = 'danger';
                break;
            case 2:
                circleColor = 'success';
                break;
            case 3:
                circleColor = 'brand';
                break;
            case 4:
                circleColor = 'warning';
                break;
            case 5:
                circleColor = 'info';
                break;
        }
        return circleColor;
    };

    var getHeader = function () {

        $.ajax({
            url: '/driver/getHeader',
            type: 'post',
            success: function (response) {
                var data = JSON.parse(response.payload)

                $('#completeTravel').text(data.completeTravel);
                $('#pendingTravel').text(data.pendingTravel);
                $('#wentVacationDayCount').text(data.wentVacationDayCount);
                $('#residuesVacationDayCount').text(data.residuesVacationDayCount);

            }
        });
    };

    return {
        init: function () {
            getIncomeTravel();
            getHeader();
        }
    };
}();

jQuery(document).ready(function () {
    driverHome.init();
});