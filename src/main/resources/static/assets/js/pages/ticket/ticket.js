var page = function () {

    let isAdmin;
    let searchBtn = $(".search_btn");
    let modal = $("#kt_inbox_compose");
    let validate;

    let ticketTable;


    let initSelect2 = function () {

        $('.has-select2').select2({
            placeholder: "انتخاب کنید",
            autoComplete: true,
            width: '100%'
        });

        $('.response-select2').select2({
            placeholder: "وضعیت پاسخ",
            autoComplete: false,
            allowClear: true,
            width: '100%'
        });

        $('.ticket_close').select2({
            placeholder: "وضعیت تیکت",
            autoComplete: false,
            allowClear: true,
            width: '100%'
        });


    };
    let initProjectSelectOptionAjax = function () {

    };
    let initDatePicker = function () {
        $('.submit_date_show').MdPersianDateTimePicker({
            targetTextSelector: '.submit_date_show',
            targetDateSelector: '.submit_date',
            enableTimePicker: false
        });
        $('.submit_to_date_show').MdPersianDateTimePicker({
            targetTextSelector: '.submit_to_date_show',
            targetDateSelector: '.submit_to_date',
            enableTimePicker: false
        });

        $('.last_msg_date_show').MdPersianDateTimePicker({
            targetTextSelector: '.last_msg_date_show',
            targetDateSelector: '.last_msg_date',
            enableTimePicker: false
        });
        $('.last_msg_to_date_show').MdPersianDateTimePicker({
            targetTextSelector: '.last_msg_to_date_show',
            targetDateSelector: '.last_msg_to_date',
            enableTimePicker: false
        });

    }
    let initProjectSearch = function (element) {

        $(element).select2({
            placeholder: "واحد",
            allowClear: true,
            width: '100%',
            ajax: {
                url: "/user/projectList",
                type: 'post',
                delay: 250,
                data: function (params) {
                    return {
                        search: params.term, // search term
                        page: params.page
                    };
                },
                processResults: function (response, params) {
                    params.page = params.page || 1;
                    return {
                        results: response,
                        pagination: 15
                    };
                },
                cache: true
            },
            escapeMarkup: function (markup) {
                return markup;
            },
            templateResult: formatRepo, // omitted for brevity, see the source of this page
            templateSelection: formatRepoSelection // omitted for brevity, see the source of this page
        });

        function formatRepo(repo) {
            if (repo.loading) return repo.text;
            let data = getImportanceClass(repo.id);
            return repo.name;
        };

        function formatRepoSelection(repo) {
            return repo.name || repo.text;
        };

    };
    let initStatusSelect2 = function (element) {

        $(element).select2({
            placeholder: "درجه اهمیت",
            allowClear: true,
            width: '100%',
            ajax: {
                url: "/admin/ticket/importance/list",
                type: 'post',
                delay: 250,
                data: function (params) {
                    return {
                        search: params.term, // search term
                        page: params.page
                    };
                },
                processResults: function (response, params) {
                    let jsonResponse = JSON.parse(response.payload);
                    params.page = params.page || 1;
                    return {
                        results: jsonResponse,
                        pagination: 15
                    };
                },
                cache: true
            },
            escapeMarkup: function (markup) {
                return markup;
            },
            templateResult: formatRepo, // omitted for brevity, see the source of this page
            templateSelection: formatRepoSelection // omitted for brevity, see the source of this page
        });


        function formatRepo(repo) {
            if (repo.loading) return repo.text;
            let data = getImportanceClass(repo.id);

            if (!data) {
                var $container = $(
                    '<span style="width: 110px;"><span class="' + data.docClass + ' "></span>&nbsp;<span class="kt-font-bold ' + data.class + '">' +
                    repo.name +

                    '</span>' +
                    '</span>'
                );
            }
            {

                var $container = $(
                    '<span style="width: 110px;"><span class="' + data.docClass + ' "></span>&nbsp;<span class="kt-font-bold ' + data.class + '">' +
                    repo.name +

                    '</span>' +
                    '</span>'
                );
            }


            let row = repo.name;
            return $container;
        };

        function formatRepoSelection(repo) {

            return repo.name || repo.text;
        };


    };

    let initTicketDataTable = function () {
        ticketTable ? ticketTable.destroy() : '';
        ticketTable = $('.ticket_data_table').KTDatatable({
            data: {
                type: 'remote',
                source: {
                    read: {
                        url: '/admin/ticket/list',
                        headers: {'x-my-custokt-header': 'some value', 'x-test-header': 'the value'},
                        map: function (raw) {
                            var dataSet = raw;
                            if (typeof raw.data !== 'undefined') {
                                dataSet = raw.data;
                            }
                            return dataSet;
                        },
                    },
                },
                pageSize: 10,
                serverPaging: true,
                serverFiltering: true,
                serverSorting: true,
            },
            layout: {
                scroll: false,
                footer: false,
                spinner: {
                    type: '',
                    state: 'primary',
                    centerX: true,
                    centerY: true,
                    message: 'درحال دریافت اطلاعات',
                }
            },
            sortable: true,
            pagination: true,
            search: {
                input: $('#testGeneralSearch'),
                delay: 300
            },
            columns: [
                {
                    field: 'importance',
                    title: 'درجه اهمیت',
                    overflow: 'visible',
                    autoHide: false,
                    textAlign: 'center',
                    width: 80,
                    template: function (row) {
                        let div = getImportanceClass(row.importance.id);
                        let showDiv = '<span>' +
                            '       <span class="kt-badge  kt-badge--dot '+ div.docClass +'"  >    </span>&nbsp;' +
                            '                    <span class="kt-font-bold ' +div.class+ '">'  + row.importance.name  +
                            '       </span>' +
                            '        </span>'

                        return showDiv
                    },
                },
                {
                    field: 'trackingCode',
                    title: 'کدپیگیری',
                    overflow: 'visible',
                    autoHide: false,
                    textAlign: 'center',
                    width: 80,
                    sortable:false,
                },
                {
                    field: 'project',
                    title: 'واحد',
                    overflow: 'visible',
                    autoHide: true,
                    textAlign: 'center',
                    width: 200,
                    template: function (row) {

                        return row.projectName;
                    },

                },
                {
                    field: 'ticketSubject',
                    title: 'موضوع',
                    overflow: 'visible',
                    autoHide: false,
                    textAlign: 'center',
                    width: 300,
                    sortable:false,
                },
                {
                    field: 'submitDate',
                    title: 'تاریخ ثبت',
                    overflow: 'visible',
                    autoHide: false,
                    textAlign: 'center',
                    width: 100,
                    template: function (row) {
                        let hidden = '<input hidden=hidden" class="is_read d-none" value="'+ row.read +'" >';
                       return row.insertDateStr + hidden;
                    },

                },
                {
                    field: 'date',
                    title: 'تاریخ آخرین پیام',
                    overflow: 'visible',
                    autoHide: true,
                    textAlign: 'center',
                    width: 112,
                    template: function (row) {
                        return row.lastTicketMessageDateStr;
                    },

                },

                {
                    field: 'closed',
                    title: 'وضعیت تیکت',
                    overflow: 'visible',
                    autoHide: false,
                    textAlign: 'center',
                    width: 150,
                    template: function (row) {
                        let divClass = row.closed ? 'kt-badge--info' : 'kt-badge--unified-info' ;
                        let text = row.closed ? 'بسته شده' : (row.read ? 'باز' : 'باز (پاسخ داده شده)' )  ;
                        let div = ' <span   class="kt-inbox__label  rounded-lg kt-badge  kt-badge--md kt-badge--bold kt-badge--inline '+ divClass +' ">' +
                            text +
                            '</span>' ;


                        return div
                    },
                },
                {
                    field: '',
                    title: 'عملیات',
                    overflow: 'visible',
                    autoHide: false,
                    textAlign: 'center',
                    width: 50,
                    sortable:false,
                    template: function (row) {
                        let output = '';
                        output += '<button class="btn btn-outline-primary br-radius-5 show_btn "  data-id="' + row.trackingCode + '"  title="مشاهده پیام ها"> <i class="fas fa-comment p-l-0"></i> </button>\n';
                        return output;
                    },
                },


            ]
        });


        ticketTable.on('kt-datatable--on-layout-updated', function (data) {

            ticketTable.find('tr').each(function () {
                let element = this;

                // console.log($($(this).find('.is_read')).val());
                // if ($($(this).find('.is_read')).val() == "true") {
                //     $(element).css("background-color" , "#f2f3f8") ;
                // }
            });

            KTApp.unprogress(searchBtn);
            searchBtn.prop('disabled', false);
            searchHandle();
        });
        ticketTable.on('click', '.show_btn', function () {
            window.open("/admin/ticket/" + $(this).attr('data-id') , "_blank")
        });

    };
    let searchHandle = function () {
        searchBtn.on("click", function (evt) {
            search();
            evt.preventDefault();
        });
        $(document).on('keypress', function (e) {
            if (e.which == 13) {
                search();
            }
        });
    };
    let search = function () {
        ticketTable.setDataSourceParam("ticketImportance", $('.importance_search').val());
        ticketTable.setDataSourceParam("project", $('.project_search').val());
        ticketTable.setDataSourceParam("closed",  !isZero($('.closed_search').val()) ?  $('.closed_search').val() :0 );
        ticketTable.setDataSourceParam("responseType", !isZero($('.response_type_search').val()) ?  $('.response_type_search').val() :0);
        ticketTable.setDataSourceParam("lastMsgDate", !isZero($('.last_msg_date').val()) ?  new Date($('.last_msg_date').val()).getTime() :0);
        ticketTable.setDataSourceParam("lastMsgToDate", !isZero($('.last_msg_to_date').val()) ?  new Date($('.last_msg_to_date').val()).getTime() :0);
        ticketTable.setDataSourceParam("search", $('.general_search').val());
        ticketTable.reload();
        KTApp.progress(searchBtn);
        searchBtn.prop('disabled', true);
    };


    let initPersianDatePicker = function () {
        $('#date').MdPersianDateTimePicker({
            targetTextSelector: '#date',
            targetDateSelector: '#date_hidden',
            enableTimePicker: false
        });
    };


    let saveTicketAjax = function () {

        let btn = $('#save_ticket_btn');
        btn.on('click', function (e) {
            if (validate.form()) {
                e.preventDefault();
                let data = new FormData();
                data.set('project', parseInt($('.modal_project').val()))
                data.set('text', $('.modal_text').val());
                data.set('importance', $('.modal_importance').val());
                data.set('subject', $('.modal_subject').val());
                let docs = [];
                $('.ticket_doc').each(function () {
                    if (!isNull($(this).attr('data-id'))) {
                        docs.push($(this).attr('data-id'))
                    }
                });
                data.set('documents', docs);

                $.ajax({
                    url: '/admin/ticket/save',
                    type: 'post',
                    data: data,
                    contentType: false,
                    processData: false,
                    beforeSend: function () {
                        loadingBtn('#save_ticket_btn');
                    },
                    success: function (response) {
                        if (response.result) {
                            modal.modal('hide');
                            swal.fire({
                                "title": "",
                                'text': "ثبت با موفقیت انجام شد.",
                                "type": "success",
                                "confirmButtonClass": "",
                                "showCancelButton": true,
                                "cancelButtonColor": '#26a2dd',
                                "confirmButtonText": 'مشاهده',
                                "cancelButtonText": 'تایید',
                            }).then((result) => {
                                if (result.value) {
                                    window.open('/admin/ticket/' + response.payload)
                                } else {

                                    ticketTable.reload();

                                }
                            });
                        } else {
                            swal.fire({
                                "title": "خطا",
                                'text': response.payload,
                                "type": "error",
                                "confirmButtonClass": "btn btn-warning"
                            });
                        }
                        KTApp.unprogress(btn);
                    },
                    error: function (jqXHR) {
                        KTApp.unprogress(btn);
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
                    complete: function () {
                        unloadingBtn('#save_ticket_btn');
                    }
                });
            }

        });


    };

    let saveTicketValidation = function () {
        validate = $('#save-ticket-form').validate({
            rules: {
                subject: {
                    required: true,
                },
                text: {
                    required: true,
                },
                importance: {
                    required: true,
                },
                project: {
                    required: true,
                },

            },
            messages: {
                project: {
                    required: 'لطفا پروژه را انتخاب کنید',
                },
                subject: {
                    required: "لطفا موضوع واحد را وارد نمایید",
                },
                text: {
                    required: "لطفا متن تیکت را وارد نمایید",
                },
                importance: {
                    required: "لطفا درجه اهمیت تیکت را انتخاب کنید",
                },
            },
            invalidHandler: function (event, validator) {
                event.preventDefault();
            },
            submitHandler: function (form) {
            }
        });
    };

    var initAttachments = function (elemId) {

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
                $(file.previewElement).find('.dropzone-filename').addClass('ticket_doc').attr('data-id', data.id);
            }
            // Hookup the start button
        });

        // Update the total progress bar
        myDropzone.on("totaluploadprogress", function (progress) {
            document.querySelector(id + " .progress-bar").style.width = progress + "%";
        });

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

    let openTicketModal = function () {
        $(".add-new-ticket").on('click', function () {
            $.ajax({
                url: '/admin/ticket/modal/add',
                type: 'post',
                dataType: "html",
                success: function (response) {
                    modal.find('.modal-content').empty();
                    modal.find('.modal-content').append(response);
                    initProjectSearch('.user_project_modal');
                    initStatusSelect2('.modal_importance');

                    saveTicketValidation();
                    initAttachments('kt_inbox_compose_attachments');
                    initProjectSelectOptionAjax();
                    saveTicketAjax();

                },
                error: function () {

                },
                complete: function () {
                    modal.modal('show');

                }
            });
        })
    };

    let downloadErrorExcel = function (){
        $('#downloadExcel').on( "click", function(evt) {
            const queryParams = {
                ticketImportance:$('.importance_search').val(),
                project: $('.project_search').val(),
                closed: !isZero($('.closed_search').val()) ?  $('.closed_search').val() :0,
                responseType: !isZero($('.response_type_search').val()) ?  $('.response_type_search').val() :0,
                // submitDate: !isZero($('.submit_date').val()) ?  new Date().getTime($('.submit_date').val())  :0,
                // submitToDate: !isZero($('.submit_to_date').val()) ?  new Date().getTime($('.submit_to_date').val())  :0,
                lastMsgDate: !isZero($('.last_msg_date').val()) ?  new Date($('.last_msg_date').val()).getTime() :0,
                lastMsgToDate: !isZero($('.last_msg_to_date').val()) ?  new Date($('.last_msg_to_date').val()).getTime() :0,
                search: $('.general_search').val(),
            };
            const searchParams = new URLSearchParams(queryParams).toString();
            const href = `/admin/ticket/list/download?${searchParams}`;
            window.open(href, '_blank');
        });
    }

    let ticketImportance = {
        veryUrgent: {id :1 , class : "kt-font-danger" , docClass : 'kt-badge kt-badge--danger kt-badge--dot' },
        urgent: {id :2 , class : "kt-font-warning" , docClass : 'kt-badge kt-badge--warning kt-badge--dot' },
        normal: {id :3 , class : "kt-font-primary" , docClass : 'kt-badge kt-badge--primary kt-badge--dot' },
        low: {id :4 , class : "kt-font-success" , docClass : 'kt-badge kt-badge--success kt-badge--dot' },
    };
    let getImportanceClass = function (id) {

        if(id == 0){
            return false;
        }

        switch (id) {
            case 1 : return ticketImportance.veryUrgent;
            case 2 : return ticketImportance.urgent;
            case 3 : return ticketImportance.normal;
            case 4 : return ticketImportance.low;

        }
    };

    return {
        init: function () {
            $('.ticket_close').val('').trigger('change');
            $('.response-select2').val('').trigger('change');
            // initDatePicker();
            isAdmin = $('.isAdmin').val() == 'true';
            initTicketDataTable();
            initSelect2();
            initProjectSelectOptionAjax();
            // initPersianDatePicker();
            openTicketModal();
            downloadErrorExcel();
            setInterval(function() {


            }, 60000);

        },
    };
}
();

// On document ready
$(document).ready(function () {
    page.init();
});
