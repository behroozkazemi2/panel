"use strict";
// Class definition

var KTDatatableRemoteAjaxDemo = function() {
    // Private functions

    var nowDate;
    var logGrid;
    // basic demo
    var list = function() {

        if (logGrid) {
            logGrid.destroy();
        }

        logGrid = $('.kt-datatable').KTDatatable({
            // datasource definition
            data: {
                type: 'remote',
                source: {
                    read: {
                        url: '/admin/log/list',
                        // sample custom headers
                        headers: {'x-my-custokt-header': 'some value', 'x-test-header': 'the value'},
                        map: function(raw) {
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
                pageSize: 20,
                serverPaging: true,
                serverFiltering: true,
                serverSorting: true,
            },



            // layout definition
            layout: {
                footer: false,
            },

            // column sorting
            sortable: false,

            pagination: true,

            search: {
                input: $('#generalSearch'),
                delay: 300,
            },

            // columns definition
            columns: [
                {
                    field: 'page',
                    title: 'فعالیت',
                    sortable: false,
                    autoHide: false
                },
                {
                    field: 'user',
                    title: 'کاربر',
                    width: 100,
                    sortable: false,
                    textAlign: 'center'
                },
                {
                    field: 'date',
                    title: 'تاریخ',
                    sortable: false,
                    textAlign: 'center',
                    width: 100,
                    template: function(row) {
                        return 	(row.date != null ? timeStampToYearMonthDay(row.date) : 'ثبت نشده')
                    },
                },
                {
                    field: 'dateHour',
                    title: 'ساعت',
                    width: 100,
                    textAlign: 'center',
                    sortable: false,
                    template: function(row) {
                        return 	(row.date != null ? timeStampToHourMinutesSecondLRT(row.date)  : 'ثبت نشده')
                    },
                },

                {
                    field: 'ip',
                    title: 'ip',
                    sortable: false,
                    autoHide: false,
                    width: 100,
                    textAlign: 'center'
                },
                {
                    field: 'machineCode',
                    title: 'کد',
                    sortable: false,
                    autoHide: false,
                    width: 150,
                    textAlign: 'center'
                }
                // {
                //     field: 'os',
                //     title: 'سیستم عامل',
                //     sortable: false,
                //     autoHide: false,
                //     width: 150,
                //     textAlign: 'center'
                // }

            ],

        });
    };

    return {
        // public functions
        init: function() {
            list();
        },
    };
}();

jQuery(document).ready(function() {
    KTDatatableRemoteAjaxDemo.init();
});