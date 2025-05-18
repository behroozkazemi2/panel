var requestNew = function () {

    var formEl;
    var validator;

    var initValidation = function () {
        validator = formEl.validate({
            // Validate only visible fields
            ignore: ":hidden",

            // Validation rules
            rules: {
                // Step 1
                "group.id": {
                    required: true
                },
                "unit.name": {
                    required: true
                },
                maxVacationPreYear: {
                    required: true
                },
                startShanebeTaCharshanbe: {
                    required: true
                },
                endShanebeTaCharshanbe: {
                    required: true
                },
                start5Shanebe: {
                    required: true
                },
                end5Shanebe: {
                    required: true
                }
            },

            messages: {
                // Step 1
                "group.id": {
                    required:  "گروه قراردادی را انتخاب نمایید"
                },
                "unit.name": {
                    required: "نام واحد را وارد نمایید"
                },
                maxVacationPreYear: {
                    required: "میزان مرخصی در سال را وارد نمایید"
                },
                startShanebeTaCharshanbe: {
                    required: "ساعت شروع کاری را وارد نمایید"
                },
                endShanebeTaCharshanbe: {
                    required: "ساعت پایان کار را وارد نمایید"
                },
                start5Shanebe: {
                    required: "ساعت شروع کار را وارد نمایید"
                },
                end5Shanebe: {
                    required: "ساعت پایان کار را وارد نمایید"
                }

            },

            // Display error
            invalidHandler: function (event, validator) {
                KTUtil.scrollTop();
                // swal.fire({
                // 	"title": "",
                // 	"text": "There are some errors in your submission. Please correct them.",
                // 	"type": "error",
                // 	"buttonStyling": false,
                // 	"confirmButtonClass": "btn btn-brand btn-sm btn-bold"
                // });
            },

            // Submit valid form
            submitHandler: function (form) {
            }
        });
    };

    var initSubmit = function () {
        var btn = $('.action-submit');

        btn.on('click', function (e) {
            e.preventDefault();

            if (validator.form()) {
                KTApp.progress(btn);
                formEl.ajaxSubmit({
                    url: '/admin/setting/saveConfig',
                    type: 'post',
                    success: function (response) {
                        KTApp.unprogress(btn);

                        if (response.result) {


                            swal.fire({
                                "title": "عملیات موفق!",
                                "text": "عملیات با موفقیت انجام شد",
                                "type": "success",
                                "confirmButtonClass": "btn btn-secondary",
                                "confirmButtonText": "تایید"
                            }).then(function (result) {
                                    window.location.replace("/admin/setting/unit")

                            });


                        } else {

                            swal.fire({
                                "title": "",
                                "text": response.payload,
                                "type": "error",
                                "confirmButtonClass": "btn btn-warning",
                                "confirmButtonText": "تایید"
                            });

                        }
                    },
                    error: function () {
                        KTApp.unprogress(btn);
                        swal.fire({
                            "title": "",
                            "text": "خطا در برقراری ارتباط با سرور، لطفا مجدد تلاش نمایید.",
                            "type": "error",
                            "confirmButtonClass": "btn btn-warning",
                            "confirmButtonText": "تایید"
                        });
                    }
                });
            }
        });
    };

    // basic driverList
    var list = function() {

        var contractGroupHistoryGrid = $('.kt-datatable').KTDatatable({
            // datasource definition
            data: {
                type: 'remote',
                source: {
                    read: {
                        url: '/admin/contract/groupListHistory/'+$('[name="unit.id"]').val(),
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
                pageSize: 20,
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
                }]

        });

        $('#kt_form_status').on('change', function() {
            contractGroupHistoryGrid.search($(this).val().toLowerCase(), 'Status');
        });

        $('#kt_form_type').on('change', function() {
            contractGroupHistoryGrid.search($(this).val().toLowerCase(), 'Type');
        });

        $('#kt_form_status,#kt_form_type').selectpicker();

    };


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

            formEl = $('#kt_form');

            initValidation();
            initSubmit();
            list();
            initPersianDatePickerInit();
        }
    };

}();

jQuery(document).ready(function () {
    requestNew.init();
});