"use strict";
// Class definition

var KTDatatableRemoteAjaxDemo = function () {
    // Private functions

    var selectedTabGrid = 1;


    var getSelectedTab = function () {
        $(document).on('click', '#tablist a', function () {
            selectedTabGrid = $(this).data('id');
            list();
        });
    };

    var nowDate;
    var driverGrid;
    var originIconFeature;
    var destinationIconFeature;
    // basic demo
    var list = function () {
        var modal = $('#kt_modal_remote');
        if (driverGrid) {
            driverGrid.destroy();
        }

        driverGrid = $('.kt-datatable').KTDatatable({
            // datasource definition
            data: {
                type: 'remote',
                source: {
                    read: {
                        url: '/admin/user/travelList/' + selectedTabGrid,
                        // sample custom headers
                        headers: {'x-my-custokt-header': 'some value', 'x-test-header': 'the value'},
                        map: function (raw) {
                            // sample data mapping
                            console.log(raw);
                            var dataSet = raw;
                            if (typeof raw.data !== 'undefined') {
                                dataSet = raw.data;
                                nowDate = raw.nowDate;
                                $('.total').text(raw.meta.total);
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


            // layout definition
            layout: {
                dir:'rtl',
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
                    title: 'متقاضی',
                    sortable: false,
                    autoHide: false,
                    width: 100,
                    template: function (row) {
                        return '<span>' + row.requesterFirstName + ' ' + row.requesterLastName + '</span>' +
                            '<p>' + row.requesterMobile + "</p>"

                    },
                },
                {
                    field: 'title',
                    title: 'عنوان ماموریت',
                    sortable: false,
                    autoHide: false,
                    textAlign: 'center',

                },
                {
                    field: 'origin-destination',
                    title: 'مبدا / مقصد',
                    sortable: false,
                    template: function (row) {
                        return '<p class="kt-margin-b-5">مبدا: ' + (row.origin != null ? row.origin : 'ثبت نشده') + '</p>' +
                            '<p class="kt-margin-b-5">مقصد: ' + (row.destination != null ? row.destination : 'ثبت نشده') + '</p>'
                    },
                },
                {
                    field: 'date',
                    title: 'تاریخ و ساعت',
                    sortable: false,
                    template: function (row) {
                        return '<p class="kt-margin-b-5">شروع: ' + (row.requesterStart != null ? '<span>' + timeStampToYearMonthDayHourLRT(row.requesterStart) + '</span>' : 'ثبت نشده') + '</p>' +
                            '<p class="kt-margin-b-5">پایان: ' + (row.requesterEnd != null ? '<span>' + timeStampToYearMonthDayHourLRT(row.requesterEnd) + '</span>' : 'ثبت نشده') + '</p>'
                    },
                },
                {
                    field: 'driver',
                    title: 'راننده/خودرو',
                    sortable: false,
                    template: function (row) {
                        return '<p class="kt-margin-b-5">' + ((row.driverName != null && row.driverName != "") ? row.driverName : 'در انتظار' ) + '</p>' +
                            '<p class="kt-margin-b-5">' + ((row.driverMobile != null && row.driverMobile != "") ? row.driverMobile : '' ) + '</p>' +
                            '<p class="kt-margin-b-5">' +
                            (row.vehiclePlate == null ? '' :
                                row.vehiclePlate.first + ' ' + row.vehiclePlate.character + ' ' + row.vehiclePlate.second + ' - ' + row.vehiclePlate.cityNumber) +
                            '</p>' +
                            '<p class="kt-margin-b-5">' + (( row.vehicleName != null && row.vehicleName != "" ) ? row.vehicleName : '' ) + '</p>';

                    },
                },
                {
                    field: 'Actions',
                    title: 'عملیات',
                    sortable: false,
                    autoHide: false,
                    template: function (row) {
                        return '<button data-travel-id="' + row.id + '" class="btn btn-sm btn-outline-dark btn-icon kt-margin-5" title="جزئیات ماموریت">' +
                            '<i class="la la-newspaper-o"></i></button>' +
                            (selectedTabGrid == 2 || selectedTabGrid == 1? '<button data-del-travel-id="' + row.id + '" title="لغو" class="btn btn-sm btn-outline-danger btn-icon kt-margin-5" ><i class="la la-trash"></i></button>'
                                : '');
                    },
                }],

        });

        $('#kt_form_status').on('change', function () {
            driverGrid.search($(this).val().toLowerCase(), 'Status');
        });

        $('#kt_form_type').on('change', function () {
            driverGrid.search($(this).val().toLowerCase(), 'Type');
        });

        $('#kt_form_status,#kt_form_type').selectpicker();

        var drawTravelLine = function(data) {
            $.each(data, function( index, value ) {
                var coordinates = [];
                $.each(value,function (index,val) {
                    coordinates.push(ol.proj.transform([val.lng, val.lat], 'EPSG:4326', 'EPSG:3857'));
                    var feature = new ol.Feature();
                    var geometry = new ol.geom.Point(ol.proj.transform([val.lng, val.lat], 'EPSG:4326', 'EPSG:3857'));
                    feature.setGeometry(geometry);
                    vectorSource.addFeature(feature);

                });
                var layerLines = new ol.layer.Vector({
                    source: new ol.source.Vector({
                        features: [new ol.Feature({
                            geometry: new ol.geom.LineString(coordinates),
                            name: 'Line'
                        })]
                    }),
                    style : new ol.style.Style({
                        stroke : new ol.style.Stroke({
                            color : 'red',
                            width: 4
                        })
                    })
                });


                map.addLayer(layerLines)

            });
        };
        driverGrid.on('click','[data-del-travel-id]',function () {
            $.ajax({
                url: '/admin/user/travel/delete/' + $(this).data('del-travel-id'),
                type: 'post',
                success: function (response) {
                    if (response.result) {
                        swal.fire({
                            "title": 'عملیات موفق',
                            "text": 'ماموریت لغو شد',
                            "type": 'success',
                            "confirmButtonClass": "btn btn-secondary",
                            "confirmButtonText": "تایید"
                        });
                        driverGrid.reload();
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

        });
        driverGrid.on('click', '[data-travel-id]', function () {
            $.ajax({
                url: '/admin/user/travelDetail/' + $(this).data('travel-id'),
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

            modal.on('shown.bs.modal', function () {
                $("#kt_gmap_8").empty();
                initMap('kt_gmap_8');
                var orginLat = modal.find('[data-orgin-lat]').data('orgin-lat');
                var orginLong = modal.find('[data-orgin-long]').data('orgin-long');
                var destinationLat = modal.find('[data-destination-lat]').data('destination-lat');
                var destinationlong = modal.find('[data-destination-long]').data('destination-long');
                if (orginLat != null && orginLat != 0 && orginLat != undefined
                    && orginLong != null && orginLong != 0 && orginLong != undefined
                    && destinationLat != null && destinationLat != 0 && destinationLat != undefined
                    && destinationlong != null && destinationlong != 0 && destinationlong != undefined) {

                    if (originIconFeature != undefined) {
                        vectorSource.clear()

                    }
                    if (destinationIconFeature != undefined) {
                        vectorSource.clear()

                    }

                    originIconFeature = new ol.Feature({

                        geometry: new ol.geom.Point(ol.proj.transform([orginLong, orginLat], 'EPSG:4326', 'EPSG:3857')),
                        name: 'points',
                        population: 4000,
                        rainfall: 500
                    });

                    originIconFeature.setStyle(new ol.style.Style({
                        image: new ol.style.Icon(({
                            anchor: [0.49, 0.5],
                            anchorOrigin: 'bottom-right',
                            anchorXUnits: 'fraction',
                            anchorYUnits: 'pixels',
                            scale: 0.3,
                            src: '/assets/images/origin.png'
                        }))
                    }));
                    vectorSource.addFeature(originIconFeature);


                    destinationIconFeature = new ol.Feature({

                        geometry: new ol.geom.Point(ol.proj.transform([destinationlong, destinationLat], 'EPSG:4326', 'EPSG:3857')),
                        name: 'points',
                        population: 4000,
                        rainfall: 500
                    });
                    destinationIconFeature.setStyle(new ol.style.Style({
                        image: new ol.style.Icon(({
                            anchor: [0.49, 0.5],
                            anchorOrigin: 'bottom-right',
                            anchorXUnits: 'fraction',
                            anchorYUnits: 'pixels',
                            scale: 0.3,
                            src: '/assets/images/destination.png'
                        }))
                    }));
                    vectorSource.addFeature(destinationIconFeature);

                    var extent = ol.proj.transformExtent(
                        [orginLong, orginLat,
                            destinationlong, destinationLat],
                        "EPSG:4326", "EPSG:3857"
                    );

                    map.getView().fit( extent, map.getSize() );
                }else{
                    modal.find('#marker-alert').show();
                }


                $.ajax({
                    url: '/admin/user/travelPoint/' + modal.find('[data-travel-id]').data('travel-id'),
                    type: 'post',
                    success: function (response) {
                        // KTApp.unprogress(btn);
                        if (response.payload !=null && !$.isEmptyObject(JSON.parse(response.payload)[0])) {
                            drawTravelLine(JSON.parse(response.payload));
                        } else {
                            modal.find('#point-alert').show();
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


            }).on('hidden.bs.modal', function () {
                modal.find('#point-alert').hide();
                modal.find('#marker-alert').hide();
                modal.find('.modal-content').empty();
            });

        });
    };


    return {
        // public functions
        init: function () {
            list();
            getSelectedTab();
        },
    };
}();

jQuery(document).ready(function () {
    KTDatatableRemoteAjaxDemo.init();
});