var driverDetail = function () {

    var formEl;
    var validator;


    var initValidation = function () {
        validator = formEl.validate({
            // Validate only visible fields
            ignore: ":hidden",

            // Validation rules
            rules: {
                // Step 1
                driver: {
                    required: true
                },
                number: {
                    required: true
                },
                startDate: {
                    required: true,
                },
                endDate: {
                    required: true,
                },
                paymentMonthly: {
                    required: true,
                },
                paymentExtraHour: {
                    required: true,
                },
                paymentKilometer: {
                    required: true,
                },
                paymentDayInPlace: {
                    required: true,
                },

            },

            messages: {
                // Step 1
                driver: {
                    required: "راننده را انتخاب نمایید."
                },
                number: {
                    required: "شماره قرارداد را وارد نمایید.."
                },
                startDate: {
                    required: "زمان شروع را وارد نمایید.",
                },
                endDate: {
                    required: "زمان پایان را وارد نمایید.",
                },
                paymentMonthly: {
                    required: "مبلغ کارکرد ماهانه را وارد نمایید.",
                },
                paymentExtraHour: {
                    required: "مبلغ یک ساعت اضافه کاری را وارد نمایید.",
                },
                paymentKilometer: {
                    required: "مبلغ هر کیلومتر مسافت طی شده را وارد نمایید.",
                },
                paymentDayInPlace: {
                    required: "مبلغ یک شب خواب در محل را وارد نمایید.",
                },

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
                    url: '/driver/saveDetail',
                    type: 'post',
                    success: function (response) {
                        KTApp.unprogress(btn);

                        if (response.result) {


                            swal.fire({
                                "title": "عملیات موفق!",
                                "text": "ویرایش با موفقیت ثبت شد",
                                "type": "success",
                                "confirmButtonClass": "btn btn-secondary",
                                "confirmButtonText": "تایید"
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
        $('#expireDrivingLicenceDate').MdPersianDateTimePicker({
            targetTextSelector: '#expireDrivingLicenceTimeStamp',
            textFormat: 'yyyy/MM/dd',
            targetDateSelector: '#expireDrivingLicenceTimeStampDate',
            enableTimePicker: false
        });
        $('#expireTechnicalLicenceDate').MdPersianDateTimePicker({
            targetTextSelector: '#expireTechnicalLicenceTimeStamp',
            textFormat: 'yyyy/MM/dd',
            targetDateSelector: '#expireTechnicalLicenceTimeStampDate',
            enableTimePicker: false
        });
        $('#expirePersonalInsuranceLicenceDate').MdPersianDateTimePicker({
            targetTextSelector: '#expirePersonalInsuranceLicenceTimeStamp',
            textFormat: 'yyyy/MM/dd',
            targetDateSelector: '#expirePersonalInsuranceLicenceTimeStampDate',
            enableTimePicker: false
        });
        $('#expireBodyInsuranceLicenceDate').MdPersianDateTimePicker({
            targetTextSelector: '#expireBodyInsuranceLicenceTimeStamp',
            textFormat: 'yyyy/MM/dd',
            targetDateSelector: '#expireBodyInsuranceLicenceTimeStampDate',
            enableTimePicker: false
        });
        $('#expireRoadInsuranceDate').MdPersianDateTimePicker({
            targetTextSelector: '#expireRoadInsuranceTimeStamp',
            textFormat: 'yyyy/MM/dd',
            targetDateSelector: '#expireRoadInsuranceTimeStampDate',
            enableTimePicker: false
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
    driverDetail.init();
});