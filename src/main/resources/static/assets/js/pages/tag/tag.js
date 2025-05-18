"use strict";
// Class definition

let tagPage = function () {
    let counter = 0;
    // let iables
    let datatable;

    // init
    let init = function () {
    };

    let deleteCategoryTag = function () {
        $('.delete-category-tag').on('click', function () {
            let id = $(this).data('delete-id');
            swal.fire({
                text: 'آیا نسبت به حذف تگ  اطمینان دارید؟',
                type: 'question',
                showCancelButton: true,
                confirmButtonText: 'بله',
                cancelButtonText: 'خیر',
                // reverseButtons: true
            }).then(function (result) {
                if (result.value) {
                    let data = {
                        id: id,
                    };
                    $.ajax({
                        'data': data,
                        'url': '/admin/tag/delete',
                        'method': 'get',
                        'beforeSend': function () {

                        },
                        'complete': function () {
                        },
                        'success': function (response) {
                            if (response.result) {
                                swal.fire({
                                    "title": "",
                                    "text": "حذف با موفقیت انجام شد.",
                                    "type": "success",
                                    "confirmButtonClass": "btn btn-secondary"
                                }).then(function (result) {
                                    window.location.replace("/admin/tag");
                                })
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

                } else if (result.dismiss === 'cancel') {
                }
            });
        })
    }
    return {
        // public functions
        init: function () {
            init();
            deleteCategoryTag()
        },
    };
}();

// On document ready
KTUtil.ready(function () {
    tagPage.init();
});