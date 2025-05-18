var page = function () {

    let isAdmin;
    let searchBtn = $(".search_btn");
    let commentTable;
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
    let initCommentDataTable = function () {
        commentTable ? commentTable.destroy() : '';
        commentTable = $('.comment_data_table').KTDatatable({
            data: {
                type: 'remote',
                source: {
                    read: {
                        url: '/api/comment/product/list/' + $('#productId').val() + '/' + $('.status_search').val(),
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
                    field: 'status',
                    title: 'وضعیت',
                    overflow: 'visible',
                    autoHide: false,
                    width: 70,
                    textAlign: 'center',
                    template: function (row) {
                        let div = getStatusClass(row.status);
                        let showDiv = '<span>' +
                            '       <span class="kt-badge  kt-badge--dot '+ div.docClass +'"  >    </span>&nbsp;' +
                            '                    <span class="kt-font-bold ' +div.class+ '">'  + div.name  +
                            '       </span>' +
                            '        </span>'

                        return showDiv
                    },
                },  {
                    field: 'productName',
                    title: 'محصول',
                    overflow: 'visible',
                    autoHide: false,
                    textAlign: 'center',
                },
                {
                    field: 'logedIn',
                    title: 'وضعیت ورود نظر دهنده',
                    overflow: 'visible',
                    autoHide: true,
                    textAlign: 'center',
                    template: function (row) {

                        return row.logedIn ? 'وارد شده' : 'میهمان'
                    },
                },
                {
                    field: 'name',
                    title: 'نظر دهنده',
                    overflow: 'visible',
                    autoHide: false,
                    textAlign: 'center',
                    sortable:false,
                },
                {
                    field: 'email',
                    title: 'email',
                    overflow: 'visible',
                    autoHide: true,
                    textAlign: 'center',
                    sortable:false,
                },
                {
                    field: 'rate',
                    title: 'امتیاز',
                    overflow: 'visible',
                    autoHide: false,
                    textAlign: 'center',
                    width: 80,
                    sortable:false,
                },
                {
                    field: 'date',
                    title: 'تاریخ ثبت',
                    overflow: 'visible',
                    autoHide: false,
                    textAlign: 'center',
                    sortable:false,
                },
                {
                    field: 'text',
                    title: 'نظر',
                    overflow: 'visible',
                    autoHide: false,
                    textAlign: 'center',
                    sortable:false,
                    template: function (row) {
                        return '<button class="btn btn-sm btn-outline-brand show_comment" data-txt="'+row.text+'"> مشاهده نظر</button>';
                    }
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
                        if (row.status == 2 || row.status == 3)
                            return '-'
                        output +=
                            '<section class="row">' +
                            '<button  class="btn btn-outline-primary br-radius-5 " data-id="'+row.id+'" data-status="2" title=""> <i class="fas fa-check-circle p-l-0"></i> تایید کامنت</button>\n' +
                            '<button  data-id="'+row.id+'" data-status="3" class="btn btn-outline-danger br-radius-5 " title=""> <i class="fas fa-trash p-l-0"></i> رد کامنت</button>\n' +
                            '</section>';
                        return output;
                    },
                },
            ]
        });
        commentTable.on('click', '.show_comment', function () {

            let txt = $(this).data('txt');
            swal.fire({
                title: '',
                text: txt,
                type: 'warning',
                showCancelButton: false,
            })
        });
        commentTable.on('click', '[data-id]', function () {
            let id = $(this).data('id');
            let status = $(this).data('status');
            swal.fire({
                title: '',
                text: "آیا نسبت به انجام عملیات مطمئن هستید؟",
                type: 'warning',
                showCancelButton: true,
                confirmButtonText: 'بله',
                cancelButtonText: 'خیر',
                // reverseButtons: true
            }).then(function (result) {
                if (result.value) {
                    $.ajax({
                        url: '/api/comment/product/send/'+id+'/'+status,
                        type: 'post',
                        complete: function (){
                            commentTable.reload();
                        },
                        success: function (response){
                            if (response.result){

                                swal.fire({
                                    title: '',
                                    text: "با موفقیت انجام گردید.",
                                    type: 'success',
                                    confirmButtonText: 'تایید'
                                });
                            }else {
                                swal.fire({
                                    title: 'حطا',
                                    text: response.data,
                                    type: 'error',
                                    confirmButtonText: 'تایید'
                                });
                            }
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
        initCommentDataTable()
    };


    let initPersianDatePicker = function () {
        $('#date').MdPersianDateTimePicker({
            targetTextSelector: '#date',
            targetDateSelector: '#date_hidden',
            enableTimePicker: false
        });
    };


    let commentStatus = {
        create: {id :1 , class : "kt-font-warning" , docClass : 'kt-badge kt-badge--warning kt-badge--dot' , name: 'ثبت شده'},
        submit: {id :2 , class : "kt-font-success" , docClass : 'kt-badge kt-badge--success kt-badge--dot' , name: 'تایید شده'},
        reject: {id :3 , class : "kt-font-danger" , docClass : 'kt-badge kt-badge--danger kt-badge--dot', name: 'رد شده' }
    };
    let getStatusClass = function (id) {

        if(id == 0){
            return false;
        }

        switch (id) {
            case 1 : return commentStatus.create;
            case 2 : return commentStatus.submit;
            case 3 : return commentStatus.reject;

        }
    };

    return {
        init: function () {
            $('.ticket_close').val('').trigger('change');
            $('.response-select2').val('').trigger('change');
            // initDatePicker();
            isAdmin = $('.isAdmin').val() == 'true';
            initCommentDataTable();
            initSelect2();
            searchHandle();
        },
    };
}
();

// On document ready
$(document).ready(function () {
    page.init();
});
