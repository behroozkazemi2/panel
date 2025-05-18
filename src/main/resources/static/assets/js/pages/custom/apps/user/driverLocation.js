"use strict";
// Class definition


var DriverLocation = function () {
    // Private functions

    var modal = $('#kt_modal');
    var modalMessage = $('#message-modal');


    var getStatusTitle = function (status) {
        switch (status){
            case 1 : return 'در حال ماموریت';
            case 2: return 'در حال برگشت';
            case 3: return 'آماده سرویس ';
            case 4: return 'خارج از سرویس';
            default : return 'نا مشخص'
        }
    };

    var showInfo = function (val) {
        var statusColor;

        switch (val.status.id){
            case 1:
                statusColor = 'danger';
                break;
            case 2:
                statusColor = 'info';
                break;
            case 3:
                statusColor = 'success';
                break;
            default:
                statusColor = 'dark';
        }

        return $(
                '<div class="kt-widget kt-widget--user-profile-1">'+
                    '<div class="kt-widget__head">'+
                                '<div class="kt-widget__media">'+
                                 (val.avatarId > 0 ?
                                     '<img src="/thumbnail/app/get/'+ val.avatarId +'/200" alt="image">'
                                     :
                                     ('<div class="kt-badge kt-badge--xl kt-badge--' + statusColor + '">' +
                                     '<span>' + val.driverName.substring(0, 1) + '</span>' +
                                     '</div>' ))+
                                '</div>'+
                        '<div class="kt-widget__content">'+
                             '<div class="kt-widget__section">'+
                                '<p href="#" class="kt-widget__username">'+ val.driverName +'</p>'+
                                '<span class="kt-widget__subtitle">'+ getStatusTitle(val.status)+'</span>'+
                             '</div>'+
                            '<div class="kt-widget__action">'+
                                '<button type="button" data-driver-id="'+ val.driverId+ '" class="btn btn-info btn-sm">ارسال پیام</button>'+
                            '</div>'+
                        '</div>'+
                    '</div>'+
                    '<div class="kt-widget__body">'+
                         '<div class="kt-widget__content">'+
                            '<div class="kt-widget__info">'+
                                '<span class="kt-widget__label">تاریخ برداشت موقعیت:</span>'+
                                '<a href="#" class="kt-widget__data">'+ timeStampToYearMonthDayHourLRT(val.serverDate) + ' </a>'+
                            '</div>'+
                            '<div class="kt-widget__info">'+
                                '<span class="kt-widget__label">سرعت:</span>'+
                                '<a href="#" class="kt-widget__data">'+ val.speed.toFixed(0) * 3.6 + '  (km/h)</a>'+
                            '</div>'+
                            '<div class="kt-widget__info">'+
                                '<span class="kt-widget__label">دقت موقعیت :</span>'+
                                '<span class="kt-widget__data">'+ val.accuracy.toFixed(2)+ ' (متر)</span>  '+
                            '</div>'+
                         '</div>'+
                    '</div>'+
                '</div>');
    };
    // basic demo


    var showDetails = function () {

        $.ajax({
            url: '/admin/driver/location/details/' + $('#driver-status').val(),
            type: 'post',
            success: function (response) {
                if (response.result) {
                    var res;
                    vectorSource.clear();
                    if (res = JSON.parse(response.payload)) {
                        $.each(res, function (index, value) {
                            addPointOnMap(value);
                            map.getView().fit( vectorLayer.getSource().getExtent(), map.getSize() );

                        })

                    } else {
                        swal.fire({
                            "title": "عملیات ناموفق",
                            "text": "اطلاعات موقعیتی برای رانندگان یافت نشد",
                            "type": "error",
                            "confirmButtonClass": "btn btn-warning",
                            "confirmButtonText": "تایید"
                        });
                    }
                } else {
                    swal.fire({
                        "title": "عملیات ناموفق",
                        "text": response.payload,
                        "type": "error",
                        "confirmButtonClass": "btn btn-warning",
                        "confirmButtonText": "تایید"
                    });

                }
            },
            error: function () {
                swal.fire({
                    "title": "عملیات ناموفق",
                    "text": "خطا در برقراری ارتباط با سرور، لطفا مجدد تلاش نمایید.",
                    "type": "error",
                    "confirmButtonClass": "btn btn-warning",
                    "confirmButtonText": "تایید"
                });
            }
        });

        var addPointOnMap = function (value) {
            var marker = new ol.Feature({
                geometry: new ol.geom.Point(ol.proj.transform([value.lng, value.lat], 'EPSG:4326', 'EPSG:3857')),
                name: 'points',
                population: 4000,
                rainfall: 500,
                fid: value.driverId,
                attributes: {
                    accuracy: value.accuracy,
                    speed: value.speed,
                    deviceDate: value.deviceDate,
                    serverDate: value.serverDate,
                    driverId: value.driverId,
                    avatarId: value.avatarId,
                    status: value.status,
                    driverName: value.driverName
                }
            });

            marker.setStyle(new ol.style.Style({
                image: new ol.style.Icon(({
                    anchor: [0, 0],
                    anchorOrigin: 'bottom-right',
                    anchorXUnits: 'fraction',
                    anchorYUnits: 'pixels',
                    scale: .6,
                    src: getIconUrl(value.status)
                }))
            }));

            vectorSource.addFeature(marker);

            var container = $('#popup')[0];
            var closer = $('#popup-closer')[0];

            var overlay = new ol.Overlay({
                element: container,
                autoPan: true,
                autoPanAnimation: {
                    duration: 250
                }
            });
            map.addOverlay(overlay);


            map.on('singleclick', function (event) {
                var feature = map.forEachFeatureAtPixel(event.pixel,function(feature, layer) {
                        return feature;
                    });
                if (feature ){
                    modal.find('.modal-body').empty();
                    modal.find('.modal-body').append(showInfo(feature.values_.attributes));
                    modal.modal('show');
                } else {
                    closer.blur();
                }
            });

            var tooltipContainer = document.getElementById('tooltip');
            var tooltipContent = document.getElementById('tooltip-content');

            var tooltip = new ol.Overlay({
                element: tooltipContainer,
                autoPan: false,
                autoPanAnimation: {
                    duration: 250
                }
            });
            map.addOverlay(tooltip);


            var featureId = '';

            map.on('pointermove', function(evt) {
                var feature = map.forEachFeatureAtPixel(evt.pixel, function(feature) {
                    if (featureId == feature.values_.attributes.driverName) {
                        return feature;
                    };
                    featureId = feature.get('driverName');
                    var coordinates = feature.getGeometry().getCoordinates();
                    tooltipContent.innerHTML = '<p>' + feature.values_.attributes.driverName + '</p> <p> تاریخ برداشت: ' + timeStampToYearMonthDayHourLRT(feature.values_.attributes.serverDate) + '</p>';
                    tooltip.setPosition(coordinates);
                    return feature;
                });
                if (!feature && (featureId != '')) {
                    featureId = '';
                    tooltip.setPosition(undefined);
                };
            });

            modal.on('shown.bs.modal', function () {
                modal.find('[data-driver-id]').on('click',function () {
                    sendMessage($(this).data('driver-id'))
                });
            }).on('hidden.bs.modal', function () {
                modal.find('.modal-body').empty();
            });
        };

        $('.show-driver').on('click',function () {
            showDetails();
        });

    };
    var sending = function () {
        var driver =  modalMessage.find('#driver').val();
        $.ajax({
            url: '/admin/driver/sendMessage/',
            data:{
                id :  driver != 0 ? driver: $('#driver-status').val(),
                isGlobal: (driver == 0),
                title: modalMessage.find('#title').val(),
                text: modalMessage.find('textarea#message').val()
            },
            type: 'post',
            success: function (response) {
                if (response.result) {
                    swal.fire({
                        "title": "عملیات موفق",
                        "text": "پیام با موفقیت ارسال شد",
                        "type": "success",
                        "confirmButtonClass": "btn btn-success",
                        "confirmButtonText": "تایید"
                    });
                    modalMessage.find('#title').val('');
                    modalMessage.find('textarea#message').val('');
                    modalMessage.modal('hide');
                } else {
                    swal.fire({
                        "title": "عملیات ناموفق",
                        "text": response.payload,
                        "type": "error",
                        "confirmButtonClass": "btn btn-warning",
                        "confirmButtonText": "تایید"
                    });

                }
            },
            error: function () {
                swal.fire({
                    "title": "عملیات ناموفق",
                    "text": "خطا در برقراری ارتباط با سرور، لطفا مجدد تلاش نمایید.",
                    "type": "error",
                    "confirmButtonClass": "btn btn-warning",
                    "confirmButtonText": "تایید"
                });
            }
        });

    };

    var sendMessage = function( driverId){
        modalMessage.find('#driver').val(driverId);
        modalMessage.modal('show');

        modalMessage.on('hidden.bs.modal', function () {
            modalMessage.find('#title').val('');
            modalMessage.find('textarea#message').val('');
        });

    };

    return {
        // public functions
        init: function () {
            initMap('kt_driver_location');
            showDetails();

            $('#send_global_message').on('click', function () {
                sendMessage(0);
            });
            modalMessage.find('#send_message').on('click', function () {
                sending()
            });
        }
    };
}();

jQuery(document).ready(function () {
    DriverLocation.init();
});