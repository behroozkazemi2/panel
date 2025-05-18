"use strict";
// Class definition

let orderPage = function () {

    // let iables
    let datatable;
    let nowDate;
    let status = '';
    let modal = $('#kt_modal_remote');
    // init
    let init = function () {
        // init the datatables. Learn more: https://keenthemes.com/metronic/?page=docs&section=datatable
        datatable = $('#ajax_data').KTDatatable({
            // datasource definition
            data: {
                type: 'remote',
                source: {
                    read: {
                        url: '/dashboard/order',
                        headers: {'x-my-custokt-header': 'some value', 'x-test-header': 'the value'},
                        map: function (raw) {
                            // sample data mapping
                            let dataSet = raw;
                            if (typeof raw.data !== 'undefined') {
                                dataSet = raw.data;
                                $('.total').text(raw.count);

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
                pageSize: 15, // display 20 records per page
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
                    field: "trackingCode",
                    title: "کد",
                    textAlign: "center",
                    width: 100,
                    autoHide: false,
                },

                ($('#user-supervisor').val() ? {
                    field: "providerName",
                    title: "نام تامین کننده",
                    textAlign: "center",
                    autoHide: true,
                    template: function (row) {
                        console.log(row);
                        let count = 0;
                        let html = '<div class="kt-user-card-v2 justify-content-center " >' +
                            '<div ' + (row.providerImageId != 0 ? '' : 'hidden') + ' class="kt-user-card-v2__pic">' +
                            '<img src="/thumbnail/files/0/' + row.providerImageId + '" >' +
                            '</div>' +
                            '<div ' + (row.providerImageId != 0 ? 'hidden' : '') + ' class="kt-badge kt-badge--xl kt-badge--info">' + row.providerName.substring(0, 2) + '</div>' +
                            '<div class="kt-user-card-v2__details">' +
                            '<span  class="kt-user-card-v2__name text-left">' + row.providerName + '</span>';
                        html += '</div>' +
                            '</div>';

                        return html;
                    },
                } : ''),


                {
                    field: "customerName",
                    title: "خریدار",
                    textAlign: "center",
                    width: 100,
                },
                {
                    field: "customerMobile",
                    title: "شماره تماس خریدار",
                    textAlign: "center",
                    width: 100,
                },
                {
                    field: "billInsertDate",
                    title: "تاریخ ثبت سفارش",
                    textAlign: "center",
                    width: 100,
                },  {
                    field: "deliverDate",
                    title: "تاریخ و زمان تحویل سفارش",
                    textAlign: "center",
                    width: 200,
                },
                {
                    field: "products",
                    title: "لیست محصولات ",
                    textAlign: "center",
                    width: 200,
                    template: function (row) {

                        let output = '<div class="row">';
                        row.products.forEach(item => {
                            output += '<span class="col-12"> - ' + item + '</span>';
                        });
                        output += '</div>'
                        return output;
                    },
                }, {
                    field: "finalPrice",
                    title: "قیمت نهایی",
                    textAlign: "center",
                    width: 200,
                    template: function (row) {
                        return formatMoney(row.finalPrice)
                    }
                },

                {
                    field: "status",
                    title: "وضعیت",
                    width: 100,
                    textAlign: "center",
                    autoHide: false,
                    template: function (row) {
                        let statusColor = '';
                        switch (row.statusId) {
                            /*WAIT_FOR_PAY*/
                            case 1: {
                                statusColor = ' btn-label-warning ';
                                break;
                            }
                            /*PAYED*/
                            case 2: {
                                console.log('row.paymentMethod == ',row.paymentMethod)
                                if (row.paymentMethod == 2){
                                    statusColor = ' btn-label-danger ';
                                    row.status = 'در انتظار تماس با مشتری'
                                }else{
                                    statusColor = ' btn-label-success ';

                                }
                                break;
                            }
                            /*SENDING*/
                            case 3: {
                                statusColor = ' btn-label-info ';
                                break;
                            }
                            /*DELIVERED*/
                            case 4: {
                                statusColor = ' btn-label-primary ';
                                break;
                            }
                            /*CANCELED*/
                            case 5: {
                                statusColor = ' btn-label-danger';
                                break;
                            }

                            default:{
                                statusColor = ' btn-label-dark';
                        }
                        }
                        return '<span class="btn btn-bold btn-sm btn-font-sm  '+statusColor+'">'+row.status+'</span>'
                    }
                },
                {
                    field: 'Actions',
                    title: 'عملیات',

                    width: "auto",
                    sortable: false,
                    overflow: 'visible',
                    textAlign: 'center',
                    template: function (row) {
                        console.log(row.statusId);
                        switch (row.statusId) {
                            case 1: {
                                status = "در انتظار پرداخت پرداخت ";
                                break;
                            }
                            case 2: {
                                status = "ارسال";
                                break;
                            }
                            case 3: {
                                status = "تحویل داده شد";
                                break;
                            }
                            case 4: {
                                status = "تحویل داده شد";
                                break;
                            }

                        }
                        return '<div class="btn-group">' +
                            '<a href="/admin/order/detail/' + row.billId + '" target="_blank"  class="btn btn-sm btn-outline-brand text-primary">اطلاعت</a>' +
                            (row.statusId != 5 && row.statusId != 1  ? '<a data-order-id="' + row.billId + '"   data-status-id="' + row.statusId + '" data-perstatus-txt="' + row.status + '" data-status-text="' + status + '" class="btn btn-sm btn-outline-danger text-danger" >' + status + '</a>' : '') +
                            '</div>';
                    }
                }]
        });
        datatable.on('click', '[data-status-id]', function () {
            let statusId = $(this).data('status-id');
            let orderId = $(this).data('order-id');
            let statusText = $(this).data('status-text');
            let perStatus = $(this).data('perstatus-txt');
            if (statusId != 5 && statusId != 1 && statusId != 4)
            swal.fire({
                text: " آیا نسبت به تغییر وضعیت از " + perStatus + " به " + statusText + " اطمینان دارید؟",
                type: 'question',
                showCancelButton: true,
                confirmButtonText: 'بله',
                cancelButtonText: 'خیر',
                // reverseButtons: true
            }).then(function (result) {
                if (result.value) {
                    $.ajax({
                        'url': '/admin/order/status/' + orderId + '/' + statusId,
                        'method': 'get',
                        beforeSend: function () {

                        },
                        complete: function () {
                        },
                        success: function (response) {
                            if (response.result) {
                                swal.fire({
                                    "title": "",
                                    "text": "تغییر وضعیت با موفقیت انجام شد.",
                                    "type": "success",
                                    "confirmButtonClass": "btn btn-secondary"
                                }).then(function (result) {
                                    if (result.value) {
                                        window.location.replace("/admin/order");
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


    };

    // search
    let initComponent = function () {
        $('.has-select2').select2({});

    };
    var initPersianDatePickerInit = function () {
        $('#orderDate').MdPersianDateTimePicker({
            targetTextSelector: '#orderTimeStamp',
            targetDateSelector: '#orderTimeStampDate',
            enableTimePicker: false
        });
        $('#deliverDate').MdPersianDateTimePicker({
            targetTextSelector: '#deliverTimeStamp',
            targetDateSelector: '#deliverTimeStampDate',
            enableTimePicker: false
        });
    };

    // init
    let search = function () {

        $('#kt_form_status').on('change', function () {
            datatable.search($(this).val().toLowerCase(), 'status');
        });
        $('#customer_name').on('change', function () {
            datatable.search($(this).val().toLowerCase(), 'customerName');
        });
        $('#tracking_code').on('change', function () {
            datatable.search($(this).val().toLowerCase(), 'trackingCode');
        });
        $('#customer_mobile').on('change', function () {
            datatable.search($(this).val().toLowerCase(), 'customerMobile');
        });
        $('#generalSearch').on('change', function () {
            datatable.search($(this).val().toLowerCase(), 'generalSearch');
        });
        $('#orderTimeStampDate').on('change', function () {
            console.log('#orderTimeStamp ==' ,new Date($('#orderTimeStampDate').val()).getTime() )
            let od = new Date($('#orderTimeStampDate').val()).getTime().toString();

            datatable.search(od,'orderDate');
        });
        $('#deliverTimeStampDate').on('change', function () {
            let dl = new Date($('#deliverTimeStampDate').val()).toString();
            datatable.search(dl, 'deliverDate');
        });
    };


    // selected records status update

    let updateTotal = function () {
        datatable.on('kt-datatable--on-layout-updated', function () {
            //$('#kt_subheader_total').html(datatable.getTotalRows() + ' Total');
        });
    };


    return {
        // public functions
        init: function () {
            initComponent()
            initPersianDatePickerInit()
            init();
            search();
            updateTotal();
        },
    };
}();

// On document ready
KTUtil.ready(function () {
    orderPage.init();
});