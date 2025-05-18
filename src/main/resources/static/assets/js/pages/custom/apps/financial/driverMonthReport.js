"use strict";
// Class definition

var KTDatatableRemoteAjaxDemo = function () {
    // Private functions

    var formEl;
    var validator;

    var selectedTabGrid = 1;
    var getSelectedTab = function () {
        $(document).on('click', '#tablist a', function () {
            selectedTabGrid = $(this).data('id');
            list();
        });
    };

    var reportGrid;

    // basic demo
    var list = function () {
        var modal = $('#kt_modal_remote');
        var acceptModal = $('#kt_modal_accept');
        if (reportGrid) {
            reportGrid.destroy();
        }
        reportGrid = $('.kt-datatable').KTDatatable({
            // datasource definition
            data: {
                type: 'remote',
                source: {
                    read: {
                        url: '/admin/financial/driverReport/' + selectedTabGrid,
                        // sample custom headers
                        headers: {'x-my-custokt-header': 'some value', 'x-test-header': 'the value'},
                        map: function (raw) {
                            // sample data mapping
                            console.log(raw);
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
                dir:'rtl',
                scroll: false,
                footer: false,
            },

            // column sorting
            sortable: true,

            pagination: true,

            search: {
                input: $('#generalSearch'),
                delay: 300
            },

            // columns definition
            columns: [
                {
                    field: 'id',
                    title: 'شناسه',
                    sortable: false,
                    autoHide: false,
                    textAlign: 'center',
                    width: 60

                },
                {
                    field: 'reportNumber',
                    title: 'شماره گزارش',
                    sortable: false,
                    autoHide: false,
                    textAlign: 'center',
                    width: 90

                },
                {
                    field: 'driverName',
                    title: 'راننده',
                    textAlign: 'center',
                    sortable: false,
                    width: 90

                },
                {
                    field: 'travelCount',
                    title: 'تعداد ماموریت',
                    sortable: false,
                    autoHide: false,
                    textAlign: 'center',
                    width: 70

                },
                {
                    field: 'extraWorkTimeSum',
                    title: 'مجموع اضافه کاری',
                    sortable: false,
                    textAlign: 'center',
                    template: function (row) {
                        return showMinAndHourReverse(row.extraWorkTimeSum)
                    }
                },
                {
                    field: 'navigationKmSum',
                    title: 'کیلومتراژ',
                    sortable: false,
                    textAlign: 'center',
                    width: 60,
                    template: function (row) {
                        return row.navigationKmSum.toFixed(0)
                    }
                },
                {
                    field: 'nightSleepSum',
                    title: 'شب خواب',
                    sortable: false,
                    textAlign: 'center',
                    width: 60
                },
                {
                    field: 'date',
                    title: 'تاریخ',
                    width: 100,
                    textAlign: 'center',
                    sortable: false,
                    template: function (row) {
                        return '<p class="kt-margin-b-5">آخرین عملکرد: ' + (row.reportDate != null ? '<span>' + timeStampToYearMonthDayHourLRT(row.reportDate) + '</span>' : 'ثبت نشده') + '</p>' +
                            '<p class="kt-margin-b-5">ثبت گزارش: ' + (row.createDate != null ? '<span>' + timeStampToYearMonthDayHourLRT(row.createDate) + '</span>' : 'ثبت نشده') + '</p>'
                    }
                },

                {
                    field: 'Actions',
                    title: 'عملیات',
                    sortable: false,
                    autoHide: false,
                    width:150,
                    template: function (row) {
                        return '<button data-travel-id="' + row.id + '" class="btn btn-sm btn-outline-brand  btn-elevate btn-icon kt-margin-5" title="دریافت فایل">' +
                            '<i class="la la-download"></i></button>' +
                            (selectedTabGrid == 1 ?
                                '<button data-valid-report-id="' + row.id + '" class="btn btn-sm btn-outline-success  btn-elevate btn-icon kt-margin-5" title="قطعی کردن"><i class="la la-check"></i></button>' : '') +
                            (selectedTabGrid == 1 ?
                                '<button data-del-report-id="' + row.id + '" class="btn btn-sm btn-outline-danger  btn-elevate btn-icon kt-margin-5" title="لغو"><i class="la la-close"></i></button>' : '');
                    },
                }],

        });

        reportGrid.on('click','[data-del-report-id]',function () {
            var reportId = $(this).data('del-report-id');
            swal.fire({
                title: 'حذف گزارش عملکرد راننده',
                text: "آیا از ادامه عملیات اطمینان دارید؟",
                type: 'warning',
                showCancelButton: true,
                cancelButtonText: 'انصراف',
                confirmButtonText: 'لغو شود'
            }).then(function (result) {
                if (result.value) {
                    $.ajax({
                        url: '/admin/financial/report/delete/' + reportId,
                        type: 'post',

                        success: function (response) {
                            if (response.result) {
                                swal.fire({
                                    "title": 'عملیات موفق',
                                    "text": 'گزارش عملکرد لغو شد',
                                    "type": 'success',
                                    "confirmButtonClass": "btn btn-secondary",
                                    "confirmButtonText": "تایید"
                                });
                                reportGrid.reload();
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

        reportGrid.on('click', '[data-valid-report-id]', function () {
                var reportId = $(this).data('valid-report-id');
                swal.fire({
                    title: 'قطعی کردن گزارش',
                    text: "بعد از قطعی شدن امکان حذف وجود ندارد آیا از ادامه عملیات اطمینان دارید؟",
                    type: 'success',
                    showCancelButton: true,
                    cancelButtonText: 'انصراف',
                    confirmButtonText: 'بلی'
                }).then(function (result) {
                    if (result.value) {
                        acceptModal.modal('show');
                    }
                });

                acceptModal.on('shown.bs.modal', function () {
                    acceptModal.on('click','.data-accept',function () {
                        $.ajax({
                            url: '/admin/financial/report/accept/' + reportId,
                            data:{
                                quality:  $('#report-quality').val()
                            },
                            type: 'post',
                            success: function (response) {
                                if (response.result) {
                                    swal.fire({
                                        "title": 'عملیات موفق',
                                        "text": 'گزارش با موفقیت قطعی شد',
                                        "type": 'success',
                                        "confirmButtonClass": "btn btn-secondary",
                                        "confirmButtonText": "تایید"
                                    });
                                    acceptModal.modal('toggle');
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

                    });

                }).on('hidden.bs.modal', function () {
                    $('#report-quality').val(0);
                    reportGrid.reload();
                });

            });

        reportGrid.on('click', '[data-travel-id]', function () {
            window.location =  '/admin/financial/driver/report/pdf/' + $(this).data('travel-id')
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
                                    reportGrid.reload();
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
        }
    };
}();

jQuery(document).ready(function () {
    KTDatatableRemoteAjaxDemo.init();
});