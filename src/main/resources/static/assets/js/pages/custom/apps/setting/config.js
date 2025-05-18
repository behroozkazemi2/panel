var requestNew = function () {

    var formEl;
    var validator;
    var modal = $('#kt_modal_remote');
    // basic driverList
    var vehicleDataTable;
    var initVehicleTable = function (typeId, tableId) {

        vehicleDataTable = $('#vehicle-table').KTDatatable({
            // datasource definition
            data: {
                type: 'remote',
                source: {
                    read: {
                        url: '/admin/setting/vehicleList',
                        headers: {'x-my-custokt-header': 'some value', 'x-test-header': 'the value'},
                        map: function (raw) {
                            var dataSet = raw;
                            if (typeof raw.data !== 'undefined') {
                                dataSet = raw.data;
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
                                "confirmButtonText": "تایید"
                            });
                        }
                    },
                },
                pageSize: 5,
                serverPaging: true,
                serverFiltering: true,
                serverSorting: true
            },

            // layout definition
            layout: {
                scroll: false,
                footer: false
            },

            // column sorting
            sortable: false,

            pagination: true,

            search: {
                input: $('#generalSearch'),
                delay: 300
            },

            // columns definition
            columns: [
                {
                    field: 'id',
                    title: 'شماره',
                    width: 100,
                    textAlign: 'center'
                },

                {
                    field: 'name',
                    title: 'نام',
                    textAlign: 'center',

                },
                {
                    field: 'Actions',
                    title: 'عملیات',
                    autoHide: false,
                    overflow: 'visible',
                    textAlign: 'center',
                    template: function (row) {
                        return '<button title="ویرایش" class="btn btn-outline-brand btn-elevate btn-icon" data-row-id="0/' + row.id + '"><i class="la la-edit"></i></button>'+
                            (row.active? '<button title="غیر فعال" class="btn btn-outline-danger btn-elevate btn-icon kt-margin-5" data-inactive-row-id="0/' + row.id + '"><i class="la la-ban"></i></button>':
                                '<button title="فعالسازی" class="btn btn-outline-brand btn-outline-success btn-icon kt-margin-5" data-active-row-id="0/' + row.id + '"><i class="la la-check"></i></button>');
                    }
                }]
        });

        vehicleDataTable.on('click', '[data-row-id]', function () {
            openModal($(this).data('row-id'))
        });

        vehicleDataTable.on('click', '[data-inactive-row-id]', function () {
            activated($(this).data('inactive-row-id'),vehicleDataTable)
        });

        vehicleDataTable.on('click', '[data-active-row-id]', function () {
            activated($(this).data('active-row-id'),vehicleDataTable)
        });
        $('#kt_form_status').on('change', function () {
            vehicleDataTable.search($(this).val().toLowerCase(), 'Status');
        });

        $('#kt_form_type').on('change', function () {
            vehicleDataTable.search($(this).val().toLowerCase(), 'Type');
        });

        $('#add-car').click(function () {
            openModal('0/0');
        })

    };




    var colorDataTable;
    var initColorTable = function () {
        colorDataTable = $('#color-table').KTDatatable({
            // datasource definition
            data: {
                type: 'remote',
                source: {
                    read: {
                        url: '/admin/setting/vehicleColorList',
                        headers: {'x-my-custokt-header': 'some value', 'x-test-header': 'the value'},
                        map: function (raw) {
                            var dataSet = raw;
                            if (typeof raw.data !== 'undefined') {
                                dataSet = raw.data;
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
                                "confirmButtonText": "تایید"
                            });
                        }
                    },
                },
                pageSize: 5,
                serverPaging: true,
                serverFiltering: true,
                serverSorting: true
            },

            // layout definition
            layout: {
                scroll: false,
                footer: false
            },

            // column sorting
            sortable: false,

            pagination: true,

            search: {
                input: $('#generalSearch'),
                delay: 300
            },

            // columns definition
            columns: [
                {
                    field: 'id',
                    title: 'شماره',
                    width: 100,
                    textAlign: 'center'
                },

                {
                    field: 'name',
                    title: 'نام',
                    textAlign: 'center',

                },
                {
                    field: 'Actions',
                    title: 'عملیات',
                    autoHide: false,
                    overflow: 'visible',
                    textAlign: 'center',
                    template: function (row) {
                        return '<button title="ویرایش" class="btn btn-outline-brand btn-elevate btn-icon" data-color-id="1/' + row.id + '"><i class="la la-edit"></i></button>' +
                            (row.active? '<button title="غیر فعال" class="btn btn-outline-danger btn-elevate btn-icon kt-margin-5" data-inactive-color-id="1/' + row.id + '"><i class="la la-ban"></i></button>':
                                         '<button title="فعالسازی" class="btn btn-outline-success btn-elevate btn-icon kt-margin-5" data-active-color-id="1/' + row.id + '"><i class="la la-check"></i></button>');
                    }
                }]
        });

        colorDataTable.on('click', '[data-color-id]', function () {
            openModal($(this).data('color-id'))
        });

        colorDataTable.on('click', '[data-inactive-color-id]', function () {
            activated($(this).data('inactive-color-id'),colorDataTable)
        });

        colorDataTable.on('click', '[data-active-color-id]', function () {
            activated($(this).data('active-color-id'),colorDataTable)
        });

        $('#kt_form_status').on('change', function () {
            colorDataTable.search($(this).val().toLowerCase(), 'Status');
        });

        $('#kt_form_type').on('change', function () {
            colorDataTable.search($(this).val().toLowerCase(), 'Type');
        });

        $('#add-color').click(function () {
            openModal('1/0');
        });

    };

    var  activated = function(data,dt) {
        $.ajax({
            url: '/admin/setting/activated/'+ data,
            type: 'post',
            success: function (response) {
                // KTApp.unprogress(btn);
                if (response.result) {
                    swal.fire({
                        "title": "عملیات موفق!",
                        "text": "",
                        "type": "success",
                        "confirmButtonClass": "btn btn-warning",
                        "confirmButtonText": "تایید"
                    });
                    dt.reload();
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

    var save = function () {
        $.ajax({
            url: '/admin/setting/saveIdName',
            type: 'post',
            data: {
                saveType: $('input[name="typeId"]').val(),
                unitId: $('input[name="unitId"]').val(),
                name: $('input[name="name"]').val()
            },
            success: function (response) {
                // KTApp.unprogress(btn);
                if (response.result) {
                    swal.fire({
                        "title": "عملیات موفق!",
                        "text": "",
                        "type": "success",
                        "confirmButtonClass": "btn btn-warning",
                        "confirmButtonText": "تایید"
                    });
                    $('#kt_modal_remote').modal('toggle');

                    if($('input[name="typeId"]').val() == 0){
                        vehicleDataTable.reload();
                    }else{
                        colorDataTable.reload();
                    }

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

    };
    var openModal = function (data) {
        $.ajax({
            url: '/admin/setting/modal/' + data,
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
    }

    var initPersianDatePickerInit = function () {
        $('#start5ShanebeDate').timepicker({
            minuteStep: 5,
            defaultTime: 'value',
            showSeconds: false,
            showMeridian: false,
        });
        $('#end5ShanebeDate').timepicker({
            minuteStep: 5,
            defaultTime: 'value',
            showSeconds: false,
            showMeridian: false,
        });
        $('#startShanebeTaCharshanbeDate').timepicker({
            minuteStep: 5,
            defaultTime: 'value',
            showSeconds: false,
            showMeridian: false,
        });
        $('#endShanebeTaCharshanbeDate').timepicker({
            minuteStep: 5,
            defaultTime: 'value',
            showSeconds: false,
            showMeridian: false,
        });
    };
    return {
        init: function () {

            initVehicleTable();
            initColorTable();
            initPersianDatePickerInit();

            modal.on('shown.bs.modal', function () {
                modal.find('.btn-submit').on('click', function () {
                    save();
                });
            }).on('hidden.bs.modal', function () {
                modal.find('.modal-content').empty();
            });
        }
    };

}();

jQuery(document).ready(function () {
    requestNew.init();
});