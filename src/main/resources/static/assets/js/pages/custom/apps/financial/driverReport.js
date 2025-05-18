"use strict";

// Class definition
var KTReport = function () {
    // Base elements

    var initReport = function () {

        $('#save-report').on('click',function () {
            saveReport();
        });

        $('[name=endDate],.selectUser').on('change',function () {
            $('#save-report').addClass('kt-hidden');

        });

        $('.show-report').on('click', function () {
            $('#save-report').addClass('kt-hidden');
            var driverId = $('.selectUser').val();
            var to = $('#endTimeStampDate').val();
            list(driverId,to);
        });
    };

    var driverGrid;
    var allData;
    var nowDate;
    var list = function (driverId,to) {
        if (driverGrid) {
            driverGrid.destroy();
        }
        if(driverId == null || driverId == 0 || to == null || to == ""){
            swal.fire({
                "title": "",
                "text": "راننده و تاریخ را انتخاب کنید!",
                "type": "error",
                "confirmButtonClass": "btn btn-warning",
                "confirmButtonText": "تایید"
            });
        }else {
            driverGrid = $('.kt-datatable').KTDatatable({
                // datasource definition
                data: {
                    type: 'remote',
                    source: {
                        read: {
                            url: '/admin/financial/driver/report/list/' + (driverId == null ? 0 : driverId) + '/' +
                            0 + '/' +
                            (to == null || to == "" ? 0 : new Date(to).getTime()),
                            // sample custom headers
                            headers: {'x-my-custokt-header': 'some value', 'x-test-header': 'the value'},
                            map: function (raw) {

                                // sample data mapping
                                allData = raw.all;
                                raw = raw.table;
                                var dataSet = raw;
                                if (typeof raw.data !== 'undefined') {
                                    dataSet = raw.data;
                                    nowDate = raw.nowDate;
                                    $('.total').text(raw.meta.total);
                                }
                                $('#save-report').removeClass('kt-hidden');
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
                        field: 'title',
                        title: 'عنوان ماموریت',
                        textAlign: 'center',
                    },
                    {
                        field: 'requester',
                        title: 'متقاضی',
                        textAlign: 'center',
                        template: function (row) {
                            return '<div >' +
                                '<p >' + row.requester + '</p>' +
                                '<span >' + row.requesterUnit.name + '</span>' +
                                '</div>';
                        }
                    },
                    {
                        field: 'origin',
                        title: 'آدرس',
                        textAlign: 'center',
                        template: function (row) {
                            return '<span>' + row.origin + ' - ' + row.destination + '</span>';
                        }
                    },
                    {
                        field: 'extraWork',
                        title: 'ساعت اضافه‌کار',
                        width: 60,
                        textAlign: 'center',
                        template: function (row) {
                            return showMinAndHourReverse(row.extraWork);
                        }
                    },
                    {
                        field: 'night',
                        title: 'شب خواب',
                        width: 60,
                        textAlign: 'center',
                    },
                    {
                        field: 'km',
                        title: 'کیلومتر',
                        width: 60,
                        textAlign: 'center'
                    },
                    {
                        field: 'date',
                        title: 'تاریخ',
                        template: function (row) {
                            return '<p class="kt-margin-b-5">تاریخ درخواست: ' + (row.requestDate != null ? '<span>' + timeStampToYearMonthDayHourLRT(row.requestDate) + '</span>' : 'ثبت نشده') + '</p>'
                                + '<p class="kt-margin-b-5">تاریخ شروع: ' + (row.fromDate != null ? '<span>' + timeStampToYearMonthDayHourLRT(row.fromDate) + '</span>' : 'ثبت نشده') + '</p>'
                                + '<p class="kt-margin-b-0">تاریخ پایان: ' + (row.toDate != null ? '<span>' + timeStampToYearMonthDayHourLRT(row.toDate) + '</span>' : 'ثبت نشده') + '</p>'
                        }
                    }
                ]

            });

            // $('#kt_form_status,#kt_form_type').selectpicker();
            driverGrid.on('kt-datatable--on-init', function () {
                $('.driver-count').html(allData.driverCount);
                $('.extra-time').html(showMinAndHourReverse(allData.extraHour));
                $('.kilometer').html(allData.kmOutSideCity);
                $('.night-sleep').html(allData.dayInPlaceCount);
                $('.reduce-pay').html(allData.kasrKar.toLocaleString());
                $('.sum-pay').html(allData.amount.toLocaleString());
            })


        }

    };

    var saveReport = function () {
        var driverId = $('.selectUser').val();
        var to = $('#endTimeStampDate').val();
        if(driverId == null || driverId == 0 || to == null || to == ""){
            swal.fire({
                "title": "",
                "text": "راننده و تاریخ را انتخاب کنید!",
                "type": "error",
                "confirmButtonClass": "btn btn-warning",
                "confirmButtonText": "تایید"
            });
        }else {
            swal.fire({
                title: 'ذخیره گزارش',
                text: "آیا از ادامه عملیات اطمینان دارید؟",
                type: 'warning',
                showCancelButton: true,
                cancelButtonText: 'انصراف',
                confirmButtonText: 'ثبت'
            }).then(function (result) {
                if (result.value) {
                    $.ajax({
                        url: '/admin/financial/driver/report/save',
                        data:{
                            driverId: driverId,
                            toDate: (to == null || to == "" ? 0 : new Date(to).getTime())
                        },
                        type: 'post',
                        success: function (response) {
                            if (response.result) {
                                showSaveFinalModal(JSON.parse(response.payload));
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
        }

    };

    var showSaveFinalModal= function (data) {
        var modal = $('#kt_modal_save');
        modal.find('.report-number').html(data.number);
        modal.find('.report-saveDate').html(timeStampToYearMonthDay(data.insertDate));
        modal.find('.file-download').attr("href", "/admin/financial/driver/report/pdf/"+data.id);
        modal.modal('show');


        modal.on('hidden.bs.modal',function () {
            window.location = '/admin/financial/driver/report';
        });
    };

    var initSelect2 = function () {
        $(".selectUser").select2({
            dir: "rtl",
            language: "fa",
            ajax: {
                url: "/admin/financial/driver",
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
                        results: JSON.parse(data.payload),
                    };
                },
                cache: true
            },
            placeholder: 'نام راننده را وارد کنید',
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
    };

    return {
        // public functions
        init: function () {
            initReport();
            initSelect2();
            initPersianDatePickerInit();
        }
    };
}();

jQuery(document).ready(function () {
    KTReport.init();
});