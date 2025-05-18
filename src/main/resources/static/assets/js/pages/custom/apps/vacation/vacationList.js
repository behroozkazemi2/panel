"use strict";
// Class definition

var KTDatatableRemoteAjaxDemo = function () {
    // Private functions

    var selectedTabGrid = 1;



    var nowDate;
    var vacationGrid;

    var getSelectedTab = function () {
        $(document).on('click', '#tablist a', function () {
            selectedTabGrid = $(this).data('id');
            if(selectedTabGrid === 1){
                list();
            }
            else{
                statusList('#ajax_data_'+selectedTabGrid);
            }

        });
    };
    // basic demo
    var list = function () {
        var modal =$('#kt_modal_remote');
        if (vacationGrid) {
            vacationGrid.destroy();
        }
        vacationGrid = $('#ajax_data_1').KTDatatable({
            // datasource definition
            data: {
                type: 'remote',
                source: {
                    read: {
                        url: '/admin/vacation/list/' + selectedTabGrid,
                        // sample custom headers
                        headers: {'x-my-custokt-header': 'some value', 'x-test-header': 'the value'},
                        map: function (raw) {
                            // sample data mapping
                            console.log(raw);
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
                pageSize: 20,
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
            sortable: true,

            pagination: true,

            search: {
                input: $('#generalSearch'),
                delay: 300,
            },

            // columns definition
            columns: [
                {
                    field: 'User',
                    title: 'متقاضی',
                    sortable: false,
                    autoHide: false,
                    template: function (row) {
                        return row.avatarId != 0 ? '<div class="kt-user-card-v2">' +
                            '<div class="kt-user-card-v2__pic">' +
                            '<img src="/thumbnail/app/get/' + row.avatarId + '/200" class="m-img-rounded kt-marginless" alt="photo">' +
                            '</div>' +
                            '<div class="kt-user-card-v2__details">' +
                            '<span class="kt-user-card-v2__name">' + row.firstName + ' ' + row.lastName + '</span>' +
                            '<span class="kt-user-card-v2__name">' + row.username + '</span>' +
                            '<span class="kt-user-card-v2__desc">' + row.mobile + "</span>" +
                            "</div>" +
                            "</div>"
                            : '' +
                            '<div class="kt-user-card-v2">' +
                            '<div class="kt-user-card-v2__pic">' +
                            '<div class="kt-badge kt-badge--xl kt-badge--' + ["success", "brand", "danger", "success", "warning", "dark", "primary", "info"][KTUtil.getRandomInt(0, 7)] + '">' +
                            '<span>' + row.firstName.substring(0, 1) + '</div>' +
                            '</div>' +
                            '<div class="kt-user-card-v2__details">' +
                            '<span class="kt-user-card-v2__name">' + row.firstName + ' ' + row.lastName + '</span>' +
                            '<span class="kt-user-card-v2__name">' + row.username + '</span>' +
                            '<span class="kt-user-card-v2__desc">' + row.mobile + "</span>" +
                            "</div>" +
                            "</div>"
                    },
                },
                {
                    field: 'Vehicle',
                    title: 'مشخصات خودرو',
                    sortable: false,
                    textAlign: 'center',
                    autoHide: false,
                    template: function (row) {
                        return row.vehicle == null ? 'فاقد خودرو' :
                            ' ایران ' + row.vehicle.cityNumber + ' - ' + row.vehicle.second + ' ' + row.vehicle.character + ' ' + row.vehicle.first;
                    },
                },
                {
                    field: 'VacationType',
                    title: 'نوع مرخصی',
                    sortable: false,
                    autoHide: false,
                    template: function (row) {
                        if (row.daily) {
                            return '<span class="kt-badge kt-badge--warning kt-badge--inline kt-badge--pill">روزانه</span>' +
                                (row.conflictWithTravel ? '</br></br><span class="kt-badge kt-badge--danger kt-badge--dot"></span>&nbsp;<span class="kt-font-bold kt-font-danger">' + 'تداخل با ماموریت' + '</span> ' : '');
                        } else {
                            return '<span class="kt-badge kt-badge--success kt-badge--inline kt-badge--pill">ساعتی</span>' +
                                (row.conflictWithTravel ? '</br></br><span class="kt-badge kt-badge--danger kt-badge--dot"></span>&nbsp;<span class="kt-font-bold kt-font-danger">' + 'تداخل با ماموریت' + '</span> ' : '');
                        }
                    },
                },

                {
                    field: 'Date',
                    title: 'تاریخ و ساعت درخواست',
                    sortable: false,
                    autoHide: false,
                    template: function (row) {
                        if (!row.daily) {
                            return '<p class="kt-margin-b-5">تاریخ: ' + (row.startDate != null ? '<span>' + timeStampToYearMonthDay(row.startDate) + '</span>' : 'ثبت نشده') + '</p>' +
                                '<p class="kt-margin-b-5">شروع: ' + (row.endDate != null ? '<span>' + timeStampToHourMinutesLRT(row.startDate) + '</span>' : 'ثبت نشده') + '</p>' +
                                '<p class="kt-margin-b-0">پایان: ' + (row.endDate != null ? '<span>' + timeStampToHourMinutesLRT(row.endDate) + '</span>' : 'ثبت نشده') + '</p>'

                        } else {
                            return '<p class="kt-margin-b-5">شروع: ' + (row.startDate != null ? '<span>' + timeStampToYearMonthDay(row.startDate) + '</span>' : 'ثبت نشده') + '</p>' +
                                '<p class="kt-margin-b-5">پایان: ' + (row.endDate != null ? '<span>' + timeStampToYearMonthDay(row.endDate) + '</span>' : 'ثبت نشده') + '</p>'
                        }


                    },
                },

                {
                    field: 'Actions',
                    title: 'عملیات',
                    sortable: false,
                    autoHide: false,
                    textAlign: 'center',
                    template: function (row) {
                        return '<button data-vacation-id="' + row.id + '" class="btn btn-sm btn-outline-dark btn-font-sm" title="بررسی مرخصی">' +
                            '<i class="flaticon2-notepad"></i> بررسی مرخصی </button>';
                    },
                }],

        });

        $('#kt_form_status').on('change', function () {
            datatable.search($(this).val().toLowerCase(), 'Status');
        });

        $('#kt_form_type').on('change', function () {
            datatable.search($(this).val().toLowerCase(), 'Type');
        });

        $('#kt_form_status,#kt_form_type').selectpicker();

        vacationGrid.on('click','[data-vacation-id]',function () {
            $.ajax({
                url: '/admin/vacation/vacationDetail/' + $(this).data('vacation-id'),
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
                modal.find('[data-accept]').on('click',function () {
                    changeStatus($(this).data('accept'))
                });
                modal.find('[data-reject]').on('click',function () {
                    changeStatus($(this).data('reject'))
                });
            }).on('hidden.bs.modal', function () {
                modal.find('.modal-content').empty();
            });

        })

    };

    var statusList = function (div) {
        if (vacationGrid) {
            vacationGrid.destroy();
        }
        vacationGrid = $(div).KTDatatable({
            // datasource definition
            data: {
                type: 'remote',
                source: {
                    read: {
                        url: '/admin/vacation/list/' + selectedTabGrid,
                        // sample custom headers
                        headers: {'x-my-custokt-header': 'some value', 'x-test-header': 'the value'},
                        map: function (raw) {
                            // sample data mapping
                            console.log(raw);
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
                pageSize: 20,
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
            sortable: true,

            pagination: true,

            search: {
                input: $('#generalSearch'),
                delay: 300,
            },

            // columns definition
            columns: [
                {
                    field: 'User',
                    title: 'متقاضی',
                    sortable: false,
                    autoHide: false,
                    template: function (row) {
                        return row.avatarId != 0 ? '<div class="kt-user-card-v2">' +
                            '<div class="kt-user-card-v2__pic">' +
                            '<img src="/thumbnail/app/get/' + row.avatarId + '/200" class="m-img-rounded kt-marginless" alt="photo">' +
                            '</div>' +
                            '<div class="kt-user-card-v2__details">' +
                            '<span class="kt-user-card-v2__name">' + row.firstName + ' ' + row.lastName + '</span>' +
                            '<span class="kt-user-card-v2__name">' + row.username + '</span>' +
                            '<a href="#" class="kt-user-card-v2__email kt-link">' + row.mobile + "</a>" +
                            "</div>" +
                            "</div>"
                            : '' +
                            '<div class="kt-user-card-v2">' +
                            '<div class="kt-user-card-v2__pic">' +
                            '<div class="kt-badge kt-badge--xl kt-badge--' + ["success", "brand", "danger", "success", "warning", "dark", "primary", "info"][KTUtil.getRandomInt(0, 7)] + '">' +
                            '<span>' + row.firstName.substring(0, 1) + '</div>' +
                            '</div>' +
                            '<div class="kt-user-card-v2__details">' +
                            '<span class="kt-user-card-v2__name">' + row.firstName + ' ' + row.lastName + '</span>' +
                            '<span class="kt-user-card-v2__name">' + row.username + '</span>' +
                            '<a href="#" class="kt-user-card-v2__email kt-link">' + row.mobile + "</a>" +
                            "</div>" +
                            "</div>"
                    },
                },
                {
                    field: 'Vehicle',
                    title: 'مشخصات خودرو',
                    sortable: false,
                    textAlign: 'center',
                    autoHide: false,
                    template: function (row) {
                        return row.vehicle == null ? 'فاقد خودرو' :
                            ' ایران ' + row.vehicle.cityNumber + ' - ' + row.vehicle.second + ' ' + row.vehicle.character + ' ' + row.vehicle.first;
                    },
                },
                {
                    field: 'VacationType',
                    title: 'نوع مرخصی',
                    sortable: false,
                    autoHide: false,
                    template: function (row) {
                        if (row.daily) {
                            return '<span class="kt-badge kt-badge--warning kt-badge--inline kt-badge--pill">روزانه</span>' +
                                (row.conflictWithTravel ? '</br></br><span class="kt-badge kt-badge--danger kt-badge--dot"></span>&nbsp;<span class="kt-font-bold kt-font-danger">' + 'تداخل با ماموریت' + '</span> ' : '');
                        } else {
                            return '<span class="kt-badge kt-badge--success kt-badge--inline kt-badge--pill">ساعتی</span>' +
                                (row.conflictWithTravel ? '</br></br><span class="kt-badge kt-badge--danger kt-badge--dot"></span>&nbsp;<span class="kt-font-bold kt-font-danger">' + 'تداخل با ماموریت' + '</span> ' : '');
                        }
                    },
                },

                {
                    field: 'Date',
                    title: 'تاریخ و ساعت درخواست',
                    sortable: false,
                    autoHide: false,
                    template: function (row) {
                        if (!row.daily) {
                            return '<p class="kt-margin-b-5">تاریخ: ' + (row.startDate != null ? '<span>' + timeStampToYearMonthDay(row.startDate) + '</span>' : 'ثبت نشده') + '</p>' +
                                '<p class="kt-margin-b-5">شروع: ' + (row.endDate != null ? '<span>' + timeStampToHourMinutesLRT(row.startDate) + '</span>' : 'ثبت نشده') + '</p>' +
                                '<p class="kt-margin-b-0">پایان: ' + (row.endDate != null ? '<span>' + timeStampToHourMinutesLRT(row.endDate) + '</span>' : 'ثبت نشده') + '</p>'

                        } else {
                            return '<p class="kt-margin-b-5">شروع: ' + (row.startDate != null ? '<span>' + timeStampToYearMonthDay(row.startDate) + '</span>' : 'ثبت نشده') + '</p>' +
                                '<p class="kt-margin-b-5">پایان: ' + (row.endDate != null ? '<span>' + timeStampToYearMonthDay(row.endDate) + '</span>' : 'ثبت نشده') + '</p>'
                        }


                    },
                },

                {
                    field: 'Acceptor',
                    title: 'بررسی کننده',
                    sortable: false,
                    autoHide: false,
                    textAlign: 'center',
                    template: function (row) {
                        return row.acceptorName;
                    },
                }],

        });

        $('#kt_form_status').on('change', function () {
            datatable.search($(this).val().toLowerCase(), 'Status');
        });

        $('#kt_form_type').on('change', function () {
            datatable.search($(this).val().toLowerCase(), 'Type');
        });

        $('#kt_form_status,#kt_form_type').selectpicker();


    };



    var changeStatus = function (data) {
        $.ajax({
            url: '/admin/vacation/changeStatus/'+ data,
            type: 'post',
            success: function (response) {
                // KTApp.unprogress(btn);
                if (response.result) {
                    swal.fire({
                        "title": "عملیات موفق!",
                        "text": "",
                        "type": "success",
                        "confirmButtonClass": "btn btn-warning",
                        "confirmButtonText": "تایید"
                    });
                    $('#kt_modal_remote').modal('toggle');
                    vacationGrid.reload();
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

    };

    var getExpireDateTextColor= function(expireDate) {

        if (expireDate > nowDate && expireDate < ( nowDate + (1000 * 60 * 60 * 24 * 5) )) {
            return 'kt-font-warning';
        }
        if (expireDate < nowDate) {
            return 'kt-font-danger';
        }
        return '';
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