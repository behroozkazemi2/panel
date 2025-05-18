"use strict";
// Class definition

var KTDatatableRemoteAjaxDemo = function() {
	// Private functions

	var nowDate;
    var datatable;
    // basic driverList
	var driverList = function() {
        var modal =$('#kt_modal_remote');
        var mapModal =$('#kt_modal_map');

		datatable = $('.kt-datatable').KTDatatable({
			// datasource definition
			data: {
				type: 'remote',
				source: {
					read: {
						url: '/admin/driver/list',
						// sample custom headers
						headers: {'x-my-custokt-header': 'some value', 'x-test-header': 'the value'},
						map: function(raw) {
							// sample data mapping
							var dataSet = raw;
							if (typeof raw.data !== 'undefined') {
								dataSet = raw.data;
                                nowDate = raw.nowDate;
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
				serverSorting: true,
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
                delay: 300,
            },

			// columns definition
			columns: [
				{
					field: 'RecordID',
					title: 'راننده',
					sortable: false,
                    autoHide: false,
                    template: function (row) {
                        return row.avatarId != 0 ? '<div class="kt-user-card-v2">' +
                            '<div class="kt-user-card-v2__pic">' +
                            '<img src="/thumbnail/app/get/' + row.avatarId + '/200" class="m-img-rounded kt-marginless" alt="photo">' +
                            '</div>' +
                            '<div class="kt-user-card-v2__details">' +
                            '<span class="kt-user-card-v2__name">' + row.firstName + ' ' + row.lastName + '</span>' +
                            '<span class="kt-user-card-v2__name">' + row.username + '</span>' +
                            '<span class="kt-user-card-v2__desc">' + row.mobile + '</span>' +
                            '</div>' +
                            '</div>'
                        : '' +
                        '<div class="kt-user-card-v2">' +
                        '<div class="kt-user-card-v2__pic">' +
                        '<div class="kt-badge kt-badge--xl kt-badge--' + ["success", "brand", "danger", "success", "warning", "dark", "primary", "info"][KTUtil.getRandomInt(0, 7)] + '">' +
                        '<span>' + row.firstName.substring(0, 1) + '</span></div>' +
                        '</div>' +
                        '<div class="kt-user-card-v2__details">' +
                        '<span class="kt-user-card-v2__name">' + row.firstName + ' ' + row.lastName + '</span>' +
                        '<span class="kt-user-card-v2__name">' + row.username + '</span>' +
                        '<span class="kt-user-card-v2__desc">' + row.mobile + "</span>" +

                        "</div>" +
                        "</div>"
                    },
				},
				{
                    field: 'unitStatus',
                    title: 'واحد/وضعیت',
					width: 100,
                    sortable: false,
                    textAlign: 'center',
                    template: function(row) {

                    	if (row.status.id == null) {
                    		return 'ثبت نشده';
						}

                    	var statusColor;

                    	switch (row.status.id){
							case 1:
                                statusColor = 'danger';
                                break;
							case 2:
                                statusColor = 'info';
                                break;
                            case 3:
                                statusColor = 'success';
                                break;
							default:
                                statusColor = 'dark';
						}

                        return '<p>' + ( row.unit != null ? row.unit.name : '' ) + '</p><span class="kt-badge kt-badge--' + statusColor + ' kt-badge--inline kt-badge--pill">' + row.status.name + '</span>'+
                            (row.netUsage > 0 ? '<br><br><span class="kt-user-card-v2__name"> ' +
                                (row.netUsage.toFixed(0) >= 1024 ?
                                (row.netUsage.toFixed(0) / 1024) .toFixed(0) + 'MB' :
                                 row.netUsage.toFixed(0) + 'KB' ) +
                                '  </span>':'');
					}
				},

                {
                    field: 'vehicle',
                    title: 'مشخصات خودرو',
                    sortable: false,
                    textAlign: 'center',
                    template: function(row) {
                        return 	row.vehicle == null ? 'فاقد خودرو' :
								row.vehicle.plate == null ? 'پلاک ثبت نشده' :
                            	row.vehicle.plate.first + ' ' + row.vehicle.plate.character + ' ' + row.vehicle.plate.second + ' - ' + row.vehicle.plate.cityNumber + '<br>' +
								'<p>نوع خودرو: ' + (row.vehicle.vehicle != null ? row.vehicle.vehicle.name : '-' ) + '</p>'
                    },
                },
				{
					field: 'expire',
					title: 'تاریخ اعتبار',
                    sortable: false,
                    autoHide: false,
                    template: function(row) {
                        return 	row.vehicle == null ? 'فاقد خودرو' :
							(
								'<p class="kt-margin-b-5">بیمه‌ ثالث: '  + (row.vehicle.personInsuranceExpireDate != null ? '<span class="' + getExpireDateTextColor(row.vehicle.personInsuranceExpireDate) + '">' + timeStampToYearMonthDay(row.vehicle.personInsuranceExpireDate) + '</span>' : 'ثبت نشده') + '</p>' +
								'<p class="kt-margin-b-5">بیمه‌ بدنه: '  + (row.vehicle.bodyInsuranceExpireDate != null ? '<span class="' + getExpireDateTextColor(row.vehicle.bodyInsuranceExpireDate) + '">' + timeStampToYearMonthDay(row.vehicle.bodyInsuranceExpireDate) + '</span>' : 'ثبت نشده') + '</p>' +
								'<p class="kt-margin-b-5">معاینه‌فنی: ' + (row.vehicle.technicalExpireDate != null ? '<span class="' + getExpireDateTextColor(row.vehicle.technicalExpireDate) + '">' + timeStampToYearMonthDay(row.vehicle.technicalExpireDate) + '</span>' : 'ثبت نشده') + '</p>' +
								'<p class="kt-margin-b-0">گواهینامه: ' + (row.vehicle.licenseExpireDate   != null ? '<span class="' + getExpireDateTextColor(row.vehicle.licenseExpireDate)   + '">' + timeStampToYearMonthDay(row.vehicle.licenseExpireDate)   + '</span>'   : 'ثبت نشده') + '</p>'
							)
					},
				},
				{
					field: 'Actions',
					title: 'عملیات',
					sortable: false,
                    autoHide: false,
					overflow: 'visible',
                    textAlign: 'center',
                    template: function(row) {
                        return '<a title="ویرایش اطلاعات راننده" class="btn btn-outline-brand btn-elevate btn-icon kt-margin-5" href="/admin/driver/edit/' + row.id + '/' + row.vehicle.id + '"><i class="la la-edit"></i></a>' +
							   '<button type="button" title="حذف راننده" class="btn btn-outline-danger btn-elevate btn-icon kt-margin-5 " data-driver-vehicle = "' + row.id +'/'+ row.vehicle.id + '"><i class="la la-trash"></i></button>' +
                               '<button type="button" title="موقعیت راننده" class="btn btn-outline-dark btn-elevate btn-icon kt-margin-5 " data-driver-location = "' + row.id + '"><i class="la la-map-marker"></i></button>' +
                            (row.verifiedMacType == 2?
                                '<button type="button" title="فعالسازی نرم افزار " class="btn btn-outline-success btn-elevate btn-icon kt-margin-5 " data-accepted-mac = "' + row.id +'"><i class="la la-check-circle"></i></button>':
                                (row.verifiedMacType == 3?
                                    '<button type="button" title="غیر فعال کردن نرم افزار " class="btn btn-outline-warning btn-elevate btn-icon kt-margin-5 " data-app-ban = "' + row.id +'"><i class="la la-ban"></i></button>':'' ));
                    },
				}],
		});

        datatable.on('click','[data-accepted-mac]',function () {
            $.ajax({
                url: '/admin/driver/deviceInfo/' + $(this).data('accepted-mac'),
                type: 'post',
                dataType: "html",
                success: function (response) {
                    // KTApp.unprogress(btn);
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
                        "confirmButtonText": "تایید"
                    });
                }
            });
        });

		datatable.on('click','[data-driver-vehicle]',function () {
		    var driverVehicle = $(this).data('driver-vehicle');
            swal.fire({
                title: 'حذف راننده',
                text: "رانند حذف شود؟",
                type: 'warning',
                showCancelButton: true,
                cancelButtonText: 'خیر',
                confirmButtonText: 'بلی'
            }).then(function (result) {
                if (result.value) {
                    $.ajax({
                        url: '/admin/driver/delete/' + driverVehicle,
                        type: 'post',
                        success: function (response) {
                            // KTApp.unprogress(btn);
                            if (response.result) {
                                swal.fire({
                                    "title": 'عملیات موفق',
                                    "text": 'راننده با موفقیت حذف شد!',
                                    "type": 'success',
                                    "confirmButtonClass": "btn btn-secondary",
                                    "confirmButtonText": "تایید"
                                });
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
                }

            });

        });

        datatable.on('click','[data-app-ban]',function () {
            var driverBanId = $(this).data('app-ban');
            swal.fire({
                title: 'مسدود کردن نرم افزار',
                text: "نرم‌افزار راننده مسدود شود؟",
                type: 'warning',
                showCancelButton: true,
                cancelButtonText: 'خیر',
                confirmButtonText: 'بلی'
            }).then(function (result) {
                if (result.value) {
                    $.ajax({
                        url: '/admin/driver/ban/' + driverBanId,
                        type: 'post',
                        success: function (response) {
                            // KTApp.unprogress(btn);
                            if (response.result) {
                                swal.fire({
                                    "title": 'عملیات موفق',
                                    "text": 'نرم‌افزار با موقیت مسدود شد!',
                                    "type": 'success',
                                    "confirmButtonClass": "btn btn-secondary",
                                    "confirmButtonText": "تایید"
                                });
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
                                "confirmButtonText": "تایید"
                            });
                        }
                    });
                }

            });

        });

        datatable.on('click','[data-driver-location]',function () {
            var driverLocationId = $(this).data('driver-location');
            $.ajax({
                url: '/admin/driver/lastLocation/' + driverLocationId,
                type: 'post',
                success: function (response) {
                    // KTApp.unprogress(btn);
                    if (response.result) {
                        mapModal.modal('show');
                        mapModal.on('shown.bs.modal',function () {
                            if(map==null) {
                                initMap('kt_driver_location');
                            }
                            addPointOnMap(JSON.parse(response.payload));
                        });

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
                        "confirmButtonText": "تایید"
                    });
                }
            });

        });

		$('#kt_form_status').on('change', function() {
		  datatable.search($(this).val().toLowerCase(), 'Status');
		});

		$('#kt_form_type').on('change', function() {
		  datatable.search($(this).val().toLowerCase(), 'Type');
		});
        modal.on('shown.bs.modal', function () {
            modal.find('[data-accept-device]').on('click',function () {
                acceptMac($(this).data('accept-device'))
            });
            modal.find('[data-reject-device]').on('click',function () {
                acceptMac($(this).data('reject-device'))
            });
        }).on('hidden.bs.modal', function () {
            modal.find('.modal-content').empty();
        });


	};

    var addPointOnMap = function (value) {
        vectorSource.clear();
        var marker = new ol.Feature({
            geometry: new ol.geom.Point(ol.proj.transform([value.lng, value.lat], 'EPSG:4326', 'EPSG:3857')),
            name: 'points',
            population: 4000,
            rainfall: 500,
            fid: value.driverId,
            attributes: {
                accuracy: value.accuracy,
                speed: value.speed,
                deviceDate: value.deviceDate,
                serverDate: value.serverDate,
                driverId: value.driverId,
                avatarId: value.avatarId,
                status: value.status,
                driverName: value.driverName
            }
        });

        marker.setStyle(new ol.style.Style({
            image: new ol.style.Icon(({
                anchor: [0, 0],
                anchorOrigin: 'bottom-right',
                anchorXUnits: 'fraction',
                anchorYUnits: 'pixels',
                scale: .6,
                src: getIconUrl(value.status)
            }))
        }));

        vectorSource.addFeature(marker);
        map.getView().setCenter(ol.proj.transform([value.lng, value.lat], 'EPSG:4326', 'EPSG:3857'));
        map.getView().setZoom(15);
    };

    var acceptMac = function (data) {
        $.ajax({
            url: '/admin/driver/acceptMAC/'+ data,
            type: 'post',
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


    var getExpireDateTextColor = function(expireDate) {

        if (expireDate > nowDate && expireDate < (nowDate + (1000*60*60*24*5)) ){
            return 'kt-font-warning';
        }
        if (expireDate < nowDate){
            return 'kt-font-danger';
        }
        return '';
    };

	return {
		// public functions
		init: function() {
			driverList();
        },
	};
}();

jQuery(document).ready(function() {
	KTDatatableRemoteAjaxDemo.init();
});