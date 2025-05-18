"use strict";
// Class definition


var ChangePassword = function () {
    // Private functions


    var showDetails = function () {

        let cur = $('#current-password').val();
        let pass = $('#password').val();
        let rePass = $('#re-password').val();

        let error = null;
        if(cur == null || cur.length <= 1){
            error = 'لطفا رمز عبور فعلی را وارد کنید';
        }
        if(pass == null || pass.length <= 1){
            error = 'لطفا رمز عبور جدید را وارد کنید';
        }
        if(rePass == null || rePass.length <= 1){
            error = 'لطفا تکرار رمز عبور جدید را وارد کنید';
        }
        if(rePass == pass){
            error = 'رمز عبور فعلی و تکرار آن مطابقت ندارد لطفا مجددا تلاش کنید.';
        }


        if(error != null){
            swal.fire({
                "title": "عملیات ناموفق",
                "text": error,
                "type": "error",
                "confirmButtonClass": "btn btn-warning",
                "confirmButtonText": "تایید"
            });
        }else{

            var passwordData= {
                oldPassword: cur,
                password: pass,
                confirmPassword: rePass
            };

            $.ajax({
                url: '/admin/operator/changePasswordConfirm/',
                data: passwordData,
                type: 'post',
                beforeSend : function(){
                    $('#password-change-submit').addClass('disabled');
                },
                complete: function(){
                    $('#password-change-submit').addClass('disabled');
                },
                success: function (response) {
                    if (response.result) {
                        swal.fire({
                            "title": "عملیات موفق",
                            "text": "عملیات موفق",
                            "type": "success",
                            "confirmButtonClass": "btn btn-info",
                            "confirmButtonText": "تایید"
                        });
                    } else {
                        swal.fire({
                            "title": "عملیات ناموفق",
                            "text": response.payload,
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
                        "confirmButtonText": "تایید"
                    });
                }
            });
        }


    };


    var clickHandler = function () {
        $('#password-change-submit').on('click',function () {
            showDetails();
        });
    };


    return {
        // public functions
        init: function () {
            clickHandler();
        }
    };
}();

jQuery(document).ready(function () {
    ChangePassword.init();
});