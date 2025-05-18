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
                        url: '/driver/vacation/list/' + selectedTabGrid,
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
                    field: 'VacationType',
                    title: 'نوع مرخصی',
                    sortable: false,
                    autoHide: false,
                    template: function (row) {
                        if (row.daily) {
                            return '<span class="kt-badge kt-badge--warning kt-badge--inline kt-badge--pill">روزانه</span>'
                        } else {
                            return '<span class="kt-badge kt-badge--success kt-badge--inline kt-badge--pill">ساعتی</span>'
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
                            return '<p class="kt-margin-b-5">تاریخ: ' + (row.fromDate != null ? '<span>' + timeStampToYearMonthDay(row.fromDate) + '</span>' : 'ثبت نشده') + '</p>' +
                                '<p class="kt-margin-b-5">شروع: ' + (row.fromDate != null ? '<span>' + timeStampToHourMinutesLRT(row.fromDate) + '</span>' : 'ثبت نشده') + '</p>' +
                                '<p class="kt-margin-b-0">پایان: ' + (row.toDate != null ? '<span>' + timeStampToHourMinutesLRT(row.toDate) + '</span>' : 'ثبت نشده') + '</p>'

                        } else {
                            return '<p class="kt-margin-b-5">شروع: ' + (row.fromDate != null ? '<span>' + timeStampToYearMonthDay(row.fromDate) + '</span>' : 'ثبت نشده') + '</p>' +
                                '<p class="kt-margin-b-5">پایان: ' + (row.toDate != null ? '<span>' + timeStampToYearMonthDay(row.toDate) + '</span>' : 'ثبت نشده') + '</p>'
                        }


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
                        url: '/driver/vacation/list/' + selectedTabGrid,
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
                    field: 'VacationType',
                    title: 'نوع مرخصی',
                    sortable: false,
                    autoHide: false,
                    template: function (row) {
                        if (row.daily) {
                            return '<span class="kt-badge kt-badge--warning kt-badge--inline kt-badge--pill">روزانه</span>'
                        } else {
                            return '<span class="kt-badge kt-badge--success kt-badge--inline kt-badge--pill">ساعتی</span>'
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
                            return '<p class="kt-margin-b-5">تاریخ: ' + (row.fromDate != null ? '<span>' + timeStampToYearMonthDay(row.fromDate) + '</span>' : 'ثبت نشده') + '</p>' +
                                '<p class="kt-margin-b-5">شروع: ' + (row.fromDate != null ? '<span>' + timeStampToHourMinutesLRT(row.fromDate) + '</span>' : 'ثبت نشده') + '</p>' +
                                '<p class="kt-margin-b-0">پایان: ' + (row.toDate != null ? '<span>' + timeStampToHourMinutesLRT(row.toDate) + '</span>' : 'ثبت نشده') + '</p>'

                        } else {
                            return '<p class="kt-margin-b-5">شروع: ' + (row.fromDate != null ? '<span>' + timeStampToYearMonthDay(row.fromDate) + '</span>' : 'ثبت نشده') + '</p>' +
                                '<p class="kt-margin-b-5">پایان: ' + (row.toDate != null ? '<span>' + timeStampToYearMonthDay(row.toDate) + '</span>' : 'ثبت نشده') + '</p>'
                        }


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