"use strict";
// Class definition

let categoryPage = function () {
    let counter =0;
    // let iables
    let datatable;
    let nowDate;
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
                        url:'/dashboard/category',
                        headers: {'x-my-custokt-header': 'some value', 'x-test-header': 'the value'},
                        map: function(raw) {
                            // sample data mapping
                            let dataSet = raw;
                            if (typeof raw.data !== 'undefined') {
                                dataSet = raw.data;
                                nowDate = raw.nowDate;
                                $('.total').text(raw.meta.total);
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
            sortable: true,

            pagination: true,

            search: {
                input: $('#generalSearch'),
                delay: 400,
            },

            // columns definition
            columns: [
                {
                    field: "name",
                    title: "نام",
                    width: 'auto',
                    autoHide: false,

                    template: function (row) {
                        return '<span>' + row.name + '</span>'
                    },

                },
                {
                    field: "type",
                    title: "دسته",
                    width: 'auto',
                    autoHide: false,

                    template: function (row) {
                        return '<span>' + (row.parent.name != null ? row.parent.name : "-") + '</span>'
                    },

                },

                {
                    field: 'Actions',
                    title: 'عملیات',
                    sortable: false,
                    overflow: 'visible',
                    width :'auto',
                    autoHide: false,
                    textAlign: 'center',
                    template: function(row) {
                        return'<div class="btn-group">' +
                            '<a class="btn btn-sm btn-outline-info mr-2 edit-category" style="cursor: pointer" data-edit-id="' + row.id + '">ویرایش</a>' +
                            '<a class="btn btn-sm btn-outline-danger text-danger delete-category" style="cursor: pointer" data-delete-id="' + row.id + '">حذف</a>' +
                            '</div>' ;
                    }
                }]
        });

        datatable.on('click', '.delete-category' , function () {
                let deletedId = $(this).data('delete-id');

            swal.fire({
                text: 'آیا نسبت به حذف تگ  اطمینان دارید؟',
                type: 'question',
                showCancelButton: true,
                confirmButtonText: 'بله',
                cancelButtonText: 'خیر',
                // reverseButtons: true
            }).then(function (result) {
                if (result.value) {
                    $.ajax({
                        'url': '/admin/category/delete/' + deletedId,
                        'method': 'get',
                        'beforeSend': function () {

                        },
                        'complete': function () {
                        },
                        'success': function (response) {
                            if (response.result) {
                                swal.fire({
                                    "title": "",
                                    "text": "حذف با موفقیت انجام شد.",
                                    "type": "success",
                                    "confirmButtonClass": "btn btn-secondary"
                                }).then(function (result) {
                                    datatable.reload()
                                })
                            } else {
                                swal.fire({
                                    "title": "خطا",
                                    "text": response.data,
                                    "type": "error",
                                    "confirmButtonClass": "btn btn-warning"
                                });
                            }
                        }

                    });

                } else if (result.dismiss === 'cancel') {
                }
            });
        });
        datatable.on('click', '.edit-category' , function (){
            window.location = '/admin/category/add/' + $(this).data('edit-id');
        });
    };

    // search
    let search = function () {
        $('#kt_form_status').on('change', function () {
            datatable.search($(this).val().toLowerCase(), 'Status');
        });
    }

    // selection
    let selection = function () {
        // init form controls
        //$('#kt_form_status, #kt_form_type').selectpicker();

        // event handler on check and uncheck on records
        datatable.on('kt-datatable--on-check kt-datatable--on-uncheck kt-datatable--on-layout-updated', function (e) {
            let checkedNodes = datatable.rows('.kt-datatable__row--active').nodes(); // get selected records
            let ids = datatable.rows('.kt-datatable__row--active').nodes().find('.kt-checkbox--single > [type="checkbox"]').map(function (i, chk) {
                return $(chk).val();
            });

            // populate selected IDs
            let c = document.createDocumentFragment();

            for (let i = 0; i < ids.length; i++) {
                let li = document.createElement('li');
                li.setAttribute('data-id', ids[i]);
                li.innerHTML = 'Selected record ID: ' + ids[i];
                c.appendChild(li);
            }

            $(e.target).find('#kt_apps_user_fetch_records_selected').append(c);
        }).on('hide.bs.modal', function (e) {
            $(e.target).find('#kt_apps_user_fetch_records_selected').empty();
        });
    };

    // selected records status update
    let selectedStatusUpdate = function () {
        $('#kt_subheader_group_actions_status_change').on('click', "[data-toggle='status-change']", function () {
            let ids = datatable.rows('.kt-datatable__row--active').nodes().find('.kt-checkbox--single > [type="checkbox"]').map(function (i, chk) {
                return $(chk).val();
            });

            if (ids.length > 0) {
                // learn more: https://sweetalert2.github.io/
                swal.fire({
                    buttonsStyling: false,

                    text: "Are you sure to delete " + ids.length + " selected records ?",
                    type: "danger",

                    confirmButtonText: "Yes, delete!",
                    confirmButtonClass: "btn btn-sm btn-bold btn-danger",

                    showCancelButton: true,
                    cancelButtonText: "No, cancel",
                    cancelButtonClass: "btn btn-sm btn-bold btn-brand"
                }).then(function (result) {
                    if (result.value) {
                        swal.fire({
                            title: 'Deleted!',
                            text: 'Your selected records have been deleted! :(',
                            type: 'success',
                            buttonsStyling: false,
                            confirmButtonText: "OK",
                            confirmButtonClass: "btn btn-sm btn-bold btn-brand",
                        })
                        // result.dismiss can be 'cancel', 'overlay',
                        // 'close', and 'timer'
                    } else if (result.dismiss === 'cancel') {
                        swal.fire({
                            title: 'Cancelled',
                            text: 'You selected records have not been deleted! :)',
                            type: 'error',
                            buttonsStyling: false,
                            confirmButtonText: "OK",
                            confirmButtonClass: "btn btn-sm btn-bold btn-brand",
                        });
                    }
                });
            }
        });
    }

    let updateTotal = function () {
        datatable.on('kt-datatable--on-layout-updated', function () {
            //$('#kt_subheader_total').html(datatable.getTotalRows() + ' Total');
        });
    };


    // modal add post form validation
    let bayAddValidation = function () {
        $("#form-add-bay").validate({
            // define validation rules
            rules: {
                //= Client Information(step 3)
                // Billing Information
                "modal-txt-bayName": {
                    required: true,
                },
                "modal-txt-bayCode": {
                    required: true
                },
                "modal-number-bayVoltageLevel": {
                    required: true
                },


            },
            messages: {
                "modal-txt-bayName": {
                    required: " City must be  filled in",
                    minlength: "At least 3 characters long",
                    maxlength: "Should not exceed 30 characters",
                },
                "modal-txt-bayCode": {
                    required: " State must be  filled in",
                    minlength: "At least 3 characters long",
                    maxlength: "Should not exceed 30 characters",
                },
                "modal-number-bayVoltageLevel": {
                    required: " State must be  filled in",
                    minlength: "At least 3 characters long",
                    maxlength: "Should not exceed 30 characters",
                }

            },

            //display error alert on form submit
            invalidHandler: function (event, validator) {
                swal.fire({
                    "title": "",
                    "text": "There are some errors in your submission. Please correct them.",
                    "type": "error",
                    "confirmButtonClass": "btn btn-secondary",
                    "onClose": function (e) {
                    }
                });

                event.preventDefault();
            },

            submitHandler: function (form) {
                //form[0].submit(); // submit the form
                swal.fire({
                    "title": "",
                    "text": "Form validation passed. All good!",
                    "type": "success",
                    "confirmButtonClass": "btn btn-secondary"
                });
                return false;
            }
        });
    };

    return {
        // public functions
        init: function () {
            init();
            search();
            selection();
            // selectedFetch();
            selectedStatusUpdate();
            // selectedDelete();
            updateTotal();
            // bayAddValidation();
            // initMap('location');
        },
    };
}();

// On document ready
KTUtil.ready(function () {
    categoryPage.init();
});