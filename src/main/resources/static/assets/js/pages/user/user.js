// Class definition

let bayPage = function () {

    // let iables
    let datatable;

    // init
    let init = function () {
        // init the datatables. Learn more: https://keenthemes.com/metronic/?page=docs&section=datatable
        datatable = $('#ajax_data').KTDatatable({
            // datasource definition
            data: {
                type: 'remote',
                source: {
                    read: {
                        url: '/admin/user/list',
                        map: function (raw) {
                            var dataSet = raw;
                            if (typeof raw.data !== 'undefined') {
                                dataSet = raw.data;
                                $('.total').text(raw.count)

                            }
                            return dataSet;
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
                    field: "providerName",
                    title: "نام",
                    width: 'auto',
                    autoHide: false,
                    template: function (row) {
                        return '<span>' + row.name + '</span>'
                    },
                },
                {
                    field: "address",
                    title: "آدرس",
                    width: 'auto',
                    autoHide: false,
                    template: function (row) {
                        return '<span>' + row.address + '</span>'
                    },
                },
                {
                    field: "phoneNumber",
                    title: "شماره تماس ",
                    width: 'auto',
                    template: function (row) {
                        return '<span>' + row.phone + '</span>'
                    },
                },

                //<start>  vaziat bayad to dome fala qeyr falal neshon dade she melse provider & product

                // {
                //     field: "activeDeactive",
                //     title: "وضعیت ",
                //     width: 'auto',
                //     template: function (row) {
                //         return '<span>' + row.active + '</span>'
                //     },
                // },

                //<end>

                {
                    field: 'Actions',
                    title: 'عملیات',
                    sortable: false,
                    overflow: 'visible',
                    width: 300,
                    textAlign: 'center',
                    template: function (row) {
                        return '<div class="btn-group">' +
                            '<a href="/admin/user/edit/' + row.id + '" target="_blank"  class="btn btn-sm btn-outline-brand " data-edit-id="' + row.id + '">ویرایش</a>' +
                            '<button  class="btn btn-sm   ' + (row.active ? 'btn-outline-success ' : 'btn-outline-warning') + '"  data-active-bool="' + row.active + '" data-active-id="' + row.id + '" id="user-active">' + (row.active ? ' غیرفعال کردن ' : '  فعال کردن  ') + '</button>' +
                            '</div>';
                    }
                }]
        });
        datatable.on('click', '[data-active-id]', function () {
            let actionText = '';
            let successText = '';
            let activeDeId = $(this).data('active-id');
            let state = $(this).data('active-bool');
            actionText = (state ? 'آیا نسبت به غیر فعال  کردن کاربر اطمینان دارید؟' : ' آیا نسبت به  فعال  کردن کاربر اطمینان دارید؟');
            successText = (state ? 'کاربر غیرفعال شد' : 'کاربر فعال شد');
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
                        // 'url': '/admin/provider/activeDeactivate/' + activeDeId + '/' + (state ? 'false' : 'true'),
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
                                        // window.location.replace("/admin/provider");
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
                console.log(chk, "    ", i);
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
    bayPage.init();
});