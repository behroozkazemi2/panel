"use strict";
// Class definition

let bannerListPage = function () {
    let datatable;
    let init = function () {
        if (datatable) {
            datatable.destroy();
        }
        // init the datatables. Learn more: https://keenthemes.com/metronic/?page=docs&section=datatable
        datatable = $('#ajax_data').KTDatatable({
            // datasource definition
            data: {
                type: 'remote',
                source: {
                    read: {
                        url: '/dashboard/banner/list',
                        headers: {'x-my-custokt-header': 'some value', 'x-test-header': 'the value'},
                        map: function(raw) {
                            // sample data mapping
                            let dataSet = raw;
                            if (typeof raw.data !== 'undefined') {
                                dataSet = raw.data;
                                $('.total').text(raw.count)
                            }
                            return dataSet;
                        },
                        error: function () {
                            swal.fire({
                                "title": "خطا در ارتباط با سرور",
                                "text": "خطا در برقراری ارتباط با سرور، لطفا مجدد تلاش نمایید.",
                                "type": "error",
                                "confirmButtonClass": "btn btn-warning",
                                "confirmButtonText": "باشه"
                            });
                        }
                    },

                },
                pageSize: 10, // display 20 records per page
                serverPaging: true,
                serverFiltering: true,
                serverSorting: true,
            },

            // layout definition
            layout: {
                scroll: false, // enable/disable datatable scroll both horizontal and vertical when needed.
                footer: false, // display/hide footer
            },

            // column sorting
            sortable: false,

            pagination: true,

            search: {
                input: $('#generalSearch'),
                delay: 400,
            },

            // columns definition
            columns: [
                {
                    field: 'name',
                    width: 400,
                    title: 'عنوان دسته',
                    autoHide: false,

                },
                {
                    field: 'Actions',
                    title: 'عملیات',
                    textAlign: 'center',
                    width: 200,
                    template: function (row) {
                        return '<div class="btn-group text-center">' +
                            '<a href="/admin/banner/add/' + row.id + '" target="_blank" class="btn btn-sm btn-outline-brand " data-edit-id="' + row.id + '">جزییات</a>' +
                            '</div>';
                    }

                }]

        });
    };

    // search

    // selection

    // selected records status update


    return {
        // public functions
        init: function () {
            init();
        },
    };
}();

// On document ready
KTUtil.ready(function () {
    bannerListPage.init();
});