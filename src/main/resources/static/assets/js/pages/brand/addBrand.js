"use strict";

// Class definition
let addBrand = function () {
    // Base elements
    let formEl;
    let validator;
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
                category: {
                    required: true
                },

            },
            messages: {
                // Step 1
                categoryId: {
                    required: "نام دسته بندی را وارد کنید"
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
            console.log(formEl.serializeArray());

            if (validator.form()) {
                // See: src\js\framework\base\app.js
                KTApp.progress(btn);
                // See: http://malsup.com/jquery/form/#ajaxSubmit
                formEl.ajaxSubmit({
                    url: '/admin/brand/save',
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
                                    window.location.replace("/admin/brand");
                            });
                        } else {
                            swal.fire({
                                "title": "",
                                "text": "خطا",
                                "type": "error",
                                "confirmButtonClass": "btn btn-warning"
                            });
                        }
                    }
                });
            }
        });
    };
    return {
        // public functions
        init: function () {
            formEl = $('#form-brand');
            initValidation();
            initSubmit();
        }
    };
}();
jQuery(document).ready(function () {
    addBrand.init();
});