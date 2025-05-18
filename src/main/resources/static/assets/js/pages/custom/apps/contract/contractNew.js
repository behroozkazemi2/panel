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
                title: {
                    required: true
                },
                "contractRequest.number": {
                    required: true
                },
                startDate: {
                    required: true
                },
                endDate: {
                    required: true
                },
                "contractRequest.paymentMonthly": {
                    required: true
                },
                "contractRequest.paymentExtraHour": {
                    required: true
                },
                "contractRequest.paymentKilometer": {
                    required: true
                },
                "contractRequest.paymentDayInPlace": {
                    required: true
                }

            },

            messages: {
                // Step 1
                title: {
                    required: "عنوان قرارداد را وارد نمایید."
                },
                "contractRequest.number": {
                    required: "شماره قرارداد را وارد نمایید."
                },
                startDate: {
                    required: "زمان شروع را وارد نمایید."
                },
                endDate: {
                    required: "زمان پایان را وارد نمایید."
                },
                "contractRequest.paymentMonthly": {
                    required: "مبلغ کارکرد ماهانه را وارد نمایید."
                },
                "contractRequest.paymentExtraHour": {
                    required: "مبلغ یک ساعت اضافه کاری را وارد نمایید."
                },
                "contractRequest.paymentKilometer": {
                    required: "مبلغ هر کیلومتر مسافت طی شده را وارد نمایید."
                },
                "contractRequest.paymentDayInPlace": {
                    required: "مبلغ یک شب خواب در محل را وارد نمایید."
                },

            },

            // Display error
            invalidHandler: function (event, validator) {
                KTUtil.scrollTop();
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
                    url: '/admin/contract/save',
                    type: 'post',
                    success: function (response) {
                        KTApp.unprogress(btn);

                        if (response.result) {


                            swal.fire({
                                "title": "عملیات موفق!",
                                "text": "قرارداد با موفقیت ثبت شد",
                                "type": "success",
                                "confirmButtonClass": "btn btn-secondary",
                                "confirmButtonText": "تایید"
                            }).then(function (result) {
                                    window.location.replace("/admin/contract");
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

    var list = function() {

        var contractInfoGrid = $('.kt-datatable').KTDatatable({
            // datasource definition
            data: {
                type: 'remote',
                source: {
                    read: {
                        url: '/admin/contract/list/'+$('[name=contractGroupId]').val(),
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
                    field: 'contractNumber',
                    title: 'شماره قرارداد',
                    sortable: false,
                    width: 200,
                    autoHide: false
                },
                {
                    field: 'date',
                    title: 'تاریخ',
                    sortable: false,
                    autoHide: false,
                    width: 200,
                    template: function(row) {
                        return 	'<p class="kt-margin-b-5">شروع: '  + (row.fromDate != null ? '<span>' + timeStampToYearMonthDay(row.fromDate) + '</span>' : 'ثبت نشده') + '</p>' +
                            '<p class="kt-margin-b-5">پایان: '  + (row.toDate != null ? '<span>' + timeStampToYearMonthDay(row.toDate) + '</span>' : 'ثبت نشده') + '</p>'
                            // '<p class="kt-margin-b-5">تاریخ ثبت: '  + (row.endDate != null ? '<span>' + timeStampToYearMonthDay(row.insertDate) + '</span>' : 'ثبت نشده') + '</p>'
                    },
                },
                {
                    field: 'registrarName',
                    title: 'ثبت کننده',
                    sortable: false,
                    width: 100,
                    template: function(row) {
                        return '<p class="kt-margin-b-5">'  + (row.operatorName != null && row.operatorName != "" ? row.operatorName : 'نامشخص') + '</p>';
                    },
                },
                {
                    field: 'paymentMonthly',
                    title: 'ماهانه(ریال)',
                    width: 100,
                    sortable: false,
                    textAlign: 'center',
                    template: function(row) {
                        return row.paymentMonthly.toFixed(0)
                    }

                },
                {
                    field: 'paymentExtraHour',
                    title: 'اضافه کار(ریال)',
                    width: 100,
                    sortable: false,
                    textAlign: 'center',
                    template: function(row) {
                        return row.paymentExtraHour.toFixed(0)
                    }
                },
                {
                    field: 'paymentKilometer',
                    title: 'هر کیلومتر (ریال)',
                    width: 100,
                    sortable: false,
                    textAlign: 'center',
                    template: function(row) {
                        return row.paymentKilometer.toFixed(0)
                    }
                },
                {
                    field: 'paymentDayInPlace',
                    title: 'شب خواب(ریال)',
                    width: 100,
                    sortable: false,
                    textAlign: 'center',
                    template: function(row) {
                        return row.paymentDayInPlace.toFixed(0)
                    }
                }
               ]

        });

        $('#kt_form_status').on('change', function() {
            contractInfoGrid.search($(this).val().toLowerCase(), 'Status');
        });

        $('#kt_form_type').on('change', function() {
            contractInfoGrid.search($(this).val().toLowerCase(), 'Type');
        });

        $('#kt_form_status,#kt_form_type').selectpicker();

    };

    var initPersianDatePickerInit = function () {
        $('#startDate').MdPersianDateTimePicker({
            targetTextSelector: '#startTimeStamp',
            targetDateSelector: '#startTimeStampDate',
            enableTimePicker: false
        });
        $('#endDate').MdPersianDateTimePicker({
            targetTextSelector: '#endTimeStamp',
            targetDateSelector: '#endTimeStampDate',
            enableTimePicker: false

        });
    };

    var initSelect2 = function () {
        $("#selectUser").select2({
            dir: "rtl",
            language: "fa",
            ajax: {
                url: "/admin/request/users",
                dataType: 'json',
                // delay: 250,
                data: function (params) {
                    return {
                        search: params.term,
                        type: 'public'
                    }
                },
                processResults: function (data, params) {
                    // parse the results into the format expected by Select2
                    // alter the remote JSON data, except to indicate that infinite
                    return {
                        results: JSON.parse(data.payload),
                    };
                },
                cache: true
            },
            placeholder: 'نام متقاضی را وارد کنید',
            templateResult: formatRepo,
            templateSelection: formatRepoSelection
        });

        function formatRepo(repo) {
            if (repo.loading) {
                return repo.text;
            }

            var $container;
            if(repo.avatarId != null && repo.avatarId != 0 ){

                $container =  $('<div class="kt-user-card-v2 select2-result-repository ">' +
                '<div class="kt-user-card-v2__pic select2-result-repository__avatar">' +
                '<img src="/thumbnail/app/get/' + repo.avatarId + '/200" class="m-img-rounded kt-marginless" alt="photo">' +
                '</div>' +
                '<div class="kt-user-card-v2__details select2-result-repository__meta">' +
                '<span class="kt-user-card-v2__name select2-result-repository__title">' + repo.name + '</span>' +
                '<span class="kt-user-card-v2__email">' + repo.mobile + "</span>" +
                '</div>' +
                '</div>')

            }else {

                $container =
                    $('<div class="kt-user-card-v2  select2-result-repository ">' +
                    '<div class="kt-user-card-v2__pic select2-result-repository__avatar">' +
                    '<div class="kt-badge kt-badge--xl kt-badge--success">' +
                    '<span>' + repo.name.substring(0, 1) + '</span></div>' +
                    '</div>' +
                    '<div class="kt-user-card-v2__details select2-result-repository__meta">' +
                    '<span class="kt-user-card-v2__name select2-result-repository__title">' + repo.name + '</span>' +
                    '<span  class="kt-user-card-v2__email ">' + repo.mobile + "</span>" +
                    '</div>' +
                    '</div>');
            }
            return $container;

        }

        function formatRepoSelection(repo) {
            return repo.name || repo.text;
        }
    };
    return {
        init: function () {

            formEl = $('#kt_form');
            initValidation();
            initSubmit();
            initPersianDatePickerInit();
            initSelect2();
            list();

        },
    };

}();

jQuery(document).ready(function () {
    requestNew.init();
});