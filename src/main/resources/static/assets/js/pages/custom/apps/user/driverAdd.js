"use strict";

// Class definition
var KTAppUserAdd = function () {
    // Base elements
    var wizardEl;
    var formEl;
    var validator;
    var wizard;
    var avatar;

    var persianRex={};
    var numberRange = '[\u06F0-\u06F9]';
    var charRange = ['[\\s,\u06A9\u06AF\u06C0\u06CC\u060C',
        '\u062A\u062B\u062C\u062D\u062E\u062F',
        '\u063A\u064A\u064B\u064C\u064D\u064E',
        '\u064F\u067E\u0670\u0686\u0698\u200C',
        '\u0621-\u0629\u0630-\u0639\u0641-\u0654]'].join();
    persianRex.number = new RegExp('^' + numberRange + '+$');
    persianRex.letter = new RegExp('^' + charRange + '+$');

    // Private functions
    var initWizard = function () {
        // Initialize form wizard
        wizard = new KTWizard('kt_apps_user_add_user', {
            startStep: 1
        });

        // Validation before going to next page
        wizard.on('beforeNext', function(wizardObj) {
            if (validator.form() !== true) {
                wizardObj.stop();  // don't go to the next step
            }
        })

        // Change event
        wizard.on('change', function(wizard) {
            KTUtil.scrollTop();
        });
    }

    var initValidation = function() {
        $.validator.addMethod("regex", function(value, element, regexpr) {
            return regexpr.test(value);
        }, "");
        $.validator.addMethod("nationalCodeCheck", function(value, element) {

            if(value== '' || value == undefined){
                return true
            }
            var codeMelli = persianJs(value).persianNumber().toString();
            switch (codeMelli) {
                case '0000000000':
                case '1111111111':
                case '2222222222':
                case '3333333333':
                case '4444444444':
                case '5555555555':
                case '6666666666':
                case '7777777777':
                case '8888888888':
                case '9999999999':
                    return false;
            }
            var c = parseInt(codeMelli.charAt(9));
            var sum = parseInt(codeMelli.charAt(0)) * 10 +
                parseInt(codeMelli.charAt(1)) * 9 +
                parseInt(codeMelli.charAt(2)) * 8 +
                parseInt(codeMelli.charAt(3)) * 7 +
                parseInt(codeMelli.charAt(4)) * 6 +
                parseInt(codeMelli.charAt(5)) * 5 +
                parseInt(codeMelli.charAt(6)) * 4 +
                parseInt(codeMelli.charAt(7)) * 3 +
                parseInt(codeMelli.charAt(8)) * 2;
            var r = sum - parseInt(sum / 11) * 11;
            return (r == 0 && r == c) || (r == 1 && c == 1) || (r > 1 && c == 11 - r);


        }, "");
        validator = formEl.validate({
            // Validate only visible fields
            ignore: ":hidden",

            // Validation rules
            rules: {
                // Step 1
                activeDirectoryUser: {
                    required: true
                },
                unitId: {
                    required: true
                },
                firstName: {
                    required: true,
                    regex : persianRex.letter,
                },
                lastName: {
                    required: true,
                    regex : persianRex.letter,
                },
                nationalCode: {
                    required: false,
                    nationalCodeCheck: true,
                },
                mobile: {
                    required: true,
                    regex: /^[\u0660|\u06F0][\u0660-\u0669\u06F0-\u06F9]{10}$|0[0-9]{10}$/,
                },
                'plate.cityNumber': {
                    required: true,
                    minlength:2
                },
                'plate.second': {
                    required: true,
                    minlength:2
                },
                'plate.character': {
                    required: true
                },
                'plate.first': {
                    required: true,
                    minlength:2
                }
            },

            messages: {
                // Step 1
                activeDirectoryUser: {
                    required: "شناسه را وارد نمایید."
                },
                unitId: {
                    required: "واحد محل خدمت را انتخاب نمایید."
                },
                firstName: {
                    required: "نام را وارد نمایید.",
                    regex:"فقط از حروف فارسی استفاده کنید."
                },
                lastName: {
                    required: "نام‌خانوادگی را وارد نمایید.",
                    regex:"فقط از حروف فارسی استفاده کنید."
                },
                nationalCode : {
                    required: "کد‌ملی را وارد نمایید.",
                    nationalCodeCheck:"کدملی صحیح نمی باشد",
                    maxLength:"کد ملی ۱۰ رقم می باشد"
                },
                mobile: {
                    required: "شماره تلفن همراه را وارد نمایید.",
                    regex:"شماره موبایل را درست وارد کنید.",
                },
                'plate.cityNumber': {
                    required: "الزامی",
                    minlength:"درست وارد کنید."
                },
                'plate.second': {
                    required: "الزامی",
                    minlength:"درست وارد کنید."
                },
                'plate.character': {
                    required: "الزامی"
                },
                'plate.first': {
                    required: "الزامی",
                    minlength:"درست وارد کنید."
                }
            },

            // Display error
            invalidHandler: function(event, validator) {
                KTUtil.scrollTop();
            },

            // Submit valid form
            submitHandler: function (form) {
            }
        });
    };

    var initSubmit = function() {
        var btn = formEl.find('[data-ktwizard-type="action-submit"]');

        btn.on('click', function(e) {
            e.preventDefault();

            if (validator.form()) {
                // See: src\js\framework\base\app.js
                KTApp.progress(btn);
                // See: http://malsup.com/jquery/form/#ajaxSubmit
                formEl.ajaxSubmit({
                    url: '/admin/driver/save',
                    type: 'post',
                    success: function(response) {
                        KTApp.unprogress(btn);
                        //KTApp.unblock(formEl);
                        if (response.result) {

                            swal.fire({
                                "title": "عملیات موفق!",
                                "text": "راننده جدید با موفقیت ثبت شد",
                                "type": "success",
                                "confirmButtonClass": "btn btn-secondary",
                                "confirmButtonText": "تایید"
                            }).then(function (result) {
                                        window.location.replace("/admin/driver");
                        });

                        }else {

                            swal.fire({
                                "title": "عملیات ناموفق!",
                                "text": response.payload,
                                "type": "error",
                                "confirmButtonClass": "btn btn-warning",
                                "confirmButtonText": "تایید"
                            });

                        }
                    },
                    error: function() {
                        KTApp.unprogress(btn);
                        swal.fire({
                            "title": "عملیات ناموفق!",
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

    var initKTAppsUserAdd = function() {
        avatar = new KTAvatar('kt_apps_user_add_user_avatar');
    };

    var convertPersianNumber = function (input) {

        input.on('keyup', function() {
            if ($(this).val() != null && $(this).val() != ''){
                var enNumber = persianJs($(this).val()).persianNumber().toString();
                $(this).val(enNumber);
            }
        });

    };
    var persianDatePickerInit = function () {
        $('#expireDate').MdPersianDateTimePicker({
            targetTextSelector: '#certificateExpireDate',
            enableTimePicker: false

        });
        $('#personInsuranceStartDate').MdPersianDateTimePicker({
            targetTextSelector: '#personInsuranceStarTimeStamp',
            enableTimePicker: false

        });
        $('#personInsuranceEndDate').MdPersianDateTimePicker({
            targetTextSelector: '#personInsuranceEndTimeStamp',
            enableTimePicker: false

        });


        $('#bodyInsuranceStartDate').MdPersianDateTimePicker({
            targetTextSelector: '#bodyInsuranceStartTimeStamp',
            enableTimePicker: false

        });
        $('#bodyInsuranceEndDate').MdPersianDateTimePicker({
            targetTextSelector: '#bodyInsuranceEndTimeStamp',
            enableTimePicker: false

        });

        $('#roadInsuranceStartDate').MdPersianDateTimePicker({
            targetTextSelector: '#roadInsuranceStartTimeStamp',
            enableTimePicker: false

        });
        $('#roadInsuranceEndDate').MdPersianDateTimePicker({
            targetTextSelector: '#roadInsuranceEndTimeStamp',
            enableTimePicker: false

        });

        $('#technicalStartDate').MdPersianDateTimePicker({
            targetTextSelector: '#technicalStartTimeStamp',
            enableTimePicker: false

        });
        $('#technicalEndDate').MdPersianDateTimePicker({
            targetTextSelector: '#technicalEndTimeStamp',
            enableTimePicker: false

        });
    };

    return {
        // public functions
        init: function() {
            formEl = $('#kt_apps_user_add_user_form');
            initWizard();
            initValidation();
            initSubmit();
            initKTAppsUserAdd();
            persianDatePickerInit();
            convertPersianNumber($('.checkNumber'));
        }
    };
}();

jQuery(document).ready(function() {
    KTAppUserAdd.init();
});