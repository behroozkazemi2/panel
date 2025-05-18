"use strict";
// Class definition

let KTDatatableUnit = function () {
    // Private functions
    let validator;
    let persianRex = {};
    let formEl;
    let status = 1;
    let switch_checked = 0;
    let numberRange = '[\u06F0-\u06F9]';
    let charRange = ['[\\s,\u06A9\u06AF\u06C0\u06CC\u060C',
        '\u062A\u062B\u062C\u062D\u062E\u062F',
        '\u063A\u064A\u064B\u064C\u064D\u064E',
        '\u064F\u067E\u0670\u0686\u0698\u200C',
        '\u0621-\u0629\u0630-\u0639\u0641-\u0654]'].join();
    let productFeature = [];
    persianRex.number = new RegExp('^' + numberRange + '+$');
    persianRex.letter = new RegExp('^' + charRange + '+$');
    let modal = $('#kt_modal_remote');
    // basic
    let specialOrderDatatable = function () {
        let datatable = $('.kt-datatable').KTDatatable({
            // datasource definition
            data: {
                type: 'remote',
                source: {
                    read: {
                        url: 'dashboard/specialProduct',
                        headers: {'x-my-custokt-header': 'some value', 'x-test-header': 'the value'},
                        map: function (raw) {
                            // sample data mapping
                            let dataSet = raw;
                            if (typeof raw.data !== 'undefined') {
                                dataSet = raw.data;

                            }
                            return dataSet;
                        },
                        error: function () {
                            swal.fire({
                                "title": "خطا در ارتباط با سرور",
                                "text": "خطا در برقراری ارتباط با سرور، لطفا مجدد تلاش نمایید.",
                                "type": "error",
                                "confirmButtonClass": "btn btn-warning",
                                "confirmButtonText": "باشه"
                            });
                        }
                    },
                },
                pageSize: 10,
                serverPaging: true,
                serverFiltering: true,
                serverSorting: true
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
                delay: 300
            },

            // columns definition
            columns: [
                {
                    field: 'provider&insertDate',
                    title: 'تامین‌کننده/تاریخ ثبت ',
                    sortable: false,
                    textAlign: 'center',
                    template: function (row) {
                        // let date = new persianDate(row.insertDate).format("D  MMMM YYYY");
                        return '<span>' + (row.provider.name ? ' ' + row.provider.name + ' ' : ' بهترین پیشنهاد ') + '</span>' +
                            (row.insertDate != null ? '<p>' + timeStampToYearMonthDayHourLRT(row.insertDate) + '</p>' : '<p>ثبت نشده</p>');

                    },
                },
                {
                    field: 'category&region',
                    title: 'دسته‌بندی/منطقه',
                    sortable: false,
                    textAlign: 'center',
                    template: function (row) {
                        return '<span>' + row.category.name + '</span>' +
                            '<p>' + row.region.name + '</p>';
                    }
                },
                {
                    field: 'status',
                    title: 'وضعیت',
                    sortable: false,
                    textAlign: 'center',
                    template: function (row) {
                        return '<span>' + row.status.name + '</span>';
                    }
                },
                (($('#user-supervisor').val()) === 'false' ? {

                        field: 'suggestedAmount',
                        title: 'قیمت پیشنهادی',
                        sortable: false,
                        textAlign: 'center',

                        template: function (row) {
                            return (row.status.id === 4 ? "<span class=' Check' style='color: rgba(202,61,47,0.88)' data-id='" + row.id + "'> پیشنهاد رد شده است</span>"
                                : (row.suggestionAmount === 0 ? "<span class=' Check' style='color: black' data-id='" + row.id + "'> پیشنهادی ثبت نشده است </span>"
                                    : "<span class=' Check' style=''color: #00BF00' data-id='" + row.id + "'>" + formatMoney(row.suggestionAmount) + "ریال </span>"))
                        }
                    } : {
                        field: 'suggestedAmount',
                        title: 'قیمت پیشنهادی',
                        sortable: false,
                        overflow: 'hidden',
                        "visible": false,
                        textAlign: 'center',
                        template: function (row) {

                        }
                    }
                ),
                {
                    field: 'Actions',
                    title: 'عملیات ',
                    sortable: false,
                    width: "auto",
                    overflow: 'visible',
                    textAlign: 'center',
                    template: function (row) {
                        let user_supervisor = "<button class='btn btn-outline-danger  Check' data-check-id='" + row.id + "'>بررسی </button>";
                        let user_not_supervisor;
                        user_not_supervisor = "<button class='btn  btn-outline-secondary  Check' data-check-id='" + row.id + "'> مشاهده </button>";

                        if (row.suggestionAmount === 0 && row.status.id === 1) {
                            user_not_supervisor = "<button class='btn btn-outline-brand  Check' data-check-id='" + row.id + "'> پیشنهاد </button>";
                        }
                        return ($('#user-supervisor').val() === 'true' ? user_supervisor : user_not_supervisor);
                    },
                }],
        });
        datatable.on('click', '[data-check-id]', function () {
            let rowId = $(this).data('check-id');
            openModal(rowId);
        });
    };

    function formElShowModal() {

        modal.on('shown.bs.modal', function () {
            inputStyle();

            initModal();
            calculator();
            show_image();
            initSubmit();
        }).on('hidden.bs.modal', function () {
            modal.find('.modal-content').empty();
            $(".modal-body").html("");
        });
    }

    let openModal = function (data) {

        $.ajax({
            url: 'admin/special/product/detail/' + data,
            type: 'post',
            dataType: "html",
            success: function (response) {
                if (response) {
                    // KTApp.unprogress(btn);
                    modal.find('.modal-content').empty();
                    modal.find('.modal-content').append(response);
                    modal.modal('show');
                    formEl = $('#kt_modal_remote').find($('.form-special-product-suggestion'));
                    $('#insertDate').text(timeStampToYearMonthDay($('#time').val()));
                    formElShowModal();
                } else {
                    swal.fire({
                        "title": "عملیات ناموفق!",
                        "text": "خطا در دریافت اطلاعات",
                        "type": "error",
                        "confirmButtonClass": "btn btn-warning",
                        "confirmButtonText": "تایید"
                    });

                }
            },
            error: function () {
                swal.fire({
                    "title": "عملیات ناموفق",
                    "text": "خطا در برقراری ارتباط با سرور، لطفا مجدد تلاش نمایید.",
                    "type": "error",
                    "confirmButtonClass": "btn btn-warning",
                    "confirmButtonText": "باشه"
                });
            }
        });
    };
    let calculator = function () {
        $('.change-on-key-up').on('change', function () {
            let count = parseInt($('#count').val());
            let extraAmount = parseInt($('.extraPrice-amount').val());
            let amount = parseInt($('.primitive-amount').val());
            $('.form-finalAmount').val(formatMoney((extraAmount + (count * amount))))
        });
    };
    let initSwitch = function () {
        $(".has-switch").bootstrapSwitch();

        $(".has-switch").on('switchChange.bootstrapSwitch', function () {
            if (this.checked) {
                switch_checked = 0;

                $('.form-switch-show').css('visibility', 'visible');
            } else {
                switch_checked = 1;
                $('.form-switch-show').css('visibility', 'hidden');
            }
        })

    };
    let initModal = function () {
        initSwitch();
    };
    let inputStyle = function () {
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
        $('.kt_touchspin_hour').TouchSpin({
            buttondown_class: 'btn btn-secondary',
            buttonup_class: 'btn btn-secondary',

            min: 0,
            max: 999,
            stepinterval: 1,
            maxboostedstep: 999,
            postfix: 'ساعت'
        });
        $('.kt_touchspin_float').TouchSpin({
            buttondown_class: 'btn btn-secondary',
            buttonup_class: 'btn btn-secondary',
            min: 0,
            max: 100000,
            step: 0.5,
            decimals: 2,
            boostat: 5,
            maxboostedstep: 10,
        });


    };


    let initSubmit = function () {
        let btn = $('#submit');
        btn.on('click', function (e) {
            e.preventDefault();

            let final_amount;

            final_amount = $('#finalAmount').val().toString();

            var newchar = '';

            final_amount = final_amount.split(',').join(newchar);

            let data = new FormData($('#form-special-product-suggestion')[0]);
            data.set('productProviderUnit.id', parseInt($('#productProviderUnit').val()));
            data.set('prepareHour', $('#prepareHour').val());
            data.set('extraAmount', $('#extraAmount').val());
            data.set('primitiveAmount', $('#primitiveAmount').val());
            data.set('fullDescription', $('#fullDescription').val());
            data.set('finalAmount', final_amount);
            data.set('specialProductId', $('#specialProductId').val());
            data.set('count', $('#count').val());
            data.set('providerId', $('#providerId').val());
            data.set('accepted', true);


            let p = 0;
            $('#fullDescription-error').addClass('d-none');
            $('#primitiveAmount-error').addClass('d-none');
            $('#prepareHour-error').addClass('d-none');
            $('#extraAmount-error').addClass('d-none');
            $('#count-error').addClass('d-none');


            if (switch_checked === 0) {
                if ($('#extraAmount').val() === '') {
                    $('#extraAmount-error').removeClass('d-none');
                    p = 1;
                }
                if ($('#prepareHour').val() === '') {
                    p = 1;
                    $('#prepareHour-error').removeClass('d-none');

                }
                if ($('#primitiveAmount').val() === '') {
                    $('#primitiveAmount-error').removeClass('d-none');
                    p = 1;
                }
                if ($('#fullDescription').val() === '') {
                    $('#fullDescription-error').removeClass('d-none');
                    p = 1;
                }
                if ($('#count').val() === '') {
                    $('#count-error').removeClass('d-none');
                    p = 1;
                }
            } else {
                data.set('productProviderUnit.id', 0);
                data.set('prepareHour', 0);
                data.set('extraAmount', 0);
                data.set('primitiveAmount', 0);
                data.set('fullDescription', 0);
                data.set('finalAmount', 0);
                data.set('count', 0);
                data.set('accepted', false);
            }
            if (p === 0 || switch_checked === 1) {
                $.ajax({
                    url: 'admin/special/product/save',
                    type: 'post',
                    data: data,
                    contentType: false,
                    processData: false,
                    beforeSend: function () {
                        KTApp.progress(btn);
                        // KTApp.block(formEl);
                    },
                    success: function (response) {
                        KTApp.unprogress(btn);
                        // KTApp.unblock(formEl);
                        if (response.result) {
                            modal.remove();
                            swal.fire({
                                "title": "ثبت",
                                "text": "ثبت با موفقیت انجام شد.",
                                "type": "success",
                                "confirmButtonClass": "btn btn-secondary"
                            }).then(function (result) {
                                if (result.value) {
                                    window.location.replace("/admin/specialProduct");
                                }
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



    let initValidation = function () {
        $.validator.addMethod("regex", function (value, element, regexpr) {
            return regexpr.test(value);
        }, "");
        validator = formEl.validate({
            // Validate only visible fields
            ignore: ":hidden",
            // Validation rules
            rules: {
                // Step 1

                fullDescription: {
                    required: true,

                },
                prepareHour: {
                    required: true,
                    number: true

                },
                extraAmount: {
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

                fullDescription: {
                    required: "توضیح کامل را وارد کنید",

                },
                prepareHour: {
                    required: "حداقل زمان آماده سازی را وارد کنید",
                    number: "لطفا عدد وارد کنید"
                },
                primitiveAmount: {
                    required: "قیمت محصول را وارد کنید ",
                    number: "لطفا عدد وارد کنید"
                },
                extraAmount: {
                    required: "هزینه اضافی محصول را وارد کنید ",
                    number: "لطفا عدد وارد کنید"
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

    let show_image = function () {
        $('.image-show').on('click', function () {
            let url = $(this).data('src');
            window.open(url, '_blank');
        })

    };

    return {
        // public functions
        init: function () {
            specialOrderDatatable();

        }
    };
}
();

jQuery(document).ready(function () {
    KTDatatableUnit.init();
});