"use strict";
// Class definition

var KTDatatableRemoteAjaxDemo = function () {
    // Private functions

    var selectedTabGrid = 2;


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
                        url: '/driver/travelList/' + selectedTabGrid,
                        // sample custom headers
                        headers: {'x-my-custokt-header': 'some value', 'x-test-header': 'the value'},
                        map: function (raw) {
                            // sample data mapping
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
                        return '<span>' + row.requester + '</span>' +
                            '<p>' + row.requesterMobile + "</p>"

                    },
                },
                {
                    field: 'title',
                    title: 'عنوان',
                    sortable: false,
                    autoHide: false,
                    textAlign: 'center',

                },
                {
                    field: 'origin-destination',
                    title: 'مبدا / مقصد',
                    sortable: false,
                    template: function (row) {
                        return '<p class="kt-margin-b-5">مبدا: ' + (row.beginningAddress != null ? row.beginningAddress : 'ثبت نشده') + '</p>' +
                            '<p class="kt-margin-b-5">مقصد: ' + (row.destinationAddress != null ? row.destinationAddress : 'ثبت نشده') + '</p>'
                    },
                },
                {
                    field: 'date',
                    title: 'تاریخ و ساعت',
                    sortable: false,
                    template: function (row) {
                        return '<p class="kt-margin-b-5">شروع: ' + (row.requestTimeStart != null ? '<span>' + timeStampToYearMonthDayHourLRT(row.requestTimeStart) + '</span>' : 'ثبت نشده') + '</p>' +
                            '<p class="kt-margin-b-5">پایان: ' + (row.requestTimeEnd != null ? '<span>' + timeStampToYearMonthDayHourLRT(row.requestTimeEnd) + '</span>' : 'ثبت نشده') + '</p>'
                    },
                },
                {
                    field: 'Actions',
                    title: 'عملیات',
                    sortable: false,
                    autoHide: false,
                    width: 150,
                    template: function (row) {
                        return '<button data-travel-id="' + row.travelId + '" class="btn btn-sm btn-outline-dark btn-font-sm" title="جزئیات ماموریت">' +
                            '<i class="flaticon2-notepad"></i>  جزئیات </button>' +
                            (selectedTabGrid == 2 ?'<br><br><button data-travel-insert-id="' + row.travelId + '" class="btn btn-sm btn-outline-dark btn-font-sm" title="جزئیات ماموریت">' +
                                '<i class="flaticon2-notepad"></i>  ثبت ماموریت </button>' : '') +
                            (selectedTabGrid == 4 && row.accepted ?'<br><br><button data-travel-insert-id="' + row.travelId + '" class="btn btn-sm btn-outline-dark btn-font-sm" title="جزئیات ماموریت">' +
                                '<i class="flaticon2-notepad"></i>  ویرایش </button>' : '')
                            ;
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

        driverGrid.on('click', '[data-travel-id]', function () {
            $.ajax({
                url: '/driver/travelDetail/' + $(this).data('travel-id'),
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
                        "confirmButtonText": "باشه"
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
                }


            }).on('hidden.bs.modal', function () {
                modal.find('.modal-content').empty();
            });

        });
    };


    return {
        // public functions
        init: function () {
            list();
            getSelectedTab();
        }
    };
}();

jQuery(document).ready(function () {
    KTDatatableRemoteAjaxDemo.init();
});