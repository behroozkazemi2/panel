"use strict";
// Class definition

var KTDatatableUnit = function() {
	// Private functions
    var modal =$('#kt_modal_remote');
    // basic driverList
	var unitList = function() {

        var datatable = $('.kt-datatable').KTDatatable({
			// datasource definition
			data: {
				type: 'remote',
				source: {
					read: {
						url: '/admin/setting/unitList',
						headers: {'x-my-custokt-header': 'some value', 'x-test-header': 'the value'},
						map: function(raw) {
							var dataSet = raw;
							if (typeof raw.data !== 'undefined') {
								dataSet = raw.data;
                                $('.total').text(raw.meta.total);
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
			columns: [{
                    field: 'name',
                    title: 'عنوان',
                    sortable: false,
                    textAlign: 'center'
				},

				{
					field: 'registerDate',
					title: 'تاریخ ثبت/ویرایش',
                    sortable: false,
                    textAlign: 'center',
                    width: 100,
                    template: function(row) {
                        return row.registerDate != null ? '<span>' + timeStampToYearMonthDay(row.registerDate) + '</span>' : 'نامشخص'
					},
				},
                {
                    field: 'registrarName',
                    title: 'ثبت/ویرایش کننده',
                    sortable: false,
                    width: 100,
                    textAlign: 'center'
                },
				{
					field: 'Actions',
					title: 'عملیات',
					sortable: false,
                    width: 80,
                    overflow: 'visible',
                    textAlign: 'center',
                    template: function(row) {
                        return '<a title="ویرایش" class="btn btn-outline-brand btn-icon" href="setting/unit/add/' + row.id + '"><i class="la la-edit"></i></a>';
                    },
				}],
		});


		$('#kt_form_status').on('change', function() {
		  datatable.search($(this).val().toLowerCase(), 'Status');
		});

		$('#kt_form_type').on('change', function() {
		  datatable.search($(this).val().toLowerCase(), 'Type');
		});

        // $('#unit-new').click(function () {
        //     openModal(0);
        // })
        //
        // modal.on('shown.bs.modal', function () {
        //     modal.find('.btn-submit').on('click',function () {
        //         saveUnit();
        //     });
        // }).on('hidden.bs.modal', function () {
        //     modal.find('.modal-content').empty();
        // });




	};

	var openModal = function (data) {
        $.ajax({
            url: '/admin/setting/unitNew/' + data,
            type: 'post',
            dataType: "html",
            success: function (response) {
                // KTApp.unprogress(btn);
                if (response) {
                    modal.find('.modal-content').empty();
                    modal.find('.modal-content').append(response);
                    $('input[name="id"]').val(data);
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
            }
        });
    }

    var saveUnit = function () {
        $.ajax({
            url: '/admin/setting/saveUnit',
            type: 'post',
            data: {
                id: $('input[name="id"]').val(),
                name: $('input[name="name"]').val()
            },
            success: function (response) {
                // KTApp.unprogress(btn);
                if (response.result) {
                    swal.fire({
                        "title": "عملیات موفق!",
                        "text": "",
                        "type": "success",
                        "confirmButtonClass": "btn btn-warning",
                        "confirmButtonText": "تایید"
                    });
                    $('#kt_modal_remote').modal('toggle');
                    datatable.reload();
                } else {
                    swal.fire({
                        "title": "عملیات ناموفق!",
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
                    "confirmButtonText": "باشه"
                });
            }
        });

    };

	return {
		// public functions
		init: function() {
			unitList();
        },
	};
}();

jQuery(document).ready(function() {
    KTDatatableUnit.init();
});