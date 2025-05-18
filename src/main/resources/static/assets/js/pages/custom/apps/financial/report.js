"use strict";

// Class definition
var KTReport = function () {
    // Base elements

    var initReport = function () {
        $('.show-report').on('click', function () {
            var from = $('#startTimeStampDate').val();
            var to = $('#endTimeStampDate').val();
            list(from,to);
        })

        $('.get-excel').on('click', function () {
            var from = $('#startTimeStampDate').val();
            var to = $('#endTimeStampDate').val();

            window.location = '/admin/financial/excel/' + (from == null || from=='' ? 0 : new Date(from).getTime()) + '/' + (to == null || to=='' ? 0 :  new Date(to).getTime())

        })

    };
    var driverGrid;
    var allData;

    var list = function (from,to) {
        var modal = $('#kt_modal_remote');
        if (driverGrid) {
            driverGrid.destroy();
        }

        driverGrid = $('.kt-datatable').KTDatatable({
            // datasource definition
            data: {

                type: 'remote',
                source: {
                    read: {
                        url: '/admin/financial/report/' +
                            (from == null || from=='' ? 0 : new Date(from).getTime()) + '/' +
                            (to == null || to=='' ? 0 :  new Date(to).getTime()) ,
                        // sample custom headers
                        headers: {'x-my-custokt-header': 'some value', 'x-test-header': 'the value'},
                        map: function (raw) {
                            // sample data mapping
                            allData = raw.all;
                            raw = raw.table;
                            var dataSet = raw;
                            if (typeof raw.data !== 'undefined') {
                                dataSet = raw.data;
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
                scroll: false,
                footer: false,
            },

            // column sorting
            sortable: false,

            pagination: true,

            search: {
                input: $('#generalSearch'),
                delay: 300,
            },

            // columns definition
            columns: [
                {
                    field: 'driverName',
                    title: 'راننده',
                    autoHide: false,
                    width: 150,
                    textAlign: 'center',
                },
                {
                    field: 'travelCount',
                    title: 'تعداد ماموریت',
                    textAlign: 'center',
                },
                {
                    field: 'extraHour',
                    title: 'ساعت اضافه‌کار',
                    textAlign: 'center',
                    template: function (row) {
                        return showMinAndHourReverse(row.extraHour);
                    }
                },
                {
                    field: 'dayInPlaceCount',
                    title: 'شب خواب',
                    textAlign: 'center',
                },
                {
                    field: 'kmOutSideCity',
                    title: 'کیلومتر پیموده شده',
                    textAlign: 'center'
                },
                {
                    field: 'quality',
                    title: 'کیفیت',
                    textAlign: 'center',
                    template : function (row) {
                        return row.kasrKar.toLocaleString()
                    }
                },
                // {
                //     field: 'amount',
                //     title: 'جمع کل',
                //     textAlign: 'center',
                //     autoHide: false,
                //     template : function (row) {
                //         return row.amount.toLocaleString()
                //     }
                // }
                ]

        });


        $('#kt_form_status,#kt_form_type').selectpicker();

        driverGrid.on('kt-datatable--on-init',function () {

            $('.driver-count').html(allData.driverCount);
            $('.extra-time').html(showMinAndHourReverse(allData.extraHour));
            $('.kilometer').html(allData.kmOutSideCity);
            $('.night-sleep').html(allData.dayInPlaceCount);
            $('.reduce-pay').html(allData.kasrKar.toLocaleString());
            $('.vacation-day').html(allData.amount.toFixed(0));
            }),

        driverGrid.on('click', '[data-travel-id]', function () {
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

            });

            modal.on('hidden.bs.modal', function () {
            });

        });
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
            initPersianDatePickerInit();
        }
    };
}();

jQuery(document).ready(function () {
    KTReport.init();
});