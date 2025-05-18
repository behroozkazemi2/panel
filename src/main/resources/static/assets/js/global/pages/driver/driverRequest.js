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
                origin: {
                    required: true
                },
                userId: {
                    required: true
                },
                destination: {
                    required: true
                },
                startTimeStamp: {
                    required: true
                },
                endTimeStamp: {
                    required: true
                }
            },

            messages: {
                // Step 1
                title: {
                    required: "موضوع را وارد نمایید."
                },
                origin: {
                    required: "مبدا را وارد نمایید."
                },
                userId: {
                    required: "اظلاعات متقاضی را وارد نمایید."
                },
                destination: {
                    required: "مقصد را وارد نمایید."
                },
                startTimeStamp: {
                    required: "تاریخ شروع را وارد نمایید."
                },
                endTimeStamp: {
                    required: "تاریخ پایان را وارد نمایید."
                }

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
                    url: '/driver/request/save',
                    type: 'post',
                    success: function (response) {
                        KTApp.unprogress(btn);
                        //KTApp.unblock(formEl);

                        if (response.result) {

                            swal.fire({
                                "title": "",
                                "text": "ثبت با موفقیت انجام شد.",
                                "type": "success",
                                "confirmButtonClass": "btn btn-secondary",
                                "confirmButtonText": "تایید"
                            }).then(function (result) {
                                    window.location.replace("/");
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
        $('#startTime').timepicker({
            minuteStep: 5,
            defaultTime: 'value',
            showSeconds: false,
            showMeridian: false,
        });
        $('#endTime').timepicker({
            minuteStep: 5,
            defaultTime: 'value',
            showSeconds: false,
            showMeridian: false,
        });

        $('[name=startDate], [name=endDate]').on('change',function () {
            if($('[name=startDate]').val()&&$('[name=endDate]').val()){
                var days = Math.round((new Date($('[name=endDate]').val())-new Date($('[name=startDate]').val()))/(1000*60*60*24));
                if(days<0){
                    swal.fire({
                        "title": "خطا در ورود اطلاعات",
                        "text": "تاریخ پایان نمی تواند قبل از تاریخ شروع باشد.",
                        "type": "error",
                        "confirmButtonClass": "btn btn-warning",
                        "confirmButtonText": "تایید"
                    });
                    $('[name=nightSleep]').val(0);
                }else {
                    $('[name=nightSleep]').val(days);
                }
            }
        });
    };

    var initSelect2 = function () {
        $("#selectUser").select2({
            dir: "rtl",
            language: "fa",
            ajax: {
                url: "/driver/users",
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

        },
    };

}();

jQuery(document).ready(function () {
    requestNew.init();
});