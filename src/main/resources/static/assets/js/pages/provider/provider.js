"use strict";
// Class definition

let providerPage = function () {
    // let iables
    let actionText;
    let successText;
    let nowDate;
    let modal = $('#kt_modal_remote');
    // init
    let initTable = function () {

        // init the datatables. Learn more: https://keenthemes.com/metronic/?page=docs&section=datatable
        let datatable = $('.kt-datatable').KTDatatable({
            // datasource definition

            data: {
                type: 'remote',
                source: {
                    read: {
                        url: '/dashboard/provider',
                        headers: {'x-my-custokt-header': 'some value', 'x-test-header': 'the value'},
                        map: function (raw) {

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
                pageSize: 15, // display 10 records per page
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
            sortable: true,

            pagination: true,


            search: {
                input: $('#generalSearch'),
                delay: 400,
            },

            // columns definition
            columns: [

                {
                    field: 'name',
                    title: 'نام',
                    textAlign: 'center',
                    autoHide: false,
                    template: function (row) {

                        console.log(row);
                        let count = 0;
                        let html = '<div class="kt-user-card-v2 ">' +
                            '<div ' + (row.imageId != 0 ? '' : 'hidden') + ' class="kt-user-card-v2__pic">' +
                            '<img src="/thumbnail/files/0/' + row.imageId + '" >' +
                            '</div>' +
                            '<div ' + (row.imageId != 0 ? 'hidden' : '') + ' class="kt-badge kt-badge--xl kt-badge--info">' + row.name.substring(0, 2) + '</div>' +
                            '<div class="kt-user-card-v2__details">' +
                            '<span  class="kt-user-card-v2__name text-left">' + row.name + '</span>';
                        html += '</div>' +
                            '</div>';

                        return html;
                    },

                },
                {
                    field: 'address',
                    title: 'شماره همراه ',
                    textAlign: 'center',
                    width: 100,
                    template: function (row) {
                        let count = 0;
                        let html = '';
                        // row.regions.forEach(function (r) {
                        //     count++;
                        //     if (count == 1) {
                        //         html += '<span class="kt-badge kt-badge--sm small  kt-badge--inline">' + r.name + '</span>'
                        //     } else {
                        //         html += '<label> &nbsp</label><label class="kt-badge kt-badge--sm small  kt-badge--inline">' + r.name + '</label>'
                        //
                        //     }
                        // })
                        return html +
                            '<p>' + row.phone + '</p>'

                    },
                },
                {
                    field: 'Actions',
                    title: 'عملیات',
                    textAlign: 'center',
                    width: 300,
                    template: function (row) {
                        return '<div class="btn-group">' +
                            '<a   href="/admin/productProvider/' + row.id + '" class="btn btn-sm btn-outline-dark ">محصولات</a>' +
                            '<a href="/admin/provider/edit/' + row.id + '" target="_blank"  class="btn btn-sm btn-outline-brand " data-edit-id="' + row.id + '">ویرایش</a>' +
                            '<button class="btn btn-sm   ' + (row.active ? 'btn-outline-success ' : 'btn-outline-warning  ') + '"  data-active-bool="' + row.active + '" data-active-id="' + row.id + '" id="provider-active">' + (row.active ? ' غیرفعال کردن ' : '  فعال کردن  ') + '</button>' +
                            '<button class="btn btn-sm btn-outline-danger " data-delete-id="' + row.id + '">حذف</button>' +
                            '</div>';
                    }
                }]
        });
        $('#generalSearch').on('change', function () {
            datatable.search($(this).val().toLowerCase(), 'address');
        });
        $('#generalSearch').selectpicker();
        datatable.on('click', '[data-active-id]', function () {
            let activeDeId = $(this).data('active-id');
            let state = $(this).data('active-bool');
            actionText = (state ? 'آیا نسبت به غیر فعال  کردن تامین کننده اطمینان دارید؟' : ' آیا نسبت به  فعال  کردن تامین کننده اطمینان دارید؟');
            successText = (state ? 'تامین کننده غیرفعال شد' : 'تامین کننده فعال شد');
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
                        'url': '/admin/provider/activeDeactivate/' + activeDeId + '/' + (state ? 'false' : 'true'),
                        'method': 'get',
                        beforeSend: function () {

                        },
                        complete: function () {
                        },
                        success: function (response) {
                            if (response.result) {
                                swal.fire({
                                    "title": "",
                                    "text": successText,
                                    "type": "success",
                                    "confirmButtonClass": "btn btn-secondary"
                                }).then(function (result) {
                                    if (result.value) {
                                        window.location.replace("/admin/provider");
                                    }
                                });
                            } else {
                                swal.fire({
                                    "title": "خطا",
                                    "text": response.data,
                                    "type": "error",
                                    "confirmButtonClass": "btn btn-danger"
                                })
                            }
                        },
                        error: function (res) {
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
        datatable.on('click', '[data-delete-id]', function () {
            let deleteId = $(this).data('delete-id');
            actionText = 'آیا نسبت به حذف تامین کننده اطمینان دارید؟';
            successText = 'تامین کننده با موفقیت حذف شد ';
            swal.fire({
                text: actionText,
                type: 'question',
                showCancelButton: true,
                confirmButtonText: 'بله',
                cancelButtonText: 'خیر',
                // reverseButtons: true
            }).then(function (result) {
                if (result.value) {
                    let data = {
                        id: deleteId,
                    };
                    $.ajax({
                        'data': data,
                        'url': '/admin/provider/delete',
                        'method': 'get',
                        beforeSend: function () {
                        },
                        complete: function () {
                        },
                        success: function (response) {
                            if (response.result) {
                                swal.fire({
                                    "title": "ثبت",
                                    "text": successText,
                                    "type": "success",
                                    "confirmButtonClass": "btn btn-secondary"
                                }).then(function (result) {
                                    if (result.value) {
                                        datatable.reload();
                                    }
                                });
                            } else {
                                swal.fire({
                                    "title": "خطا",
                                    "text": response.data,
                                    "type": "error",
                                    "confirmButtonClass": "btn btn-warning"
                                });
                            }
                        },
                        error: function (res) {
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
    };
    // selected records status update
    return {
        // public functions
        init: function () {
            initTable();

            // selectedFetch();


        },
    };
}();
// On document ready
KTUtil.ready(function () {
    providerPage.init();
});