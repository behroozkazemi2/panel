"use strict";

// Class definition
var KTAppUserAdd = function () {
    // Base elements
    var wizardEl;
    var formEl;
    var validator;
    var wizard;
    var avatar;

    var persianRex = {};
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
        wizard.on('beforeNext', function (wizardObj) {
            if (validator.form() !== true) {
                wizardObj.stop();  // don't go to the next step
            }
        })

        // Change event
        wizard.on('change', function (wizard) {
            KTUtil.scrollTop();
        });
    }

    var initValidation = function () {
        $.validator.addMethod("regex", function (value, element, regexpr) {
            return regexpr.test(value);
        }, "");
        $.validator.addMethod("nationalCodeCheck", function (value, element) {
            if (value == '' || value == null) {
                return true;
            }else {
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
            }
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
                position: {
                    required: true
                },
                firstName: {
                    required: true,
                    regex: persianRex.letter,
                },
                lastName: {
                    required: true,
                    regex: persianRex.letter,
                },
                nationalCode: {
                    required: false,
                    nationalCodeCheck: true,
                },
                mobile: {
                    required: true,
                    regex: /^[\u0660|\u06F0][\u0660-\u0669\u06F0-\u06F9]{10}$|0[0-9]{10}$/,
                },
                // email: {
                //    required: false,
                // 	email: true
                // }
            },

            messages: {
                // Step 1
                activeDirectoryUser: {
                    required: "شناسه را وارد نمایید."
                },
                position: {
                    required: "واحد محل خدمت را انتخاب نمایید."
                },
                firstName: {
                    required: "نام را وارد نمایید.",
                    regex: "فقط از حروف فارسی استفاده کنید."
                },
                lastName: {
                    required: "نام‌خانوادگی را وارد نمایید.",
                    regex: "فقط از حروف فارسی استفاده کنید."
                },
                nationalCode: {
                    nationalCodeCheck: "کدملی صحیح نمی باشد",
                    maxLength: "کد ملی ۱۰ رقم می باشد"
                },
                mobile: {
                    required: "شماره تلفن همراه را وارد نمایید.",
                    regex: "شماره موبایل را درست وارد کنید.",
                },
                // email: {
                //     email: "ایمیل را به درستی وارد نمایید"
                // }
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
        var btn = formEl.find('[data-ktwizard-type="action-submit"]');

        btn.on('click', function (e) {
            e.preventDefault();

            if (validator.form()) {
                // See: src\js\framework\base\app.js
                KTApp.progress(btn);
                //KTApp.block(formEl);

                // See: http://malsup.com/jquery/form/#ajaxSubmit
                formEl.ajaxSubmit({
                    url: '/admin/user/save',
                    type: 'post',
                    success: function (response) {
                        KTApp.unprogress(btn);
                        //KTApp.unblock(formEl);

                        if (response.result) {

                            swal.fire({
                                "title": "",
                                "text": "ثبت با موفقیت انجام شد.",
                                "type": "success",
                                "confirmButtonClass": "btn btn-secondary"
                            }).then(function (result) {
                                if (result.value) {
                                    window.location.replace("/admin/user");
                                }});

                        } else {

                            swal.fire({
                                "title": "",
                                "text": response.payload,
                                "type": "error",
                                "confirmButtonClass": "btn btn-warning"
                            });

                        }


                    }
                });
            }
        });
    };

    var initKTAppsUserAdd = function () {
        avatar = new KTAvatar('kt_apps_user_add_avatar');
    };

    var convertPersianNumber = function (input) {

        input.on('keyup', function () {
            if ($(this).val() != null && $(this).val() != '') {
                var enNumber = persianJs($(this).val()).persianNumber().toString();
                $(this).val(enNumber);
            }
        });

    };


    return {
        // public functions
        init: function () {
            formEl = $('#kt_apps_user_add_user_form');

            initWizard();
            initValidation();
            initSubmit();
            initKTAppsUserAdd();
            convertPersianNumber($('.checkNumber'));

        }
    };
}();

jQuery(document).ready(function () {
    KTAppUserAdd.init();
});