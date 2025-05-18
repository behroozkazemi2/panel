"use strict";
// Class definition

let productPage = function () {
    // let iables
    let datatable;

    let succesText = '';
    let actionText = '';
    let nowDate;
    let modal = $('#kt_modal_remote');
    // init
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
                        url: '/dashboard/promoteProduct/list',
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
                    title: 'عنوان رویداد',
                    autoHide: false,

                },
                {
                    field: 'startDate',
                    title: 'تاریخ شروع  ',
                    textAlign: 'center',
                    width:200,
                    template: function (row) {
                        let sDate = new Date(row.startDateTimeStamp);
                        return  sDate.getMinutes() + " : " + sDate.getHours() + " - " + new Date(sDate).toLocaleDateString('fa-IR');
                    }
                },
                {
                    field: 'endDate',
                    title: ' تاریخ پایان ',
                    textAlign: 'center',
                    autoHide: false,
                    width:200,
                    template: function (row) {
                        let eDate = new Date(row.endDateTimeStamp);
                        return eDate.getMinutes() + " : " + eDate.getHours() + " - " + new Date(eDate).toLocaleDateString('fa-IR');
                    }
                },

                {
                    field: 'Actions',
                    title: 'عملیات',
                    textAlign: 'center',
                    width: 200,
                    template: function (row) {
                        return '<div class="btn-group text-center">' +
                            '<a href="/admin/promoteProduct/edit/' + row.id + '" target="_blank" class="btn btn-sm btn-outline-brand " data-edit-id="' + row.id + '">ویرایش</a>' +
                            '<button class="btn btn-sm btn-outline-danger " data-delete-id="' + row.id + '">حذف</button>' +
                            '</div>';
                    }

                }]

        });
        datatable.on('click', '[data-delete-id]', function () {
            let deleteId = $(this).data('delete-id');
            actionText = 'آیا نسبت به حذف محصول اطمینان دارید؟';
            succesText = 'محصول با موفقیت حذف شد ';
            swal.fire({
                text: actionText,
                type: 'question',
                showCancelButton: true,
                confirmButtonText: 'بله',
                cancelButtonText: 'خیر',
                // reverseButtons: true
            }).then(function (result) {
                if (result.value) {
                    $.ajax({
                        'url': '/admin/promoteProduct/delete'+'/'+deleteId,
                        'method': 'get',
                        beforeSend: function () {

                        },
                        complete: function () {
                            datatable.reload();
                        },
                        success: function (res) {
                            if (res.result) {
                                swal.fire({
                                    "title": "",
                                    "text": succesText,
                                    "type": "success",
                                    "confirmButtonClass": "btn btn-secondary"
                                }).then(function (result) {
                                    if (result.value) {
                                        datatable.reload();
                                    }
                                });
                            }else {
                                swal.fire({
                                    "title": "خطا",
                                    "text": res.data,
                                    "type": "error",
                                    "confirmButtonClass": "btn btn-danger"
                                })
                            }
                        },
                        error:function (res) {
                            swal.fire({
                                "title": "خطا",
                                "text": res.data,
                                "type": "error",
                                "confirmButtonClass": "btn btn-danger"
                            })
                        }

                    });

                } else if (result.dismiss === 'cancel') {
                }
            });
        });
        datatable.on('click', '[data-exist-id]', function () {
            let existId = $(this).data('exist-id');
            let existtext = $(this).data('exist-bool');
            actionText = (existtext ? ' آیا نسبت به ناموجود کردن محصول اطمینان دارید؟' : ' آیا نسبت به موجود کردن محصول اطمینان داریذ؟');
            succesText = (existtext ? 'محصول ناموجود شد' : 'محصول موجود شد');
            swal.fire({
                text: actionText,
                type: 'question',
                showCancelButton: true,
                confirmButtonText: 'بله',
                cancelButtonText: 'خیر',
                // reverseButtons: true
            }).then(function (result) {
                if (result.value) {
                    $.ajax({
                        'url': '/admin/productProvider/exist/' + existId + '/' + (existtext ? 'false' : 'true'),
                        'method': 'get',
                        'beforeSend': function () {

                        },
                        'complete': function () {
                        },
                        'success': function (response) {
                            if (response.result) {
                                swal.fire({
                                    "title": "",
                                    "text": succesText,
                                    "type": "success",
                                    "confirmButtonClass": "btn btn-secondary"
                                }).then(function (result) {
                                        window.location.replace("/admin/productProvider/0");
                                });
                            }else {
                                swal.fire({
                                    "title": "خطا",
                                    "text": response.data,
                                    "type": "error",
                                    "confirmButtonClass": "btn btn-danger"
                                })
                            }
                        }

                    })
                } else if (result.dismiss === 'cancel') {
                }
            });


        });
    };

    // search
    let search = function () {
        $('#kt_form_status').on('change', function () {
            datatable.search($(this).val().toLowerCase(), 'Status');
        });
    }

    // selection

    // selected records status update


    return {
        // public functions
        init: function () {
            init();
            search();
            // selectedFetch();


        },
    };
}();

// On document ready
KTUtil.ready(function () {
    productPage.init();
});