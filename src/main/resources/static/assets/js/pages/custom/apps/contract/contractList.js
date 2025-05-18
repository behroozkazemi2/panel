"use strict";
// Class definition

var KTDatatableRemoteAjaxDemo = function() {
    // Private functions

    var nowDate;
    var contractGrid;
    // basic demo
    var list = function() {

        if (contractGrid) {
            contractGrid.destroy();
        }

        contractGrid = $('.kt-datatable').KTDatatable({
            // datasource definition
            data: {
                type: 'remote',
                source: {
                    read: {
                        url: '/admin/contract/groupList',
                        // sample custom headers
                        headers: {'x-my-custokt-header': 'some value', 'x-test-header': 'the value'},
                        map: function(raw) {
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
                    field: 'title',
                    title: 'عنوان قرارداد',
                    sortable: false,
                    width: 200,
                    autoHide: false
                },
                {
                    field: 'number',
                    title: 'شماره قرارداد',
                    sortable: false,
                    width: 80,


                },
                {
                    field: 'date',
                    title: 'تاریخ',
                    sortable: false,
                    autoHide: false,
                    width: 200,
                    template: function(row) {
                        return 	'<p class="kt-margin-b-5">شروع: '  + (row.startDate != null ? '<span>' + timeStampToYearMonthDay(row.startDate) + '</span>' : 'ثبت نشده') + '</p>' +
                            '<p class="kt-margin-b-5">پایان: '  + (row.endDate != null ? '<span>' + timeStampToYearMonthDay(row.endDate) + '</span>' : 'ثبت نشده') + '</p>' +
                            '<p class="kt-margin-b-5">تاریخ ثبت: '  + (row.endDate != null ? '<span>' + timeStampToYearMonthDay(row.insertDate) + '</span>' : 'ثبت نشده') + '</p>'
                    },
                },
                {
                    field: 'registrarName',
                    title: 'ثبت کننده',
                    sortable: false,
                    width: 100,
                    template: function(row) {
                        return '<p class="kt-margin-b-5">'  + (row.registrarName != null && row.registrarName != "" ? row.registrarName : 'نامشخص') + '</p>';
                    },
                },
                {
                    field: 'description',
                    title: 'توضیحات',
                    width: 100,
                    sortable: false,
                    textAlign: 'center',
                },
                {
                    field: 'Actions',
                    title: 'عملیات',
                    sortable: false,
                    overflow: 'visible',
                    width: 150,
                    autoHide: false,
                    textAlign: 'center',
                    template: function(row) {
                        return'<button data-contract-edit-id="' + row.groupId +'/'+ row.id + '"       class="btn btn-sm btn-outline-brand  btn-elevate btn-icon kt-margin-5"    title="ویرایش"> <i class="la la-edit"></i></button>' +
                              '<button data-contract-new-id="' + row.groupId + '"        class="btn btn-sm btn-outline-success  btn-elevate btn-icon kt-margin-5"  title="تمدید قرارداد"><i class="la la-plus"></i></button>'  +
                              '<button data-contract-del-id="' + row.groupId + '"        class="btn btn-sm btn-outline-danger  btn-elevate btn-icon kt-margin-5"   title="حذف"><i class="la la-trash"></i></button>';
                    }
                }]

        });

        $('#kt_form_status').on('change', function() {
            contractGrid.search($(this).val().toLowerCase(), 'Status');
        });

        $('#kt_form_type').on('change', function() {
            contractGrid.search($(this).val().toLowerCase(), 'Type');
        });

        $('#kt_form_status,#kt_form_type').selectpicker();

        contractGrid.on('click','[data-contract-edit-id]',function () {
            window.location = '/admin/contract/edit/'+ $(this).data('contract-edit-id');
        });
        contractGrid.on('click','[ data-contract-new-id]',function () {
            window.location = '/admin/contract/edit/'+ $(this).data('contract-new-id');
        });
        contractGrid.on('click','[data-contract-del-id]',function () {
            var contractId = $(this).data('contract-del-id');
            swal.fire({
                title: 'حذف قرارداد',
                text: "آیا از ادامه عملیات اطمینان دارید؟",
                type: 'warning',
                showCancelButton: true,
                cancelButtonText: 'انصراف',
                confirmButtonText: 'حذف شود'
            }).then(function (result) {
                if (result.value) {
                    $.ajax({
                        url: '/admin/contract/delete/' + contractId,
                        type: 'post',

                        success: function (response) {
                            if (response.result) {
                                swal.fire({
                                    "title": 'عملیات موفق',
                                    "text": 'گروه قراردادی با موفقیت حذف شد',
                                    "type": 'success',
                                    "confirmButtonClass": "btn btn-secondary",
                                    "confirmButtonText": "تایید"
                                });
                                contractGrid.reload();
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
        })

    };

    function getExpireDateTextColor(expireDate) {

        if (expireDate > nowDate && expireDate < ( nowDate + (1000*60*60*24*5) ) ){
            return 'kt-font-warning';
        }
        if (expireDate < nowDate){
            return 'kt-font-danger';
        }
        return '';
    };

    return {
        // public functions
        init: function() {
            list();
        },
    };
}();

jQuery(document).ready(function() {
    KTDatatableRemoteAjaxDemo.init();
});