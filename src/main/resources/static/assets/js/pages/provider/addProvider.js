"use strict";

// Class definition
let addProviderPage = function () {
    // Base elements
    let formEl;

    let categories;
    let providers;
    let regions;
    let validator;
    let avatar;
    let persianRex = {};
    let numberRange = '[\u06F0-\u06F9]';
    let charRange = ['[\\s,\u06A9\u06AF\u06C0\u06CC\u060C',
        '\u062A\u062B\u062C\u062D\u062E\u062F',
        '\u063A\u064A\u064B\u064C\u064D\u064E',
        '\u064F\u067E\u0670\u0686\u0698\u200C',
        '\u0621-\u0629\u0630-\u0639\u0641-\u0654]'].join();
    persianRex.number = new RegExp('^' + numberRange + '+$');
    persianRex.letter = new RegExp('^' + charRange + '+$');
    let inputStyle = function () {
        $('.kt-select2').select2({
            placeholder: "انتخاب"
        });
        $('.kt_touchspin_minDay').TouchSpin({
            buttondown_class: 'btn btn-secondary',
            buttonup_class: 'btn btn-secondary',
            min: 0,
            max: 999,
            maxboostedstep: 999,
            postfix: 'روز'
        });
        //
    };
    // Private functions
    $.validator.addMethod("regex", function (value, element, regexpr) {
        return regexpr.test(value);
    }, "");
    let initValidation = function () {
        validator = formEl.validate({
            // Validate only visible fields
            ignore: ":hidden",

            // Validation rules
            rules: {
                // Step 1
                logoId: {
                    required: true,
                },
                categoryId: {
                    required: true
                },
                shortDescription: {
                    required: true,

                },
                address: {
                    required: true,

                },
                name: {
                    required: true,

                },
                fullDescription: {
                    required: true,

                },
                minDay: {
                    required: true,
                    number: true
                },
                phone: {
                    required: true,
                    number: true

                },
                instagramId: {
                    required: true
                },
                telegramId: {
                    required: true
                },
                region: {
                    required: true
                },
                // email: {
                //    required: false,
                // 	email: true
                // }
            },

            messages: {
                // Step 1
                logoId: {
                    required: "لگو تامین کننده را وارد کنید"
                },
                categoryId: {
                    required: "دسته بندی تامین کننده را انتخاب کنید کنید"
                },
                fullDescription: {
                    required: "توضیح کامل را وارد کنید",

                },
                shortDescription: {
                    required: "توضیح مختصر را وارد کنید",

                },
                name: {
                    required: "نام تامین کننده را وارد کنید ",


                },
                address: {
                    required: "آدرس تامین کننده را وارد کنید",

                },
                minDay: {
                    required: "حداقل زمان آماده سازی را وارد کنید",
                    number: "لطفا عدد وارد کنید"

                },
                phone: {
                    required: "شماره تماس تامین کننده را وارد کنید",
                    number: "لطفا عدد وارد کنید"

                },
                instagramId: {
                    required: "آیدی اینستاگرام را وارد کنید",
                },
                telegramId: {
                    required: "آیدی تلگرام را وارد کنید",
                },
                region: {
                    required: "منطقه را وارد کنید",
                },
                // email: {
                //     email: "ایمیل را به درستی وارد نمایید"
                // }
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
    let inputNumber = function () {
        $('.arrow-disable').on("focus", function () {
            $(this).on("keydown", function (event) {
                if (event.keyCode === 38 || event.keyCode === 40) {
                    event.preventDefault();
                }
            });
        });
    };
    let initSubmit = function () {
        $('input:radio').change(function () {
            let radioInput = $(this);
            let row = $(this).closest('tr');
            row.find('input:radio').each(function () {
                $(this).removeAttr('checked');
            });
            radioInput.attr('checked', 'checked');
        });
        let btn = formEl.find('[data-ktwizard-type="action-submit"]');
        btn.on('click', function (e) {
            e.preventDefault();
            if (validator.form()) {
                // See: src\js\framework\base\app.js
                KTApp.progress(btn);
                //KTApp.block(formEl);

                $('#locationString').val(JSON.stringify(polygonPoints));
                if (polygonPoints.length == 0) {
                    swal.fire({
                        "title": "خطا",
                        "text": "منطقه تحت پوش نامعتبر",
                        "type": "error",
                        "confirmButtonClass": "btn btn-warning"
                    });
                } else {
                    // See: http://malsup.com/jquery/form/#ajaxSubmit
                    formEl.ajaxSubmit({
                        url: '/admin/provider/save',
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
                                    window.location.replace("/admin/provider");
                                });
                            } else {
                                swal.fire({
                                    "title": "خطا",
                                    "text": response.data,
                                    "type": "error",
                                    "confirmButtonClass": "btn btn-warning"
                                });

                            }
                        },
                        complete: function () {
                            KTApp.unprogress(btn);

                        }
                    });
                }
            }
        });
    };
    let initKTAppsUserAdd = function () {
        avatar = new KTAvatar('kt_apps_user_add_avatar');

    };

    function checkPhoto() {
        $('#avatarFile').bind('change', function () {
            if (this.files[0].size > 1000141) {
                swal.fire({
                    "title": "خطا",
                    "text": "حجم عکس نباید بیشتر از 1MB باشد",
                    "type": "error",
                    "confirmButtonClass": "btn btn-warning"
                });
            }
        });
    }

    let initMapAndLocations = function () {
        let locInput = $('.latlon');
        let points = JSON.parse($('#locationString').val());
        initAddressMap('kt_location', points);
    }


    let clearMapClickAction = function () {
        $('#clear_map').on('click', function () {
            clearMap();
        });
    }
    return {
        // public functions
        init: function () {
            formEl = $('#form-provider');
            // getAllRgCatPro();
            inputNumber();
            checkPhoto();
            initValidation();
            initSubmit();
            initKTAppsUserAdd();
            // convertPersianNumber($('.checkNumber'));
            inputStyle();

            initMapAndLocations();
            clearMapClickAction();
        }
    };
}();

jQuery(document).ready(function () {
    addProviderPage.init();
});