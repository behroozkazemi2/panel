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
    persianRex.number = new RegExp('^' + numberRange + '+$');
    persianRex.letter = new RegExp('^' + charRange + '+$');
    // Private functions
    let select2Change = function () {
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

            min: 0,
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

        if ($('.tag_select_2').val() == '' || $('.tag_select_2').val() == null ){
            $('.tag_select_2').val(1).trigger('change');
        }else {
            $('.tag_select_2').val($('.tag_select_2').val()).trigger('change');
        }


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
                shortDescription: {
                    required: true,

                },
                name: {
                    required: true,

                },
                // fullDescription: {
                //     required: false,
                //
                // },
                unitId: {
                    required: true
                },
                categoryId: {
                    required: true
                },
                tagsId: {
                    required: true,

                },
                brandId: {
                    required: true,

                },
                images: {
                    required: true
                },
                unitStep:{
                    required: true
                }
            },
            messages: {
                // Step 1
                showOrder: {
                    required: "اولویت نمایش  محصول  را وارد کنید",
                    number: "لطفا عدد وارد کنید"
                },
                unitId: {
                    required: "واحد محصول  را وارد کنید"
                },
                categoryId: {
                    required: "دسته بندی محصول را انتخاب کنید",
                },
                brandId: {
                    required: "برند محصول را انتخاب کنید",
                },
                // fullDescription: {
                //     required: "توضیح کامل را وارد کنید",
                //
                // },
                shortDescription: {
                    required: "توضیح مختصر را وارد کنید",

                },
                name: {
                    required: "نام محصول را وارد کنید ",

                },
                unitStep: {
                    required: "میزان افزایش واحد را وارد کنید",
                    number: "لطفا عدد وارد کنید"

                },
                tagsId: {
                    required: "تگ های  محصول را انتخاب کنید",
                },
                images: {
                    required: "عکس محصول  را وارد کنید"
                }

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
    let initEditImage = function () {
        //in edit mode add image id to list
        $('.remove-image').each(function () {
            let imageId = $(this).data('id');
            uploadedImagesId.push(imageId);
        });
        // in edit mode init remove image
        $(document).on('click', '.remove-image', function () {
            let imageId = $(this).data('id');
            swal.fire({
                title: 'حذف عکس',
                text: "آیا عکس انتخاب شده حذف شود؟",
                type: 'warning',
                showCancelButton: true,
                cancelButtonText: 'انصراف',
                confirmButtonText: 'حذف شود'
            }).then(function (result) {
                if (result.value) {
                    const index = uploadedImagesId.indexOf(imageId);
                    if (index > -1) {
                        uploadedImagesId.splice(index, 1);
                    }
                    let id = 'removed' + imageId;
                    $('#' + id + '').remove()
                }
            });
        })
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

                $('#selectedFeatureSt').val('');
                let data = formEl.serializeArray();
                data.push({name: 'images', value: uploadedImagesId});
                $.ajax({
                    url: '/admin/product/save',
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
                                    // window.location.replace("/admin/product/0");
                            });
                            $('#prId').val(response.data);
                            $('.info_table').removeClass('d-none');
                        } else {
                            swal.fire({
                                "title": "خطا",
                                "text": response.data,
                                "type": "error",
                                "confirmButtonClass": "btn btn-warning"
                            });
                        }
                    },
                    complete: function (){
                        initInfoCat();
                        initSaveProductInformationCategory();
                    },
                });
            }
        });
    };
    let imageupload = function (fileImage) {
        let base64Data = [];
        let btn = formEl.find('[data-ktwizard-type="action-submit"]');
        let reader = new FileReader();
        reader.readAsDataURL(fileImage);
        reader.onload = function () {

            let data = reader.result;
            base64Data = [];
            base64Data.push(data.replace(/^data:(.*,)?/, ''));
            let fd = new FormData();

            fd.append("myImage", base64Data);

            $.ajax({
                data: fd,
                url: '/admin/product/uploadImage',
                type: 'POST',
                contentType: false,
                enctype: 'multipart/form-data',
                cache: false,
                processData: false,
                beforeSend: function () {
                    $('.spinner_loading').removeClass('d-none');
                    KTApp.progress(btn);
                },
                complete: function () {
                    $('.spinner_loading').addClass('d-none')
                },
                success: function (res) {
                    res.forEach(item => {
                        myFilesImage.push({id: item.id, file: fileImage});
                        uploadedImagesId.push(item.id);
                    });

                    $(fileImage.previewTemplate).attr('value', res[0].id);

                    KTApp.unprogress(btn);
                },
                error: function () {
                    KTApp.unprogress(btn);
                }


            })

        };
        reader.onerror = function (error) {
        };


    };
    let dropzoneinit = function () {
        // file type validation
        $('#kt_dropzone_3').dropzone({
            url: "/", // Set the url for your upload script location
            paramName: "file", // The name that will be used to transfer the file
            maxFiles: 10,
            maxFilesize: 10, // MB
            addRemoveLinks: true,
            removedfile: function (file) {
                swal.fire({
                    title: 'حذف عکس',
                    text: "آیا عکس انتخاب شده حذف شود؟",
                    type: 'warning',
                    showCancelButton: true,
                    cancelButtonText: 'انصراف',
                    confirmButtonText: 'حذف شود'
                }).then(function (result) {
                    if (result.value) {
                        let imgRemovedId = $(file.previewElement).attr('value');
                        $(file.previewElement).remove();
                        for (let i = 0; i < uploadedImagesId.length; i++) {
                            if (uploadedImagesId[i] == imgRemovedId) {
                                uploadedImagesId.splice(i, 1);
                            }

                        }
                    }
                });

            },
            acceptedFiles: "image/*",

            accept: function (file, done) {
                if (file.name == "justinbieber.jpg") {
                    done("فرمت فایل معتبر نیست!");
                } else {
                    //upload
                    imageupload(file);
                    done();
                }
            },
        });
    };

    let datatable;
    let initInfoCat = function () {
        if (datatable) {
            datatable.destroy();
        }
        datatable = $('#ajax_data').KTDatatable({
            // datasource definition
            data: {
                type: 'remote',
                source: {
                    read: {
                        url: '/dashboard/informationCategory/list',
                        headers: {'x-my-custokt-header': 'some value', 'x-test-header': 'the value'},
                        map: function(raw) {
                            // sample data mapping
                            let dataSet = raw;
                            if (typeof raw.data !== 'undefined') {
                                dataSet = raw.data;
                                $('.total').text(raw.count)
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
                pageSize: 10, // display 20 records per page
                serverPaging: true,
                serverFiltering: true,
                serverSorting: true,
            },

            // layout definition
            layout: {
                scroll: false, // enable/disable datatable scroll both horizontal and vertical when needed.
                footer: false, // display/hide footer
            },

            // column sorting
            sortable: false,

            pagination: true,

            detail: {
                title: 'نمایش جدول زیرین',
                content: subInfo,
            },

            search: {
                input: $('#generalSearch'),
                delay: 400,
            },

            // columns definition
            columns: [
                {
                    field: 'id',
                    title: '',
                    overflow: 'visible',
                    autoHide: false,
                    textAlign: 'center',
                    width: 1,
                },
                {
                    field: 'name',
                    title: 'اطلاعات',
                    autoHide: false,
                    textAlign: 'center'

                },
                {
                    field: 'showOrder',
                    title: 'اولویت نمایش',
                    autoHide: false,
                    textAlign: 'center'
                },
                {
                    field: 'Actions',
                    title: 'عملیات',
                    textAlign: 'center',
                    width: 200,
                    template: function (row) {
                        return '<div class="btn-group text-center">' +
                            '<a class="add-info btn btn-sm btn-outline-brand " data-add-id="' + row.id + '">افزودن</a>' +
                            '</div>';
                    }

                }
                ]

        });

        datatable.on('click', '[data-add-id]', function () {
            let catId = $(this).data('add-id');
            openInformationEditModal( 0 , $('#prId').val(), catId);
        });
    };

    let datatableinfo;
    let subInfo = function (e) {
        let catId = e.data.id;

        if (datatableinfo) {
            datatableinfo.destroy();
        }
        datatableinfo = $('<div/>').attr('id', 'child_category_data_ajax_' + e.data.id).appendTo(e.detailCell).KTDatatable({
            // datasource definition
            data: {
                type: 'remote',
                source: {
                    read: {
                        url: '/dashboard/product/informationCategory/list/' + $('#prId').val() + '/' + catId,
                        headers: {'x-my-custokt-header': 'some value', 'x-test-header': 'the value'},
                        map: function(raw) {
                            // sample data mapping
                            let dataSet = raw;
                            if (typeof raw.data !== 'undefined') {
                                dataSet = raw.data;
                                $('.total').text(raw.count)
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
                pageSize: 10, // display 20 records per page
                serverPaging: true,
                serverFiltering: true,
                serverSorting: true,
            },

            // layout definition
            layout: {
                scroll: false, // enable/disable datatable scroll both horizontal and vertical when needed.
                footer: false, // display/hide footer
            },

            // column sorting
            sortable: false,

            pagination: true,

            search: {
                input: $('#generalSearch'),
                delay: 400,
            },

            // columns definition
            columns: [
                {
                    field: 'name',
                    title: 'اطلاعات',
                    autoHide: false,
                    textAlign: 'center'

                },
                {
                    field: 'value',
                    title: 'مقدار',
                    autoHide: false,
                    textAlign: 'center'

                },
                {
                    field: 'showOrder',
                    title: 'اولویت نمایش',
                    autoHide: false,
                    textAlign: 'center'
                },
                {
                    field: 'Actions',
                    title: 'عملیات',
                    textAlign: 'center',
                    width: 200,
                    template: function (row) {
                        return '<div class="btn-group text-center">' +
                            '<a class="add-info btn btn-sm btn-outline-brand mr-1 " style="cursor: pointer" data-edit-id="' + row.id + '">ویرایش</a>' +
                            '<a class="delete-info btn btn-sm btn-outline-danger ml-1" style="cursor: pointer" data-delete-id="' + row.id + '">حذف</a>' +
                            '</div>';
                    }

                }
                ]

        });

        datatableinfo.on('click', '[data-edit-id]', function () {
            let id = $(this).data('edit-id');
            openInformationEditModal(id, $('#prId').val(), catId);
        });

        datatableinfo.on('click', '[data-delete-id]', function () {
            let id = $(this).data('delete-id');
            swal.fire({
                title: 'حذف عنوان',
                text: "آیا نسبت به حذف این عنوان مطمئن هستید؟",
                type: 'warning',
                showCancelButton: true,
                confirmButtonText: 'بله',
                cancelButtonText: 'خیر',
                // reverseButtons: true
            }).then(function (result) {
                if (result.value) {
                    $.ajax({
                        url: '/admin/product/productInfo/delete/' + id,
                        type: 'post',
                        complete: function (){
                            datatableinfo.reload();
                            datatable.reload();
                        },
                        success: function (response) {
                            swal.fire({
                                title: '',
                                text: "با موفقیت حذف گردید.",
                                type: 'success',
                                confirmButtonText: 'تایید'
                            });
                        },
                        error: function (jqXHR) {
                            if (jqXHR.status == 403) {
                                swal.fire({
                                    title: 'خطا ',
                                    text: "شما دسترسی لازم برای انجام این عملیات را ندارید.",
                                    // text: "سطح دسترسی شما برای انجام این عملیات پایین تر از سطح دسترسی مجاز می‌باشد.",
                                    type: 'error',
                                    confirmButtonText: 'تایید'
                                });
                            } else {
                                swal.fire({
                                    title: 'خطا ',
                                    text: "" ,
                                    type: 'error',
                                    confirmButtonText: 'تایید'
                                });
                            }
                        },
                    })
                } else if (result.dismiss === 'cancel') {
                }
            });
        });

    };

    var modal = $('#kt_modal_remote');

    let openInformationEditModal = function (id, productId, infoCatId ){
        $.ajax({
            url: '/admin/product/productInfo/detail/' + id + '/' + productId + '/' + infoCatId,
            type: 'post',
            dataType: "html",
            success: function (response) {
                if (response) {
                    modal.find('.modal-content').empty();
                    modal.find('.modal-content').append(response);
                    modal.modal('show');
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
            },
            complete: function (){
                modal.on('shown.bs.modal', function () {
                    cliked = 1;
                }).on('hidden.bs.modal', function () {
                    cliked = 0;
                    modal.find('.modal-content').empty();
                });
            }
        });
    }



    let cliked = 0;
    let initSaveProductInformationCategory = function (){
        modal.on('click', '#submit', function (){

            if (cliked === 0 || cliked > 1)
                return;
            cliked++;
            let btn = this;
            let data = new FormData($('.product_info-cat')[0]);
            $.ajax({
                url: '/admin/product/productInfo/save',
                type: 'POST',
                data: data,
                processData: false,
                contentType: false,
                beforeSend: function () {
                    KTApp.progress(btn);
                },
                success: function (response) {
                    KTApp.unprogress(btn);
                    if (response.result) {
                        swal.fire({
                            "title": "ثبت",
                            "text": "ثبت با موفقیت انجام شد.",
                            "type": "success",
                            "confirmButtonClass": "btn btn-secondary"
                        }).then(function (result) {
                            modal.modal('hide');
                            modal.find('.modal-content').empty();
                        });
                        datatableinfo.reload();
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
        })
    }

    return {
        // public functions
        init: function () {
            formEl = $('.form-product');
            initValidation();
            initInfoCat();
            initSaveProductInformationCategory();
            dropzoneinit();
            initSubmit();
            // imageupload();
            select2Change();
            initEditImage();

        }
    };
}();
jQuery(document).ready(function () {
    addProductPage.init();
});