"use strict";
// Class definition
let addProductPage = function () {
    let formEl;
    let validator;
    let myFilesImage = [];
    let uploadedImagesId = [];
    let persianRex = {};
    let numberRange = '[\u06F0-\u06F9]';
    let charRange = ['[\\s,\u06A9\u06AF\u06C0\u06CC\u060C',
        '\u062A\u062B\u062C\u062D\u062E\u062F',
        '\u063A\u064A\u064B\u064C\u064D\u064E',
        '\u064F\u067E\u0670\u0686\u0698\u200C',
        '\u0621-\u0629\u0630-\u0639\u0641-\u0654]'].join();
    let productFeature = [];
    persianRex.number = new RegExp('^' + numberRange + '+$');
    persianRex.letter = new RegExp('^' + charRange + '+$');
    // Private functions
    let select2Change = function () {
        $('.category-list').on('change', function () {
            getTagList($(this).children("option:selected").val());
            initFeature($(this).children("option:selected").val());
        });

        $('.kt-select2').select2({
            placeholder: "انتخاب"
        });

        $('.kt_touchspin').TouchSpin({
            buttondown_class: 'btn btn-secondary',
            buttonup_class: 'btn btn-secondary',

            min: 0,
            max: 1000000000,
            stepinterval: 1000,
            maxboostedstep: 10000000,
            postfix: 'ریال'
        });

        $('.kt_touchspin_off').TouchSpin({
            buttondown_class: 'btn btn-secondary',
            buttonup_class: 'btn btn-secondary',

            min: 0,
            max: 100,
            stepinterval: 1,
            maxboostedstep: 100,
            postfix: 'درصد'
        });
        $('.kt_touchspin_hour').TouchSpin({
            buttondown_class: 'btn btn-secondary',
            buttonup_class: 'btn btn-secondary',

            min: 1,
            max: 99999,
            stepinterval: 1,
            maxboostedstep: 999,
            postfix: 'ساعت'
        });

        $('.kt_touchspin_float').TouchSpin({
            buttondown_class: 'btn btn-secondary',
            buttonup_class: 'btn btn-secondary',
            min: 1,
            max: 100000,
            step: 1,
            decimals: 0,
            boostat: 5,
            maxboostedstep: 10,
        });

        $('.kt_touchspin_order').TouchSpin({
            buttondown_class: 'btn btn-secondary',
            buttonup_class: 'btn btn-secondary',
            postfix: 'اولویت',

            min: 0,
            max: 100000,
            step: 1,
            boostat: 5,
            maxboostedstep: 10,
        });


    };
    let initValidation = function () {
        $.validator.addMethod("regex", function (value, element, regexpr) {
            return regexpr.test(value);
        }, "");
        validator = formEl.validate({
            // Validate only visible fields
            ignore: ":hidden",
            // Validation rules
            rules: {
                prepareHour: {
                    required: false,
                    number: true

                },
                providerId: {
                    required: true,
                },
                productId: {
                    required: true,
                },
                showOrder: {
                    required: false,
                    number: true

                },
                productCount: {
                    required: false,
                    number: true

                },
                maxAllow: {
                    required: true,
                    number: true

                },
                minAllow: {
                    required: true,
                    number: true

                },
                offPercent: {
                    required: false,
                    number: true,
                    range: [0, 100]

                },
                amount: {
                    required: true,
                    number: true

                },
                primitiveAmount: {
                    required: true,
                    number: true

                },
            },
            messages: {
                // Step 1
                showOrder: {
                    required: "اولویت نمایش  محصول  را وارد کنید",
                    number: "لطفا عدد وارد کنید"
                },
                provider: {
                    required: "تامین‌کننده محصول  را وارد کنید",
                },
                product: {
                    required: "تعداد کالا  را وارد کنید",
                },
                productCount: {
                    required: "محصول  را وارد کنید",
                },
                prepareHour: {
                    required: "حداقل زمان آماده سازی را وارد کنید",
                    number: "لطفا عدد وارد کنید"
                },
                maxAllow: {
                    required: "حداکثر واحد آماده سازی را وارد کنید",
                    number: "لطفا عدد وارد کنید"

                },
                offPercent: {
                    required: "درصد تخفیف را وارد کنید",
                    number: "لطفا عدد وارد کنید"

                },
                minAllow: {
                    required: "حداقل واحد آماده سازی را وارد کنید",
                    number: "لطفا عدد وارد کنید"

                },
                amount: {
                    required: "قیمت محصول را وارد کنید ",
                    number: "لطفا عدد وارد کنید"

                },
                primitiveAmount: {
                    required: "قیمت محصول را وارد کنید ",
                    number: "لطفا عدد وارد کنید"

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
                let data = formEl.serializeArray();
                $.ajax({
                    url: '/admin/productProvider/save',
                    type: 'post',
                    data: data,
                    beforeSend: function () {
                        KTApp.progress(btn);
                        // KTApp.block(formEl);
                    },
                    success: function (response) {
                        KTApp.unprogress(btn);
                        // KTApp.unblock(formEl);
                        if (response.result) {
                            swal.fire({
                                "title": "ثبت",
                                "text": "ثبت با موفقیت انجام شد.",
                                "type": "success",
                                "confirmButtonClass": "btn btn-secondary"
                            }).then(function (result) {
                                    window.location.replace("/admin/productProvider/0");
                            });

                        } else {
                            swal.fire({
                                "title": "خطا",
                                "text": response.data,
                                "type": "error",
                                "confirmButtonClass": "btn btn-warning"
                            });
                        }
                    }
                });
            }
        });
    };
    let calculatorPrice = function () {
        $('.change-on-key-up').on('change', function () {
            let prePrice = $('.form-product-primitiveAmount').val();
            let prePercent = $('.form-product-offPercent').val();
            $('.form-product-offPrice').val(formatMoney((prePrice * prePercent) / 100));
            $('.form-product-finalAmount').val(formatMoney(prePrice - ((prePrice * prePercent) / 100)));

        })
    };

    return {
        // public functions
        init: function () {
            formEl = $('.form-product-provider');
            initValidation();
            initSubmit();
            select2Change();
            calculatorPrice();

        }
    };
}();
jQuery(document).ready(function () {
    addProductPage.init();
});