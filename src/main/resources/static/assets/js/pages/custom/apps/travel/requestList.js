"use strict";
// Class definition

var KTDatatableRemoteAjaxDemo = function () {
    // Private functions

    var initList = function (value) {
        var el = $(".item-data");
        el.empty();
        $.each(value, function (index,data) {
            setPortlet(el,data);
        })
    };
    var setPortlet = function (el, data) {

        var $portlet = $('<div class="col-xl-3 col-lg-6 col-md-12">' +
            <!--Begin::Portlet-->
            '<div class="kt-portlet kt-portlet--height-fluid">' +
            '<div class="kt-portlet__head kt-portlet__head--noborder">' +
            '<div class="kt-portlet__head-label">' +
            '<h3 class="kt-portlet__head-title">' +
            '</h3>' +
            '</div>' +
            '</div>' +
            '<div class="kt-portlet__body">' +

            <!--begin::Widget -->
            '<div class="kt-widget kt-widget--user-profile-2">' +
            '<div class="kt-widget__head">' +
            '<div class="kt-widget__media">' +
            (data.avatarId > 0 ?
                '<img class="kt-widget__img " src="/thumbnail/app/get/' + data.avatarId + '/200" alt="image">' :
                '<div class="kt-widget__pic kt-widget__pic--' + ["success", "brand", "danger", "success", "warning", "dark", "primary", "info"][KTUtil.getRandomInt(0, 7)] + ' kt-font-success kt-font-boldest kt-hidden">' +
                data.firstName.substring(0, 1) + data.lastName.substring(0, 1) +
                '</div>') +
            '</div>' +
            '<div class="kt-widget__info">' +
            '<span class="kt-widget__username">' +
            data.firstName + ' ' + data.lastName +
            '</span>' +
            '<span class="kt-widget__desc">' +
            data.mobile +
            '</span>' +
            [   '<span class="kt-badge kt-badge--danger kt-badge--inline">در حال ماموریت</span>',
                '<span class="kt-badge kt-badge--info kt-badge--inline">در حال برگشت</span>',
                '<span class="kt-badge kt-badge--success kt-badge--inline">آماده سرویس</span>',
                '<span class="kt-badge kt-badge--dark kt-badge--inline">خارج از سرویس</span>'][data.status.id - 1] +
            '</div>' +
            '</div>' +
            '<div class="kt-widget__body">' +
            '<div class="kt-widget__section">' +
            '</div>' +
            '<div class="kt-widget__item">' +
            '<div class="kt-widget__contact">' +
            '<span class="kt-widget__label">مشخصات خودرو</span>' +
            '<span  class="kt-widget__data">' + (data.vehicle == null ? 'فاقد خودرو' : data.vehicle.vehicle.name) + '</span>' +
            '</div>' +
            '<div class="kt-widget__contact">' +
            '<span class="kt-widget__label">پلاک</span>' +
            '<span  class="kt-widget__data">' + (data.vehicle == null ? 'فاقد خودرو' : data.vehicle.plate == null ? 'پلاک ثبت نشده' :
                data.vehicle.plate.first + ' ' + data.vehicle.plate.character + ' &nbsp;' + data.vehicle.plate.second + '- ایران ' + data.vehicle.plate.cityNumber) + '</span>' +
            '</div>' +
            '<div class="kt-widget__contact">' +
            '<span class="kt-widget__label">تاریخ آخرین ماموریت:</span>' +
            '<span  class="kt-widget__data">' + (data.lastTravelComplete!= null ? timeStampToYearMonthDayHourLRT(data.lastTravelComplete):'ثبت نشده') + '</span>' +
            '</div>' +
            '<div class="kt-widget__contact">' +
            '<span class="kt-widget__label">تاریخ ماموریت بعدی:</span>' +
            '<span  class="kt-widget__data">' + (data.nextTravelComplete!= null ? timeStampToYearMonthDayHourLRT(data.nextTravelComplete):'ثبت نشده') + '</span>' +
            '</div>' +
            '</div>' +
            '</div>' +
            '<div class="kt-widget__footer">' +
            '<div class="btn-group col-12" role="group" aria-label="Default button group">' +
            '<button type="button" title="تخصیص راننده" class="btn btn-outline-warning " data-driver-request="' + data.id + '/' + modal.find('[date-request-id]').data('request-id') + '" >تخصیص ماموریت</button>' +
            '<button type="button" title="موقعیت راننده" class="btn btn-outline-dark " data-driver-location = "' + data.id + '">موقعیت راننده</button>' +
            '</div>' +
            '</div>' +
            '</div>' +

            <!--end::Widget -->
            '</div>' +
            '</div>');


        el.append($portlet);
    };

    var selectedTabGrid = 1;

    var getSelectedTab = function () {
        $(document).on('click', '#tablist a', function () {
            selectedTabGrid = $(this).data('id');
            list();
        });
    };

    var requestGrid;
    var mapModal = $('#kt_modal_map');
    var addPointOnMap = function (value) {
        vectorSource.clear();
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
        map.getView().setCenter(ol.proj.transform([value.lng, value.lat], 'EPSG:4326', 'EPSG:3857'));
        map.getView().setZoom(15);
    };

    // basic demo
    var list = function () {
        var modal2 = $('#kt_modal_remote');


        if (requestGrid) {
            requestGrid.destroy();
        }
        var el = $('#ajax_data');
        requestGrid = el.KTDatatable({
            // datasource definition
            data: {
                type: 'remote',
                source: {
                    read: {
                        url: '/admin/request/list/' + selectedTabGrid,
                        // sample custom headers
                        headers: {'x-my-custokt-header': 'some value', 'x-test-header': 'the value'},
                        map: function (raw) {
                            // sample data mapping
                            var dataSet = raw;
                            if (typeof raw.data !== 'undefined') {
                                dataSet = raw.data;
                                $('.total').text(raw.meta.total);
                            }
                            return dataSet;
                        },
                    },
                },
                pageSize: 10,
                serverPaging: true,
                serverFiltering: true,
                serverSorting: true,
            },


            // layout definition
            layout: {
                theme: 'default',
                scroll: false,
                footer: false,
            },


            pagination: true,

            search: {
                input: $('#generalSearch'),
                delay: 300,
            },

            // column sorting
            sortable: true,

            // columns definition
            columns: [
                {
                    field: 'user',
                    title: 'متقاضی',
                    sortable: false,
                    autoHide: false,
                    width: 100,
                    template: function (row) {
                        return '<p>' + row.requesterFirstName + ' ' + row.requesterLastName + '</p>' +
                               '<p>' + row.requesterMobile + "</p>"
                    },
                },
                {
                    field: 'title',
                    title: 'عنوان',
                    width: '200px',
                    sortable: false
                },
                {
                    field: 'origin-destination',
                    title: 'مبدا / مقصد',
                    sortable: false,
                    template: function (row) {
                        return '<p class="kt-margin-b-5">مبدا: ' + (row.origin != null ? row.origin : 'ثبت نشده') + '</p>' +
                            '<p class="kt-margin-b-5">مقصد: ' + (row.destination != null ? row.destination : 'ثبت نشده') + '</p>'
                    },
                },
                {
                    field: 'date',
                    title: 'تاریخ و ساعت',
                    sortable: false,

                    width: '200px',
                    template: function (row) {
                        return '<p class="kt-margin-b-5">تاریخ درخواست: ' + (row.requestDate != null ? '<span>' + timeStampToYearMonthDayHourLRT(row.requestDate) + '</span>' : 'ثبت نشده') + '</p>'
                           + '<p class="kt-margin-b-5">تاریخ شروع: ' + (row.requestDate != null ? '<span>' + timeStampToYearMonthDayHourLRT(row.requesterStart) + '</span>' : 'ثبت نشده') + '</p>'
                        + '<p class="kt-margin-b-0">تاریخ پایان: ' + (row.requestDate != null ? '<span>' + timeStampToYearMonthDayHourLRT(row.requesterEnd) + '</span>' : 'ثبت نشده') + '</p>'
                    },
                },
                {
                    field: 'Actions',
                    title: 'عملیات',
                    sortable: false,
                    width: '100px',
                    autoHide: false,
                    textAlign: 'center',
                    template: function (row) {
                        return '<button type="button" title="تخصیص راننده" class="btn  btn-sm btn-outline-dark btn-elevate btn-icon kt-margin-5" data-record-id="' + row.id + '" ><i class="la la-user-plus"></i></button>' +
                               '<button type="button" title="جزئیات ماموریت" class="btn btn-sm btn-outline-brand btn-elevate btn-icon kt-margin-5 " data-request-id = "' + row.id + '"><i class="la la-newspaper-o"></i></button>' +
                               '<button type="button" title="لغو ماموریت" class="btn btn-sm btn-outline-danger btn-elevate btn-icon kt-margin-5 " data-delete-id = "' + row.id + '"><i class="la la-close"></i></button>' +
                            (selectedTabGrid == 1 ?
                               '<button type="button" title="ویرایش" class="btn btn-sm btn-outline-success btn-elevate btn-icon kt-margin-5 " data-edit-id = "' + row.id + '" href="/admin/request/edit/' + row.id + '"><i class="la la-edit"></i></button>'
                                : '');
                    }
                }]

        });



        requestGrid.on('click', '[data-record-id]', function () {
            // modalSubRemoteDatatable($(this).data('record-id'));
            $('#kt_modal_sub_KTDatatable_remote').find('[date-request-id]').data('request-id', $(this).data('record-id'));
            $('#kt_modal_sub_KTDatatable_remote').modal('show');
        });

        requestGrid.on('click', '[data-delete-id]', function () {
            var travelId = $(this).data('delete-id');
            swal.fire({
                title: 'لغو ماموریت',
                text: "آیا از ادامه عملیات اطمینان دارید؟",
                type: 'warning',
                showCancelButton: true,
                cancelButtonText: 'انصراف',
                confirmButtonText: 'لغو شود'
            }).then(function (result) {
                if (result.value) {
                    $.ajax({
                        url: '/admin/travel/delete/' + travelId,
                        type: 'post',

                        success: function (response) {
                            if (response.result) {
                                swal.fire({
                                    "title": 'عملیات موفق',
                                    "text": 'ماموریت لغو شد',
                                    "type": 'success',
                                    "confirmButtonClass": "btn btn-secondary",
                                    "confirmButtonText": "تایید"
                                });
                                requestGrid.reload();
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
                }
            });

        });

        requestGrid.on('click', '[data-edit-id]', function () {
            window.location = '/admin/request/edit/'+ $(this).data('edit-id');
        });

        requestGrid.on('click', '[data-request-id]', function () {
            $.ajax({
                url: '/admin/travel/travelDetail/' + $(this).data('request-id'),
                type: 'post',
                dataType: "html",
                success: function (response) {
                    // KTApp.unprogress(btn);
                    if (response) {
                        modal2.find('.modal-content').empty();
                        modal2.find('.modal-content').append(response);
                        modal2.modal('show');
                    } else {
                        swal.fire({
                            "title": "عملیات ناموفق!",
                            "text": "خطا در دریافت اطلاعات",
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
                        "confirmButtonText": "باشه"
                    });
                }
            });

            modal2.on('shown.bs.modal', function () {
                $("#kt_gmap_8").empty();
                initMap('kt_gmap_8');
            }).on('hidden.bs.modal', function () {
                modal2.find('#point-alert').hide();
                modal2.find('#marker-alert').hide();
                modal2.find('.modal-content').empty();
            });

        });
    };


    var modal = $('#kt_modal_sub_KTDatatable_remote');

    modal.on('shown.bs.modal', function () {


        var modalContent = $(this).find('.modal-content');
        $.ajax({
            url: '/admin/request/availableDriver/' + modal.find('[date-request-id]').data('request-id'),
            type: 'post',
            success: function (response) {
                // KTApp.unprogress(btn);
                if (response.data) {
                    initList(response.data);
                }else{
                    swal.fire({
                        "title": "",
                        "text": "راننده  فعال پیدا نشد!",
                        "type": "warning",
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
                    "confirmButtonClass": "btn btn-error",
                    "confirmButtonText": "تایید"
                });
            }
        });

    }).on('hidden.bs.modal', function () {
        // el.KTDatatable('destroy');
    });

    mapModal.on('hidden.bs.modal', function () {
    });

    modal.on('click','[data-driver-location]',function () {
        var driverLocationId = $(this).data('driver-location');
        $.ajax({
            url: '/admin/driver/lastLocation/' + driverLocationId,
            type: 'post',
            success: function (response) {
                // KTApp.unprogress(btn);
                if (response.result) {
                    mapModal.modal('show');
                    mapModal.on('shown.bs.modal',function () {
                        if(map==null) {
                            initMap('kt_driver_location');
                        }
                        addPointOnMap(JSON.parse(response.payload));
                    });

                } else {
                    swal.fire({
                        "title": "عملیات ناموفق!",
                        "text": response.payload,
                        "type": "warning",
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

    });

    modal.on('click', '[data-driver-request]', function () {
        var request = $(this).data('driver-request');
        swal.fire({
            title: 'اختصاص ماموریت',
            text: "آیا از ادامه عملیات اطمینان دارید؟",
            type: 'warning',
            showCancelButton: true,
            cancelButtonText: 'انصراف',
            confirmButtonText: 'انجام شود'
        }).then(function (result) {
            if (result.value) {
                assignDriverFn(request);
            }
        });
    });
    var assignDriverFn = function (request) {
        $.ajax({
            url: '/admin/request/assignDriver/' + request ,
            type: 'post',
            success: function (response) {
                // KTApp.unprogress(btn);
                if (response.result) {
                    swal.fire({
                        "title": 'عملیات موفق',
                        "text": 'ماموریت تخصیص داده شد',
                        "type": 'success',
                        "confirmButtonClass": "btn btn-secondary",
                        "confirmButtonText": "تایید"
                    });
                    modal.modal('toggle');
                    list();
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
    modal.find('[date-request-id]').on('click', function () {
        swal.fire({
            title: 'انتقال درخواست به واحد نقلیه',
            text: "آیا از ارجاع درخواست اطمینان دارید؟",
            type: 'warning',
            showCancelButton: true,
            cancelButtonText: 'انصراف',
            confirmButtonText: 'انجام شود'
        }).then(function (result) {
            if (result.value) {
                $.ajax({
                    url: '/admin/request/referralRequest/' + modal.find('[date-request-id]').data('request-id'),
                    type: 'post',
                    success: function (response) {
                        // KTApp.unprogress(btn);
                        if (response.result) {
                            swal.fire({
                                "title": 'عملیات موفق!',
                                "text": 'درخواست با موفقیت ارجاع داده شد',
                                "type": 'success',
                                "confirmButtonClass": "btn btn-secondary",
                                "confirmButtonText": "تایید"
                            });
                            modal.modal('toggle');
                            list();
                        } else {
                            swal.fire({
                                "title": "عملیات ناموفق!",
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
                            "confirmButtonText": "باشه"
                        });
                    }
                });
            }

        });
    });


    return {
        // public functions
        init: function () {
            list();
            getSelectedTab();
        }
    };
}();

jQuery(document).ready(function () {
    KTDatatableRemoteAjaxDemo.init();
});