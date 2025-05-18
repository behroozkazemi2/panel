"use strict";
// Class definition

var KTDatatableRemoteAjaxDemo = function() {
    // Private functions

    var nowDate;
    var userGrid;
    // basic demo
    var list = function() {

        if (userGrid) {
            userGrid.destroy();
        }

        userGrid = $('.kt-datatable').KTDatatable({
            // datasource definition
            data: {
                type: 'remote',
                source: {
                    read: {
                        url: '/admin/user/list',
                        // sample custom headers
                        headers: {'x-my-custokt-header': 'some value', 'x-test-header': 'the value'},
                        map: function(raw) {
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
                    field: 'name',
                    title: 'نام',
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
                    field: 'unit',
                    title: 'واحد',
                    sortable: false,
                    autoHide: false,
                    textAlign: 'center',
                    template: function(row) {
                        return '<p>' + ( row.unit != null ? row.unit.name : '' ) + '</p>'
                    },
                },
                {
                    field: 'date',
                    title: 'تاریخ ثبت',
                    sortable: false,
                    autoHide: false,
                    template: function(row) {
                        return 	'<p class="kt-margin-b-5"> '  + (row.registerDate != null ? '<span>' + timeStampToYearMonthDay(row.registerDate) + '</span>' : 'ثبت نشده') + '</p>'
                    },
                },
                {
                    field: 'registrarName',
                    title: 'ثبت کننده',
                    sortable: false,
                    autoHide: false,
                    template: function(row) {
                        return '<p class="kt-margin-b-5">'  + (row.registrarName != null && row.registrarName != "" ? row.registrarName : 'نامشخص') + '</p>';
                    },
                },
                {
                    field: 'Actions',
                    title: 'عملیات',
                    sortable: false,
                    overflow: 'visible',
                    autoHide: false,
                    textAlign: 'center',
                    template: function(row) {
                        return  '<a title="ویرایش اطلاعات کاربر" class="btn btn-outline-brand btn-elevate btn-icon" href="/admin/user/edit/' + row.id + '"><i class="la la-edit"></i></a>' +
                        '&nbsp;' +
                        '<button type="button" title="حذف کاربر" class="btn btn-outline-danger btn-elevate btn-icon " data-user-id = "' + row.id +'"><i class="la la-trash"></i></button>' ;
                    },
                }],

        });

        $('#kt_form_status').on('change', function() {
            datatable.search($(this).val().toLowerCase(), 'Status');
        });

        $('#kt_form_type').on('change', function() {
            datatable.search($(this).val().toLowerCase(), 'Type');
        });

        $('#kt_form_status,#kt_form_type').selectpicker();

        userGrid.on('click','[data-user-id]',function () {
            var userId = $(this).data('user-id');
            swal.fire({
                title: 'حذف کاربر',
                text: "کاربر حذف شود؟",
                type: 'warning',
                showCancelButton: true,
                cancelButtonText: 'خیر',
                confirmButtonText: 'بلی'
            }).then(function (result) {
                if (result.value) {
                    $.ajax({
                        url: '/admin/user/delete/' + userId,
                        type: 'post',
                        success: function (response) {
                            // KTApp.unprogress(btn);
                            if (response.result) {
                                swal.fire({
                                    "title": 'عملیات موفق',
                                    "text": 'کاربر با موفقیت حذف شد!',
                                    "type": 'success',
                                    "confirmButtonClass": "btn btn-secondary",
                                    "confirmButtonText": "تایید"
                                });
                                userGrid.reload();
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
                                "confirmButtonText": "تایید"
                            });
                        }
                    });
                }

            });

        });

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