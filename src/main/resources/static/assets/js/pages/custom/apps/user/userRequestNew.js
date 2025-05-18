var requestNew = function () {

    var formEl;
    var validator;

    var initValidation = function () {
        validator = formEl.validate({
            // Validate only visible fields
            ignore: ":hidden",

            // Validation rules
            rules: {
                title: {
                    required: true
                },
                origin: {
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
                    required: "مبدا را وارد نمایید.."
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
                    url: '/admin/user/request/save',
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
                                if (result.value) {
                                    window.location.replace("/admin/user/travels");
                                }});

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


    return {
        init: function () {

            formEl = $('#kt_form');
            initValidation();
            initSubmit();
            initPersianDatePickerInit();

        },
    };

}();

jQuery(document).ready(function () {
    requestNew.init();
});