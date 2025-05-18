"use strict";
// Class definition

var KTDatatableRemoteAjaxDemo = function () {
    // Private functions

    var formEl;
    var validator;



    var selectedTabGrid = 2;
    var getSelectedTab = function () {
        $(document).on('click', '#tablist a', function () {
            selectedTabGrid = $(this).data('id');
            list();
        });
    };

    var nowDate;
    var travelGrid;

    // basic demo
    var list = function () {
        var modal = $('#kt_modal_remote');
        var acceptModal = $('#kt_modal_accept');
        if (travelGrid) {
            travelGrid.destroy();
        }
        travelGrid = $('.kt-datatable').KTDatatable({
            // datasource definition
            data: {
                type: 'remote',
                source: {
                    read: {
                        url: '/admin/travel/list/' + selectedTabGrid,
                        // sample custom headers
                        headers: {'x-my-custokt-header': 'some value', 'x-test-header': 'the value'},
                        map: function (raw) {
                            // sample data mapping
                            var dataSet = raw;
                            if (typeof raw.data !== 'undefined') {
                                dataSet = raw.data;
                                nowDate = raw.nowDate;
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
                dir:'rtl',
                scroll: false,
                footer: false,
            },

            // column sorting
            sortable: true,

            pagination: true,

            search: {
                input: $('#generalSearch'),
                delay: 300,
            },

            // columns definition
            columns: [
                {
                    field: 'RecordID',
                    title: 'متقاضی',
                    sortable: false,
                    autoHide: false,
                    width: 100,
                    template: function (row) {
                        return '<span>' + row.requesterFirstName + ' ' + row.requesterLastName + '</span>' +
                            '<p>' + row.requesterMobile + "</p>"

                    },
                },
                {
                    field: 'title',
                    title: 'عنوان ماموریت',
                    sortable: false,
                    autoHide: false,
                    textAlign: 'center',

                },
                {
                    field: 'origin-destination',
                    title: 'مبدا / مقصد',
                    sortable: false,
                    template: function (row) {
                        return '<p class="kt-margin-b-5">مبدا: ' + (row.origin != null ? row.origin : 'ثبت نشده') + '</p>' +
                            '<p class="kt-margin-b-5">مقصد: ' + (row.destination != null ? row.destination : 'ثبت نشده') + '</p>'+
                            (selectedTabGrid == 4  ?
                                '<p class="kt-margin-b-5">کیلومتر پیمایش شده: ' + (row.km != null ? '<span>' + row.km + '</span>' : 'ثبت نشده') + '</p>':'');
                    }
                },
                {
                    field: 'date',
                    title: 'تاریخ و ساعت',
                    sortable: false,
                    template: function (row) {

                        if (selectedTabGrid == 2) {
                            return '<p class="kt-margin-b-5">شروع: ' + (row.requesterStart != null ? '<span>' + timeStampToYearMonthDayHourLRT(row.requesterStart) + '</span>' : 'ثبت نشده') + '</p>' +
                                '<p class="kt-margin-b-5">پایان: ' + (row.requesterEnd != null ? '<span>' + timeStampToYearMonthDayHourLRT(row.requesterEnd) + '</span>' : 'ثبت نشده') + '</p>' +
                                (selectedTabGrid == 4 ?
                                    '<p class="kt-margin-b-5">اضافه‌کار: ' + (row.extraHour != null ? '<span>' + showMinAndHourReverse(row.extraHour) + '</span>' : 'ثبت نشده') + '</p>' : '')
                        } else {
                            return '<p class="kt-margin-b-5">شروع: ' + (row.startDate != null ? '<span>' + timeStampToYearMonthDayHourLRT(row.startDate) + '</span>' : 'ثبت نشده') + '</p>' +
                                '<p class="kt-margin-b-5">پایان: ' + (row.endDate != null ? '<span>' + timeStampToYearMonthDayHourLRT(row.endDate) + '</span>' : 'ثبت نشده') + '</p>' +
                                (selectedTabGrid == 4 ?
                                    '<p class="kt-margin-b-5">اضافه‌کار: ' + (row.extraHour != null ? '<span>' + showMinAndHourReverse(row.extraHour) + '</span>' : 'ثبت نشده') + '</p>' : '')
                        }
                    }
                },
                {
                    field: 'driver',
                    title: 'راننده/خودرو',
                    sortable: false,
                    template: function (row) {
                        return '<p class="kt-margin-b-5">' + ((row.driverName != null && row.driverName != "") ? row.driverName : 'در انتظار' ) + '</p>' +
                            '<p class="kt-margin-b-5">' + ((row.driverMobile != null && row.driverMobile != "") ? row.driverMobile : '' ) + '</p>' +
                            '<p class="kt-margin-b-5">' +
                            (row.vehiclePlate == null ? '' :
                                row.vehiclePlate.first + ' ' + row.vehiclePlate.character + ' ' + row.vehiclePlate.second + ' - ' + row.vehiclePlate.cityNumber) +
                            '</p>' +
                            '<p class="kt-margin-b-5">' + (( row.vehicleName != null && row.vehicleName != "" ) ? row.vehicleName : '' ) + '</p>'+
                            (selectedTabGrid == 4  ?
                                '<p class="kt-margin-b-5">شب‌خواب: ' + (row.night != null ? '<span>' + row.night + '</span>' : 'ثبت نشده') + '</p>':'');

                    },
                },
                {
                    field: 'Actions',
                    title: 'عملیات',
                    sortable: false,
                    autoHide: false,
                    width:180,
                    template: function (row) {
                        return '<button data-travel-id="' + row.id + '" class="btn btn-sm btn-outline-brand  btn-elevate btn-icon kt-margin-5" title="جزئیات ماموریت">' +
                            '<i class="la la-newspaper-o"></i></button>' +
                            (selectedTabGrid == 4 && !row.requesterVerify ?
                                '<button data-valid-travel-id="' + row.id + '" class="btn btn-sm btn-outline-success  btn-elevate btn-icon kt-margin-5" title="تایید ماموریت"><i class="la la-check-circle"></i></button>' : '') +
                            // (selectedTabGrid == 3 || selectedTabGrid == 2 ?
                            //     '<button data-finish-travel-id="' + row.id + '" class="btn btn-sm btn-outline-success  btn-elevate btn-icon kt-margin-5" title="اتمام ماموریت"><i class="la la-flag"></i></button>' : '') +
                            (selectedTabGrid == 2 || selectedTabGrid == 1 ?
                                '<button data-del-travel-id="' + row.id + '" class="btn btn-sm btn-outline-danger  btn-elevate btn-icon kt-margin-5" title="لغو"><i class="la la-close"></i></button>' : '');
                    },
                }],

        });


        travelGrid.on('click','[data-del-travel-id]',function () {
            var travelId = $(this).data('del-travel-id');
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
                                travelGrid.reload();
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
        travelGrid.on('click','[data-finish-travel-id]',function () {
            $.ajax({
                url: '/admin/travel/endTravel/' + $(this).data('finish-travel-id'),
                type: 'post',
                dataType: "html",
                success: function (response) {
                    // KTApp.unprogress(btn);
                    if (response) {
                        modal.find('.modal-content').empty();
                        modal.find('.modal-content').append(response);
                        modal.modal('show');
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

            modal.on('shown.bs.modal', function () {
                $("#kt_gmap_8").empty();
                initMap('kt_gmap_8');
                $.ajax({
                    url: '/admin/travel/travelPoint/' + modal.find('[data-travel-id]').data('travel-id'),
                    type: 'post',
                    success: function (response) {
                        // KTApp.unprogress(btn);
                        if (response.payload !=null && !$.isEmptyObject(JSON.parse(response.payload)[0])) {
                            drawTravelLine(JSON.parse(response.payload));
                        } else {
                            modal.find('#point-alert').show();
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


            }).on('hidden.bs.modal', function () {
                modal.find('#point-alert').hide();
                modal.find('#marker-alert').hide();
                modal.find('.modal-content').empty();
                vectorSource.clear();
            });

        });


        travelGrid.on('click', '[data-valid-travel-id]', function () {
            $.ajax({
                url: '/admin/travel/acceptDetail/' + $(this).data('valid-travel-id'),
                type: 'post',
                dataType: "html",
                success: function (response) {
                    // KTApp.unprogress(btn);
                    if (response) {
                        acceptModal.find('.modal-content').empty();
                        acceptModal.find('.modal-content').append(response);
                        acceptModal.modal('show');
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

            acceptModal.on('shown.bs.modal', function () {
                formEl = $('#kt_form');
                initSelect2();
                initPersianDatePickerInit();
                initValidation();
                initSubmit();
                acceptModal.on('click','[data-accept-travel]',function () {
                    var travelId = $(this).data('accept-travel');
                    swal.fire({
                        title: 'تایید ماموریت',
                        text: "آیا از ادامه عملیات اطمینان دارید؟",
                        type: 'warning',
                        showCancelButton: true,
                        cancelButtonText: 'انصراف',
                        confirmButtonText: 'انجام شود'
                    }).then(function (result) {
                        if (result.value) {
                            $.ajax({
                                url: '/admin/travel/accept/' + travelId,
                                type: 'post',
                                success: function (response) {
                                    if (response.result) {
                                        swal.fire({
                                            "title": 'عملیات موفق',
                                            "text": 'ماموریت تایید شد',
                                            "type": 'success',
                                            "confirmButtonClass": "btn btn-secondary",
                                            "confirmButtonText": "تایید"
                                        });
                                        acceptModal.modal('toggle');
                                        travelGrid.reload();
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

            }).on('hidden.bs.modal', function () {
                acceptModal.find('.modal-content').empty();
            });

        });

        var drawTravelLine = function(data) {
            var styles = {
                'end': new  ol.style.Style({
                    image: new ol.style.Circle({
                        fill: new ol.style.Fill({color: 'red'}),
                        stroke: new ol.style.Stroke({color: 'black', width: 1}),
                        points: 2,
                        radius: 7,
                    })
                }),
                'start': new ol.style.Style({
                    image: new ol.style.Circle({
                        fill: new ol.style.Fill({color: 'blue'}),
                        stroke: new ol.style.Stroke({color: 'red', width: 1}),
                        points: 2,
                        radius: 6,
                    })
                })
            };
            $.each(data, function( index, value ) {
                var coordinates = [];
                $.each(value,function (i,val) {
                    coordinates.push(ol.proj.transform([val.lng, val.lat], 'EPSG:4326', 'EPSG:3857'));
                    var feature = new ol.Feature();
                    var geometry = new ol.geom.Point(ol.proj.transform([val.lng, val.lat], 'EPSG:4326', 'EPSG:3857'));
                    feature.setGeometry(geometry);
                    if (i === 0) {
                        feature.setStyle(styles['start']);
                    }
                    if(i === value.length-1){
                        feature.setStyle(styles['end']);
                    }
                    vectorSource.addFeature(feature);

                });
                var layerLines = new ol.layer.Vector({
                    source: new ol.source.Vector({
                        features: [new ol.Feature({
                            geometry: new ol.geom.LineString(coordinates),
                            name: 'Line'
                        })]
                    }),
                    style : new ol.style.Style({
                        stroke : new ol.style.Stroke({
                            color : 'red',
                            width: 4
                        })
                    })
                });

                map.addLayer(layerLines)
                map.getView().fit( layerLines.getSource().getExtent(), map.getSize() );
                map.getView().setZoom(15);

            });
        };

        travelGrid.on('click', '[data-travel-id]', function () {
            $.ajax({
                url: '/admin/travel/travelDetail/' + $(this).data('travel-id'),
                type: 'post',
                dataType: "html",
                success: function (response) {
                    // KTApp.unprogress(btn);
                    if (response) {
                        modal.find('.modal-content').empty();
                        modal.find('.modal-content').append(response);
                        modal.modal('show');
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

            modal.on('shown.bs.modal', function () {
                $("#kt_gmap_8").empty();
                initMap('kt_gmap_8');
                $.ajax({
                    url: '/admin/travel/travelPoint/' + modal.find('[data-travel-id]').data('travel-id'),
                    type: 'post',
                    success: function (response) {
                        // KTApp.unprogress(btn);
                        if (response.payload !=null && !$.isEmptyObject(JSON.parse(response.payload)[0])) {
                            drawTravelLine(JSON.parse(response.payload));
                        } else {
                            modal.find('#point-alert').show();
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


            }).on('hidden.bs.modal', function () {
                modal.find('#point-alert').hide();
                modal.find('#marker-alert').hide();
                modal.find('.modal-content').empty();
                vectorSource.clear();
            });

        });
    };

    var initSelect2 = function () {
        $("#selectUser").select2({
            dir: "rtl",
            language: "fa",
            ajax: {
                url: "/admin/request/users",
                dataType: 'json',
                // delay: 250,
                data: function (params) {
                    return {
                        search: params.term,
                        type: 'public'
                    }
                },
                processResults: function (data, params) {
                    // parse the results into the format expected by Select2
                    // alter the remote JSON data, except to indicate that infinite
                    return {
                        params: params,
                        results: JSON.parse(data.payload),
                    };
                },
                cache: true
            },
            placeholder: 'نام متقاضی را وارد کنید',
            templateResult: formatRepo,
            templateSelection: formatRepoSelection
        });

        function formatRepo(repo) {
            if (repo.loading) {
                return repo.text;
            }

            var $container;
            if(repo.avatarId != null && repo.avatarId != 0 ){

                $container =  $('<div class="kt-user-card-v2 select2-result-repository ">' +
                    '<div class="kt-user-card-v2__pic select2-result-repository__avatar">' +
                    '<img src="/thumbnail/app/get/' + repo.avatarId + '/200" class="m-img-rounded kt-marginless" alt="photo">' +
                    '</div>' +
                    '<div class="kt-user-card-v2__details select2-result-repository__meta">' +
                    '<span class="kt-user-card-v2__name select2-result-repository__title">' + repo.name + '</span>' +
                    '<span class="kt-user-card-v2__email">' + repo.mobile + "</span>" +
                    '</div>' +
                    '</div>')

            }else {

                $container =
                    $('<div class="kt-user-card-v2  select2-result-repository ">' +
                        '<div class="kt-user-card-v2__pic select2-result-repository__avatar">' +
                        '<div class="kt-badge kt-badge--xl kt-badge--success">' +
                        '<span>' + repo.name.substring(0, 1) + '</span></div>' +
                        '</div>' +
                        '<div class="kt-user-card-v2__details select2-result-repository__meta">' +
                        '<span class="kt-user-card-v2__name select2-result-repository__title">' + repo.name + '</span>' +
                        '<span  class="kt-user-card-v2__email ">' + repo.mobile + "</span>" +
                        '</div>' +
                        '</div>');
            }
            return $container;

        }

        function formatRepoSelection(repo) {
            return repo.name || repo.text;
        }

    };
    var initPersianDatePickerInit = function () {
        $('#startDate').MdPersianDateTimePicker({
            targetTextSelector: '#startTimeStamp',
            targetDateSelector: '#startTimeStampDate',
            enableTimePicker: false
        });
        $('#endDate').MdPersianDateTimePicker({
            targetTextSelector: '#endTimeStamp',
            targetDateSelector: '#endTimeStampDate',
            enableTimePicker: false

        });
        $('#startTime').timepicker({
            minuteStep: 5,
            defaultTime: 'value',
            showSeconds: false,
            showMeridian: false,
        });
        $('#endTime').timepicker({
            minuteStep: 5,
            defaultTime: 'value',
            showSeconds: false,
            showMeridian: false,
        });
        $('#extraTimeShow').timepicker({
            minuteStep: 1,
            showSeconds: false,
            showMeridian: false,
            maxHours: 500,
            useCurrent: false,
            defaultTime: 'value'
        });

        $('#extraTimeShow').on('change',function () {
            $('[name=extraTime]').val(convertToToMinutes($(this).val()));
        });

        let convertToToMinutes = function(val){
            let res = val.split(':');
            return parseInt(res[0])*60 + parseInt(res[1]);
        };

        $('[name=startDate], [name=endDate]').on('change',function () {
            if($('[name=startDate]').val()&&$('[name=endDate]').val()){
                var days = Math.round((new Date($('[name=endDate]').val())-new Date($('[name=startDate]').val()))/(1000*60*60*24));
                if(days<0){
                    swal.fire({
                        "title": "خطا در ورود اطلاعات",
                        "text": "تاریخ پایان نمی تواند قبل از تاریخ شروع باشد.",
                        "type": "error",
                        "confirmButtonClass": "btn btn-warning",
                        "confirmButtonText": "تایید"
                    });
                    $('[name=nightSleep]').val(0);
                }else {
                    $('[name=nightSleep]').val(days);
                }
            }
        });
    };
    var initValidation = function () {
        validator = formEl.validate({
            // Validate only visible fields
            ignore: ":hidden",

            // Validation rules
            rules: {
                // Step 1
                title: {
                    required: true
                },
                origin: {
                    required: true
                },
                userId: {
                    required: true
                },
                destination: {
                    required: true
                },
                startTimeStamp: {
                    required: true
                },
                endTimeStamp: {
                    required: true
                }
            },

            messages: {
                // Step 1
                title: {
                    required: "موضوع را وارد نمایید."
                },
                origin: {
                    required: "مبدا را وارد نمایید."
                },
                userId: {
                    required: "اظلاعات متقاضی را وارد نمایید."
                },
                destination: {
                    required: "مقصد را وارد نمایید."
                },
                startTimeStamp: {
                    required: "تاریخ شروع را وارد نمایید."
                },
                endTimeStamp: {
                    required: "تاریخ پایان را وارد نمایید."
                }

            },

            // Display error
            invalidHandler: function (event, validator) {
                KTUtil.scrollTop();
            },

            // Submit valid form
            submitHandler: function (form) {
            }
        });
    };

    var initSubmit = function () {
        var btn = $('.action-submit');

        btn.on('click', function (e) {
            e.preventDefault();

            if (validator.form()) {
                KTApp.progress(btn);
                formEl.ajaxSubmit({
                    url: '/admin/travel/saveAndAccept',
                    type: 'post',
                    success: function (response) {
                        KTApp.unprogress(btn);
                        //KTApp.unblock(formEl);

                        if (response.result) {

                            swal.fire({
                                "title": "",
                                "text": "ثبت با موفقیت انجام شد.",
                                "type": "success",
                                "confirmButtonClass": "btn btn-secondary",
                                "confirmButtonText": "تایید"
                            }).then(function (result) {
                                if (result.value) {
                                    $('#kt_modal_accept').modal('toggle');
                                    travelGrid.reload();
                                }});

                        } else {

                            swal.fire({
                                "title": "",
                                "text": response.payload,
                                "type": "error",
                                "confirmButtonClass": "btn btn-warning",
                                "confirmButtonText": "تایید"
                            });

                        }
                    },
                    error: function () {
                        KTApp.unprogress(btn);
                        swal.fire({
                            "title": "",
                            "text": "خطا در برقراری ارتباط با سرور، لطفا مجدد تلاش نمایید.",
                            "type": "error",
                            "confirmButtonClass": "btn btn-warning",
                            "confirmButtonText": "تایید"
                        });
                    }
                });
            }
        });
    };

    return {
        // public functions
        init: function () {
            list();
            getSelectedTab();
        },
    };
}();

jQuery(document).ready(function () {
    KTDatatableRemoteAjaxDemo.init();
});