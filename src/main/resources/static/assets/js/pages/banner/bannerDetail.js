"use strict";
// Class definition
let bannerDetailPage = function () {
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
    let initEditImage = function () {
        // in edit mode init remove image
        $(document).on('click', '.remove-image', function () {
            let imageId = $(this).data('id');

            console.log(imageId);
            swal.fire({
                title: 'حذف عکس',
                text: "آیا عکس انتخاب شده حذف شود؟",
                type: 'warning',
                showCancelButton: true,
                cancelButtonText: 'انصراف',
                confirmButtonText: 'حذف شود'
            }).then(function (result) {
                if (result.value) {


                    let id = 'removed' + imageId;
                    $('#' + id + '').remove();


                    let linkClass = 'image_link_' + imageId;
                    $('.' + linkClass + '').remove();

                }
            });
        })
    };
    let initSubmit = function () {
        let btn = formEl.find('[data-ktwizard-type="action-submit"]');
        btn.on('click', function (e) {
            e.preventDefault();
            let imgLink = getImagesLink();
            let data = {
                stringItem: JSON.stringify(imgLink),
                type: $('#type_id').val()
            }
            $.ajax({
                url: '/admin/banner/save',
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
                            window.location.replace("/admin/banner");
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
                        // myFilesImage.push({id: item.id, file: fileImage});
                        // uploadedImagesId.push(item.id);
                        $($($('#kt_dropzone_3').find('.dz-preview')[($('#kt_dropzone_3').find('.dz-preview').length) - 1]).find('.dz-remove')).attr('data-id', item.id);
                        $($($('#kt_dropzone_3').find('.dz-preview')[($('#kt_dropzone_3').find('.dz-preview').length) - 1]).find('.dz-remove')).addClass('remove-image');

                        $('.image_link_inputs').append(
                            '<div class="col-12 row ">' +
                                '<input data-id="' + item.id + '" type="text" placeholder="لینک" class="image_input_link_hover form-control mt-3 mb-4 col-5 image_link_' + item.id + '"> ' +
                                '<a style="cursor: pointer!important;" class="show_pic col-3 mt-4" data-id="' + item.id + '"> نمایش عکس</a>' +
                                '<img style="max-width: 400px !important; max-height: 600px !important;" src="/thumbnail/files/0/' + item.id + '" class="d-none link_image_hover_' + item.id + '">\n'+
                            '</div>'
                        );

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

    let getImagesLink = function () {
        //in edit mode add image id to list
        uploadedImagesId = []
        $('.remove-image').each(function () {
            let imageId = $(this).data('id');
            let linkClass = 'image_link_' + $(this).data('id');

            let linkAddress = $('.' + linkClass + '').val();

            uploadedImagesId.push({id: imageId, name: linkAddress});
        });
        return uploadedImagesId;
    }
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


                        let linkClass = 'image_link_' + imgRemovedId;
                        $('.' + linkClass + '').remove()

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


        $('.image_link_inputs').on('click','.show_pic', function () {
            let imgId = $(this).data('id');
            $('#kt_modal_remote').find('.selected_img').attr('src', '/thumbnail/files/0/' + imgId);
            $('#kt_modal_remote').modal('show');

        });

        $('.image_link_inputs').on('mouseenter','.image_input_link_hover', function () {
            let imgId = $(this).data('id');
            let linkClass = 'link_image_hover_' + imgId;
            $('.' + linkClass + '').removeClass('d-none');
        });

        $('.image_link_inputs').on('mouseleave','.image_input_link_hover', function () {
            let imgId = $(this).data('id');
            let linkClass = 'link_image_hover_' + imgId;
            $('.' + linkClass + '').addClass('d-none');
        });


    };

    return {
        // public functions
        init: function () {
            formEl = $('.form-banner');
            dropzoneinit();
            initSubmit();
            initEditImage();

        }
    };
}();
jQuery(document).ready(function () {
    bannerDetailPage.init();
});