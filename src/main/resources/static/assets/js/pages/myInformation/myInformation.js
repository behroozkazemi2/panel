
// Class definition

let userInformation = function () {

    var formEl;
    // init
    let init = function () {
        // init the datatables. Learn more: https://keenthemes.com/metronic/?page=docs&section=datatable
    };

    var avatar;

    var initUserForm = function() {
        avatar = new KTAvatar('kt_user_edit_avatar');
    };

    var editvalidation = function () {
        formEl.validate({
            // define validation rules
            rules: {
                name: {
                    required: true,
                    minlength: 2
                },
                address: {
                    required: true,
                    minlength: 2
                },
                phone: {
                    required: true,
                    digits:true,
                    regex: /^[\u0660|\u06F0][\u0660-\u0669\u06F0-\u06F9]{10}$|0[0-9]{10}$/
                },
                emergencyPhone: {
                    required: true,
                    digits:true
                },
                instagram: {
                    required: true,
                    minlength: 3
                },
                telegram: {
                    required: true,
                    minlength: 3
                },
                currentPassword: {
                    required: true,
                },
                newPassword: {
                    required: true
                },
                confirmPassword: {
                    required: true
                }
            },

            //display error alert on form submit
            invalidHandler: function(event, validator) {
                console.log('alert on form submit');
                KTUtil.scrollTop();
            },

            submitHandler: function (form) {
                //form[0].submit(); // submit the form
                console.log('submit the form');

            }
        });
    };

    var initSubmit = function() {

        var btn = formEl.find('[data-ktwizard-type="action-submit"]');

        btn.on('click', function(e) {
            e.preventDefault();

            if (validator.form()) {
                // See: src\js\framework\base\app.js
                KTApp.progress(btn);
                //KTApp.block(formEl);

                var roles = new Array();

                $('input[name="package[]"]').each(function () {
                    var roleObj = {};
                    roleObj.packageId = parseInt($(this).val());
                    if ($('input[name="role-' + $(this).val() + '"]').is(':checked')) {
                        roleObj.roleId = parseInt($('input[name="role-' + $(this).val() + '"]:checked').val());
                        roles.push(roleObj);
                    } else {
                        roleObj.roleId = 1;
                        roles.push(roleObj);
                    }
                });

                var input = $('#form-add-edit-profile').find('#role');
                if(input.length >0){
                    input.val(JSON.stringify(roles));
                }
                else {
                    input = $("<input>")
                        .attr("type", "hidden")
                        .attr("id", "role")
                        .attr("name", "roles").val(JSON.stringify(roles));
                    $('#form-add-edit-profile').append(input);
                }

                // See: http://malsup.com/jquery/form/#ajaxSubmit
                formEl.ajaxSubmit({
                    url: '/admin/profile/information/save',
                    type: 'post',
                    success: function(response) {
                        KTApp.unprogress(btn);
                        //KTApp.unblock(formEl);

                        if (response.result) {

                            swal.fire({
                                "title": "",
                                "text": "ثبت با موفقیت انجام شد.",
                                "type": "success",
                                "confirmButtonClass": "btn btn-secondary"
                            }).then(function (result) {
                                if (result.value) {
                                    window.location.replace("/admin/operator");
                                }});;

                        }else {

                            swal.fire({
                                "title": "",
                                "text": response.payload,
                                "type": "error",
                                "confirmButtonClass": "btn btn-warning"
                            });

                        }


                    }
                });
            }
        });
    };

    return {
        // public functions
        init: function () {

            formEl = $('#form-add-edit-profile');


            init();
            initUserForm();
            editvalidation();
        },
    };
}();

// On document ready
KTUtil.ready(function () {
    userInformation.init();
});