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
                        url: '/dashboard/productProvider/list/' + providerId,
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
                    title: 'اطلاعات',
                    autoHide: false,
                    template: function (row) {
                        return '<div class="kt-user-card-v2 ">' +
                            '<div ' + (row.image != 0 ? '' : 'hidden') + ' class="kt-user-card-v2__pic ">' +
                            '<img src="/thumbnail/files/0/' + row.image + '" >' +
                            '</div>' +
                            '<div ' + (row.image != 0 ? 'hidden' : '') + ' class="kt-badge kt-badge--xl kt-badge--info">' + row.provider.name.substring(0, 2) + '</div>' +
                            '<div class="kt-user-card-v2__details row ">' +
                            '<span  class="kt-user-card-v2__name col-12">  محصول: ' + row.product.name  +
                            '</span>' +
                            '<span class="text-info col-6  mt-4">  تامین کننده: ' + row.provider.name + ' </span>' +
                            ($('#user-supervisor').val() ? '<span class="kt-user-card-v2__desc col-6 mt-3"> الویت نمایش : ' + row.showOrder + '</span>' : '') +
                            '</div>' +
                            '</div>';
                    },

                },
                {
                    field: 'primitiveAmount/offPrice',
                    title: 'قیمت اولیه /درصد تخفیف  ',
                    textAlign: 'center',
                    width:200,
                    template: function (row) {
                        return'<span>' + formatMoney(row.primitiveAmount) + ' ریال </span>'+
                        '<p>' + formatMoney(row.discountPercent) + '</p>';

                    },
                },
                {
                    field: 'unit/amount',
                    title: ' قیمت نهایی /واحد ',
                    textAlign: 'center',
                    autoHide: false,
                    width:200,
                    template: function (row) {
                        return '<span>' + formatMoney(row.finalAmount) + ' ریال </span>' +
                            '<p>' + row.unit + '</p>';

                    },
                },

                {
                    field: 'Actions',
                    title: 'عملیات',
                    textAlign: 'center',
                    width: 200,
                    template: function (row) {
                        return '<div class="btn-group text-center">' +
                            '<a href="/admin/productProvider/edit/' + row.id + '" target="_blank" class="btn btn-sm btn-outline-brand " data-edit-id="' + row.id + '">ویرایش</a>' +
                            '<button class="btn btn-sm  ' + (row.exist ? ' btn-outline-dark' : ' btn-outline-success') + '"  data-exist-bool="' + row.exist + '" data-exist-id="' + row.id + '" id="product-exist">' + (row.exist ? 'ناموجودکردن' : 'موجودکردن') + '</button>' +
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
                        'url': '/admin/productProvider/delete'+'/'+deleteId,
                        'method': 'get',
                        beforeSend: function () {

                        },
                        complete: function () {
                        },
                        success: function (res) {
                            if (res.result) {
                                swal.fire({
                                    "title": "",
                                    "text": succesText,
                                    "type": "success",
                                    "confirmButtonClass": "btn btn-secondary"
                                }).then(function (result) {
                                    datatable.reload();
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
                                    if (result.value) {
                                        window.location.replace("/admin/productProvider/0");
                                    }
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
        $('#brand').on('change', function () {
            datatable.search($(this).val().toLowerCase(), 'brand');
        });
        $('#category').on('change', function () {
            datatable.search($(this).val().toLowerCase(), 'category');
        });
    }
    let initComponent = function () {
        $('.has-select2').select2({
            placeholder: "انتخاب کنید",
            autoComplete: true,
            width: '100%'
        });
    };
    // selection

    // selected records status update


    return {
        // public functions
        init: function () {
            init();
            search();
            initComponent();
            // selectedFetch();


        },
    };
}();

// On document ready
KTUtil.ready(function () {
    productPage.init();
});