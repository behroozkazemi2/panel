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
        $('.pp-select2').select2({
            placeholder: "جستجوی نوع محصول... ",
            allowClear: false,
            ajax: {
                url: '/admin/promoteProduct/allProductProvider',
                type: 'post',
                delay: 250,
                data: function (params) {
                    return {
                        search: params.term, // search term
                    };
                },
                processResults: function (response, params) {
                    let jsonResponse = JSON.parse(response.data);
                    params.page = params.pageconsole || 1;
                    return {
                        results: jsonResponse.data,
                        pagination: 6
                    };
                },
            },
            escapeMarkup: function (markup) {
                return markup;
            }, // let our custom formatter work
            templateResult: formatConfigCategoryRepo, // omitted for brevity, see the source of this page
        });
        $(".pp-select2").on('select2:select', function (selection) {
            let name = selection.params.data.product.name + "( " + selection.params.data.provider.name + " )";

            var newOption = new Option(name, selection.params.data.id, true, true);
            $('.pp-select2').append(newOption).trigger('change');
        });

        if ($('#products').val() != null && $('#products').val() != "" ){
            let products = JSON.parse($('#products').val());
            products.forEach( item => {
                let name = item.name;
                var newOption = new Option(name, item.id, true, true);
                $('.pp-select2').append(newOption).trigger('change');
            });
        }

        $(".pp-select2").val($('#productProviderIds').val());
        function formatConfigCategoryRepo(repo) {
            let flag = repo.exist;
            return (!flag ? '' :
                '<div class="kt-widget14__legends">' +
                    '<div class="row col-12">' +
                        '<div class="kt-widget14__legend col-1">' +
                        '<img style="max-height: 100px;max-width: 150px" src="/thumbnail/files/0/' + repo.image + '" >' +
                        '</div>' +
                        '<div class="col-11 row ">' +
                            '<div class="col-3">' +
                                '<div class="kt-widget14__legend ">' +
                                '    <span class="kt-widget14__bullet " style="font-weight: bolder !important;"> نام محصول: </span>' +
                                '    <span class="kt-widget14__stats">' + repo.product.name + '</span>' +
                                '</div>' +
                                '<div class="kt-widget14__legend ">' +
                                '    <span class="kt-widget14__bullet" style="font-weight: bolder !important;"> نام تامین‌کننده: </span>' +
                                '    <span class="kt-widget14__stats">' + repo.provider.name + '</span>' +
                                '</div>' +
                                '<div class="kt-widget14__legend ">' +
                                '    <span class="kt-widget14__bullet" style="font-weight: bolder !important;">  برند: </span>' +
                                '    <span class="kt-widget14__stats">' + repo.brand + '</span>' +
                                '</div>' +
                                '<div class="kt-widget14__legend">' +
                                '    <span class="kt-widget14__bullet" style="font-weight: bolder !important;"> دسته بندی : </span>' +
                                '    <span class="kt-widget14__stats">' + repo.category + '</span>' +
                                '</div>' +
                             '</div>' +
                            '<div class="col-9 ">' +
                                '<div class="kt-widget14__legend mt-4">' +
                                '    <span class="kt-widget14__bullet"> قیمت اولیه  : </span>' +
                                '    <span class="kt-widget14__stats">' + formatMoney(repo.primitiveAmount) + '</span>' +
                                '</div>' +
                                '<div class="kt-widget14__legend">' +
                                '    <span class="kt-widget14__bullet">درصد تخفیف: </span>' +
                                '    <span class="kt-widget14__stats">' + (repo.discountPercent) + '</span>' +
                                '</div>' +
                                '<div class="kt-widget14__legend">' +
                                '    <span class="kt-widget14__bullet">قیمت نهایی: </span>' +
                                '    <span class="kt-widget14__stats">' + formatMoney(repo.finalAmount) + '</span>' +
                                '</div>' +
                            '</div>' +
                        '</div>' +
                    '</div>' +
                '</div>');

        };


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
                name: {
                    required: true,
                },
                startDate: {
                    required: true,
                },
                endDate: {
                    required: true,
                    number: true

                },
                productProvider: {
                    required: true,
                    number: true

                },
            },
            messages: {
                // Step 1
                name: {
                    required: " نام رویداد را وارد کنید",
                },
                startDate: {
                    required: " تاریخ شروع رویداد را وارد کنید",
                },
                endDate: {
                    required: " تاریخ پایان رویداد را وارد کنید",
                },
                promoteProduct: {
                    required: "حداقل یک محصول را انتخاب نمایید",
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
            if (validator.form()) {
                let data = formEl.serializeArray();

                let startDate = new Date($('#startTimeStampDate').val());
                let endDate = new Date($('#endTimeStampDate').val());

                let startTime = $('#startTime').val().split(':')
                startDate.setHours(startTime[0]);
                startDate.setMinutes(startTime[1]);


                let endTime = $('#endTime').val().split(':')
                endDate.setHours(endTime[0]);
                endDate.setMinutes(endTime[1]);


                for (let i=0; i<data.length; i += 1) {
                    if (data[i].name === "startDate") {
                        data[i].value = startDate;
                    }
                    if (data[i].name === "endDate"){
                        data[i].value = endDate;
                    }
                }
                $.ajax({
                    url: '/admin/promoteProduct/save',
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
                                    window.location.replace("/admin/promoteProduct");
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
    let initTimePickerDate = function () {

        $('#startDate').MdPersianDateTimePicker({
            targetTextSelector: '#startTimeStamp',
            targetDateSelector: '#startTimeStampDate',
            enableTimePicker: false,
        });
        // var parts = $('#date').data('from');
        // var pattern = /(\d{2})\.(\d{2})\.(\d{4})/;
        // if (parts) {
        //     var dt = new Date(parts.replace(pattern, '$3-$2-$1'));
        //
        //     $('#startDate').MdPersianDateTimePicker('setDate', new Date(dt));
        //     $('#show-mode-start').text(new Date(dt).toLocaleDateString('fa-IR'));
        // }

        $('#endDate').MdPersianDateTimePicker({
            targetTextSelector: '#endTimeStamp',
            targetDateSelector: '#endTimeStampDate',
            enableTimePicker: false,
        });
        // parts = $('#date').data('to');
        // pattern = /(\d{2})\.(\d{2})\.(\d{4})/;
        //
        // if (parts) {
        //     var dt = new Date(parts.replace(pattern, '$3-$2-$1'));
        //     $('#endDate').MdPersianDateTimePicker('setDate', new Date(dt));
        //     $('#show-mode-end').text(new Date(dt).toLocaleDateString('fa-IR'));
        // }


        $(".timepicker-24").timepicker({
            autoclose: !0,
            minuteStep: 30,
            showSeconds: !1,
            showMeridian: !1
        })
    };

    return {
        // public functions
        init: function () {
            formEl = $('.form-promote-product');
            initValidation();
            initSubmit();
            select2Change();
            initTimePickerDate();
        }
    };
}();
jQuery(document).ready(function () {
    addProductPage.init();
});