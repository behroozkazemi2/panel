var page = function () {

    let viewEl = KTUtil.getByID('kt_inbox_view');
    let validate;

    let getTicketMessages = function () {

        $.ajax({
            url: '/admin/ticket/message/' + parseInt($('.ticket_id').val()),
            type: 'post',
            dataType: "html",
            success: function (response) {
                $('.timeline').empty();
                $('.timeline').append(response);

            },
            error: function () {

            },
            complete: function () {


            }
        });

    };

    let initView = function () {
        // Back to listing
        KTUtil.on(viewEl, '.kt-inbox__toolbar .kt-inbox__icon.kt-inbox__icon--back', 'click', function () {
            // demo loading
            var loading = new KTDialog({
                'type': 'loader',
                'placement': 'top center',
                'message': 'درحال دریافت...'
            });
            loading.show();

        });

        // Expand/Collapse reply
        KTUtil.on(viewEl, '.kt-inbox__messages .kt-inbox__message .kt-inbox__head', 'click', function (e) {
            var dropdownToggleEl = KTUtil.find(this, '.kt-inbox__details .kt-inbox__tome .kt-inbox__label');
            var groupActionsEl = KTUtil.find(this, '.kt-inbox__actions .kt-inbox__group');

            // skip dropdown toggle click
            if (e.target === dropdownToggleEl || (dropdownToggleEl && dropdownToggleEl.contains(e.target) === true)) {
                return false;
            }

            // skip group actions click
            if (e.target === groupActionsEl || (groupActionsEl && groupActionsEl.contains(e.target) === true)) {
                return false;
            }

            var message = this.closest('.kt-inbox__message');

            if (KTUtil.hasClass(message, 'kt-inbox__message--expanded')) {
                KTUtil.removeClass(message, 'kt-inbox__message--expanded');
            } else {
                KTUtil.addClass(message, 'kt-inbox__message--expanded');
            }
        });
    };

    let initAttachments = function (elemId) {

        var id = "#" + elemId;
        var previewNode = $(id + " .dropzone-item");
        previewNode.id = "";
        var previewTemplate = previewNode.parent('.dropzone-items').html();
        previewNode.remove();

        var myDropzone = new Dropzone(id, { // Make the whole body a dropzone
            url: "/file/upload", // Set the url for your upload script location
            parallelUploads: 20,
            timeout: (1000 * 60 * 3), // 3 minutes
            // acceptedFiles: "image/jpeg,image/png,image/gif,application/pdf,image/jpg",
            // maxFilesize: 2, // Max filesize in MB
            previewTemplate: previewTemplate,
            previewsContainer: id + " .dropzone-items", // Define the container to display the previews
            clickable: id + "_select" // Define the element that should be used as click trigger to select files.
        });

        myDropzone.on("addedfile", function (file) {
            // Hookup the start button
            $(document).find(id + ' .dropzone-item').css('display', '');
        });

        myDropzone.on("success", function (file, response) {
            if (response.result) {
                var data = JSON.parse(response.payload);
                // console.log($(file.previewElement));
                $(file.previewElement).find('.dropzone-filename').addClass('ticket_doc').attr('data-id', data.id);
            }
            // Hookup the start button
        });

        // Update the total progress bar
        // myDropzone.on("totaluploadprogress", function (progress) {
        //     document.querySelector(id + " .progress-bar").style.width = progress + "%";
        // });

        myDropzone.on("sending", function (file) {
            // Show the total progress bar when upload starts
            document.querySelector(id + " .progress-bar").style.opacity = "1";
        });

        // Hide the total progress bar when nothing's uploading anymore
        myDropzone.on("complete", function (progress) {
            var thisProgressBar = id + " .dz-complete";
            setTimeout(function () {
                $(thisProgressBar + " .progress-bar, " + thisProgressBar + " .progress").css('opacity', '0');
            }, 300)
        });
    }

    let saveTicketMsgValidation = function () {
        validate = $('#save-ticket-msg-form').validate({
            rules: {
                text: {
                    required: true,
                },

            },
            messages: {
                text: {
                    required: 'متن پیام را وارد کنید',
                },

            },
            invalidHandler: function (event, validator) {
                event.preventDefault();
            },
            submitHandler: function (form) {
            }
        });
    };

    let saveTicketMsgAjax = function () {

            let btn = $('#save_ticket_btn');
        $('#save_ticket_btn').on('click',function () {

                let data = new FormData();
                data.set('text', $('.text_area').val());
                data.set('ticketId', $('.ticket_id').val());
                // let docs = [];
                // $('.ticket_doc').each(function () {
                //     if (!isNull($(this).attr('data-id'))) {
                //         docs.push($(this).attr('data-id'))
                //     }
                // });
                // data.set('document', docs)
                $.ajax({
                    url: '/admin/ticket/save/message',
                    type: 'post',
                    data: data,
                    contentType: false,
                    processData: false,
                    beforeSend: function () {
                        KTApp.progress(btn);
                        btn.attr('disable',true);
                    },
                    success: function (response) {
                        if (response.result) {
                            swal.fire({
                                "title": "",
                                'text': "ثبت با موفقیت انجام شد.",
                                "type": "success",
                                "confirmButtonClass": "btn btn-warning"
                            });
                            $('.text').val('');
                            $('.dropzone-items').empty();
                            lastTicketMessage();
                        } else {
                            swal.fire({
                                "title": "خطا",
                                'text': response.payload,
                                "type": "error",
                                "confirmButtonClass": "btn btn-warning"
                            });
                        }
                    },
                    error: function (jqXHR) {

                        if (jqXHR.status == 403) {
                            swal.fire({
                                title: 'خطا ',
                                text: "شما اجازه دسترسی برای انجام این عملیات را ندارید.",
                                // text: "سطح دسترسی شما برای انجام این عملیات پایین تر از سطح دسترسی مجاز می‌باشد.",
                                type: 'error',
                                confirmButtonText: 'تایید'
                            });
                        } else {
                            swal.fire({
                                title: 'خطا ',
                                text: "خطا در برقراری ارتباط",
                                type: 'error',
                                confirmButtonText: 'تایید'
                            });
                        }
                    },
                    complete:function () {
                        KTApp.unprogress(btn);
                        btn.attr('disable',false);
                    }
                });
        });

    };

    let lastTicketMessage = function () {

        $.ajax({
            url: '/admin/ticket/last/message/' + parseInt($('.ticket_id').val()),
            type: 'post',
            dataType: "html",
            success: function (response) {
                $('.timeline').find('.kt-inbox__message--expanded').removeClass('kt-inbox__message--expanded')
                $('.timeline').append(response);

            },
            error: function () {

            },
            complete: function () {


            }
        });
    };

    let closeTicket = function () {
        $('.close-ticket').on('click',function () {
            let id = $('.ticket_id').val();


            swal.fire({
                title: '',
                text: "تیکت بسته شود؟",
                type: 'warning',
                showCancelButton: true,
                confirmButtonText: 'بله',
                cancelButtonText: 'خیر'
                // reverseButtons: true
            }).then(function (result) {
                if (result.value) {
                    $.ajax({
                        url: '/admin/ticket/close/' + id,
                        type: 'post',
                        contentType: false,
                        processData: false,
                        beforeSend: function () {
                        },
                        success: function (response) {
                            if (response.result) {
                                swal.fire({
                                    "title": "",
                                    "text": "عملیات با موفقیت انجام شد!",
                                    "type": "success",
                                    "confirmButtonClass": "btn btn-secondary"
                                });
                                location.reload();
                            } else {
                                swal.fire({
                                    "title": "خطا",
                                    'text': response.payload,
                                    "type": "error",
                                    "confirmButtonClass": "btn btn-warning"
                                });
                            }
                        },
                        error: function (jqXHR) {
                            if (jqXHR.status == 403) {
                                swal.fire({
                                    title: 'خطا ',
                                    text: "شما اجازه دسترسی برای انجام این عملیات را ندارید.",
                                    // text: "سطح دسترسی شما برای انجام این عملیات پایین تر از سطح دسترسی مجاز می‌باشد.",
                                    type: 'error',
                                    confirmButtonText: 'تایید'
                                });
                            } else {
                                swal.fire({
                                    title: 'خطا ',
                                    text: "خطا در برقراری ارتباط",
                                    type: 'error',
                                    confirmButtonText: 'تایید'
                                });
                            }
                        },
                    });

                } else if (result.dismiss === 'cancel') {
                }
            });



        })
    }


    return {
        init: function () {
            let closed = $('.is-closed').val();
            getTicketMessages();
            initView();
            if(closed == 'false'){
                initAttachments('kt_inbox_reply_attachments');
            }
            saveTicketMsgValidation();
            saveTicketMsgAjax();
            closeTicket();
            },

    };
}
();

// On document ready
$(document).ready(function () {
    page.init();
});
