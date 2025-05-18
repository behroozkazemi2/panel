"use strict";

// Class definition
let addCategory = function () {
    // Base elements
    let formEl;
    let uploadedImagesId = [];
    let myFilesImage = [];
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
            formEl.push({name: 'imageId', value: uploadedImagesId[0]});

            if (validator.form()) {
                KTApp.progress(btn);

                let data = formEl.serializeArray();
                data.push({name: 'imageId', value: uploadedImagesId.length == 0 ? 0 :uploadedImagesId[0]});

                $.ajax({
                    url: '/admin/category/save',
                    type: 'post',
                    data: data,
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
                                    window.location.replace("/admin/category");
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
            maxFiles: 4,
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

    return {
        // public functions
        init: function () {
            formEl = $('#form-category');
            initValidation();
            dropzoneinit();
            initSubmit();
            initEditImage();
        }
    };
}();
jQuery(document).ready(function () {
    addCategory.init();
});