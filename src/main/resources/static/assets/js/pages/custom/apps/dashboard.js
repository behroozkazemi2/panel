"use strict";

var Dashboard = function () {

    let bestSellProduct_dataTable;
    let lastFactor_dataTable;
    let lastProduct_dataTable;
    let lastComment_dataTable;
    let nowDate;
    let modal = $('#kt_modal_remote');

    // init
    let bestSellerProductDataTable = function () {
        if (bestSellProduct_dataTable) {
            bestSellProduct_dataTable.destroy();
        }
        // init the datatables. Learn more: https://keenthemes.com/metronic/?page=docs&section=datatable
        bestSellProduct_dataTable = $('#bestSellProduct_dataTable').KTDatatable({
            // datasource definition
            data: {
                type: 'remote',
                source: {
                    read: {
                        url: '/dashboard/product/bestSell/list/' + 0,
                        headers: {'x-my-custokt-header': 'some value', 'x-test-header': 'the value'},
                        map: function(raw) {
                            // sample data mapping
                            let dataSet = raw;
                            if (typeof raw.data !== 'undefined') {
                                dataSet = raw.data;
                                $('.total').text(raw.count)
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
                pageSize: 10, // display 20 records per page
                serverPaging: true,
                serverFiltering: true,
                serverSorting: true,
            },

            // layout definition
            layout: {
                scroll: false, // enable/disable datatable scroll both horizontal and vertical when needed.
                footer: false, // display/hide footer
            },

            // column sorting
            sortable: true,

            pagination: true,

            search: {
                input: $('#generalSearch'),
                delay: 400,
            },

            // columns definition
            columns: [
                {
                    field: 'name',
                    title: 'اطلاعات',
                    autoHide: false,
                    template: function (row) {

                        return '<div class="kt-user-card-v2">' +
                            '<div ' + (row.image != 0 ? '' : 'hidden') + ' class="kt-user-card-v2__pic">' +
                            '<img src="/thumbnail/files/0/' + row.image + '" >' +
                            '</div>' +
                            '<div ' + (row.image != 0 ? 'hidden' : '') + ' class="kt-badge kt-badge--xl kt-badge--info">' + row.name.substring(0, 2) + '</div>' +
                            '<div class="kt-user-card-v2__details">' +
                            '<span  class="kt-user-card-v2__name">' + row.name +
                            '</span>' +
                            '</div>' +
                            '</div>';
                    },

                },
                {
                    field: 'cnt',
                    title: 'تعداد',
                    textAlign: 'center',
                    autoHide: false,
                    width:50,
                    template: function (row) {
                        return'<span>' + row.cnt + '  </span>';

                    },
                }]
        });
    };
    let lastFactorDataTable = function () {
        if (lastFactor_dataTable) {
            lastFactor_dataTable.destroy();
        }
        // init the datatables. Learn more: https://keenthemes.com/metronic/?page=docs&section=datatable
        lastFactor_dataTable = $('#lastFactor_dataTable').KTDatatable({
            // datasource definition
            data: {
                type: 'remote',
                source: {
                    read: {
                        url: '/dashboard/lastOrders',
                        headers: {'x-my-custokt-header': 'some value', 'x-test-header': 'the value'},
                        map: function(raw) {
                            // sample data mapping
                            let dataSet = raw;
                            if (typeof raw.data !== 'undefined') {
                                dataSet = raw.data;
                                $('.total').text(raw.count)
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
                pageSize: 10, // display 20 records per page
                serverPaging: true,
                serverFiltering: true,
                serverSorting: true,
            },

            // layout definition
            layout: {
                scroll: false, // enable/disable datatable scroll both horizontal and vertical when needed.
                footer: false, // display/hide footer
            },

            // column sorting
            sortable: true,

            pagination: true,

            search: {
                input: $('#generalSearch'),
                delay: 400,
            },

            // columns definition
            columns: [
                {
                    field: "trackingCode",
                    title: "کد",
                    textAlign: "center",
                    width: 100,
                    autoHide: false,
                },
                {
                    field: "customerName",
                    title: "اطلاعات خریدار",
                    textAlign: "center",
                    width: 100,
                    autoHide: false,
                    template: function (data){
                        return'<section> ' + data.customerName + ' </section>' +
                        '<br/>' +
                        '<section> ' + data.customerMobile + ' </section>' ;
                    }
                },
                {
                    field: "billInsertDate",
                    title: "تاریخ ثبت سفارش",
                    textAlign: "center",
                    width: 80,
                    autoHide: false,
                },
                {
                    field: "finalPrice",
                    title: "قیمت نهایی",
                    textAlign: "center",
                    width: 100,
                      autoHide: false,
                      template: function (row) {
                        return formatMoney(row.finalPrice)
                    }
                },
                {
                    field: "status",
                    title: "وضعیت",
                    width: 100,
                    textAlign: "center",
                    autoHide: false,

                    template: function (row) {
                        let statusColor = '';
                        switch (row.statusId) {
                            /*WAIT_FOR_PAY*/
                            case 1: {
                                statusColor = ' btn-label-warning ';
                                break;
                            }
                            /*PAYED*/
                            case 2: {
                                if (row.paymentMethod == 2){
                                    statusColor = ' btn-label-danger ';
                                    row.status = 'در انتظار تماس با مشتری'
                                }else{
                                    statusColor = ' btn-label-success ';

                                }
                                break;
                            }
                            /*SENDING*/
                            case 3: {
                                statusColor = ' btn-label-info ';
                                break;
                            }
                            /*DELIVERED*/
                            case 4: {
                                statusColor = ' btn-label-primary ';
                                break;
                            }
                            /*CANCELED*/
                            case 5: {
                                statusColor = ' btn-label-danger';
                                break;
                            }

                            default:{
                                statusColor = ' btn-label-dark';
                            }
                        }
                        return '<span class="btn btn-bold btn-sm btn-font-sm  '+statusColor+'">'+row.status+'</span>'
                    }
                },
                {
                    field: 'Actions',
                    title: 'عملیات',
                    width: "auto",
                    sortable: false,
                    autoHide: false,
                    overflow: 'visible',
                    textAlign: 'center',
                    template: function (row) {
                        switch (row.statusId) {
                            case 1: {
                                status = "در انتظار پرداخت پرداخت ";
                                break;
                            }
                            case 2: {
                                status = "ارسال";
                                break;
                            }
                            case 3: {
                                status = "تحویل داده شد";
                                break;
                            }
                            case 4: {
                                status = "تحویل داده شد";
                                break;
                            }

                        }
                        return '<div class="btn-group">' +
                            '<a href="/admin/order/detail/' + row.billId + '" target="_blank"  class="btn btn-sm btn-outline-brand text-primary">اطلاعت</a>' +
                            (row.statusId != 5 && row.statusId != 1  ? '<a data-order-id="' + row.billId + '"   data-status-id="' + row.statusId + '" data-perstatus-txt="' + row.status + '" data-status-text="' + status + '" class="btn btn-sm btn-outline-danger text-danger" >' + status + '</a>' : '') +
                            '</div>';
                    }
                }]

        });
    };

    let lastProductDataTable = function () {
        if (lastProduct_dataTable) {
            lastProduct_dataTable.destroy();
        }
        // init the datatables. Learn more: https://keenthemes.com/metronic/?page=docs&section=datatable
        lastProduct_dataTable = $('#lastProduct_dataTable').KTDatatable({
            // datasource definition
            data: {
                type: 'remote',
                source: {
                    read: {
                        url: '/dashboard/panel/product/list/' + productId,
                        headers: {'x-my-custokt-header': 'some value', 'x-test-header': 'the value'},
                        map: function(raw) {
                            // sample data mapping
                            let dataSet = raw;
                            if (typeof raw.data !== 'undefined') {
                                dataSet = raw.data;
                                $('.total').text(raw.count)
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
                pageSize: 10, // display 20 records per page
                serverPaging: true,
                serverFiltering: true,
                serverSorting: true,
            },

            // layout definition
            layout: {
                scroll: false, // enable/disable datatable scroll both horizontal and vertical when needed.
                footer: false, // display/hide footer
            },

            // column sorting
            sortable: false,

            pagination: true,

            search: {
                input: $('#generalSearch'),
                delay: 400,
            },

            // columns definition
            columns: [
                {
                    field: 'name',
                    title: 'اطلاعات',
                    autoHide: false,
                    template: function (row) {

                        return '<div class="kt-user-card-v2">' +
                            '<div ' + (row.image != 0 ? '' : 'hidden') + ' class="kt-user-card-v2__pic">' +
                            '<img src="/thumbnail/files/0/' + row.image + '" >' +
                            '</div>' +
                            '<div ' + (row.image != 0 ? 'hidden' : '') + ' class="kt-badge kt-badge--xl kt-badge--info">' + row.name.substring(0, 2) + '</div>' +
                            '<div class="kt-user-card-v2__details">' +
                            '<span  class="kt-user-card-v2__name">' + row.name +
                            '</span>' +
                            '</div>' +
                            '</div>';
                    },

                },
                {
                    field: 'brand',
                    title: 'برند  ',
                    textAlign: 'center',
                    width:200,
                    template: function (row) {
                        return'<span>' + row.brand + '  </span>';

                    },
                },
                {
                    field: 'category',
                    title: ' دسته بندی ',
                    textAlign: 'center',
                    autoHide: false,
                    width:200,
                    template: function (row) {
                        return '<span>' + row.category + '  </span>';

                    },
                },

                {
                    field: 'Actions',
                    title: 'عملیات',
                    textAlign: 'center',
                    width: 200,
                    template: function (row) {
                        return '<div class="btn-group text-center">' +
                            '<a href="/admin/product/edit/' + row.id + '" target="_blank" class="btn btn-sm btn-outline-brand " data-edit-id="' + row.id + '">ویرایش</a>' +
                            '<a href="/admin/comment/' + row.id + '" target="_blank" class="btn btn-sm btn-outline-success ml-1 mr-1 " data-edit-id="' + row.id + '">کامنت‌ها</a>' +
                            '<button class="btn btn-sm btn-outline-danger " data-delete-id="' + row.id + '">حذف</button>' +
                            '</div>';
                    }

                }]

        })
    };
    let lastCommentDataTable = function () {
        if (lastComment_dataTable) {
            lastComment_dataTable.destroy();
        }
        lastComment_dataTable = $('#lastComment_dataTable').KTDatatable({
            data: {
                type: 'remote',
                source: {
                    read: {
                        url: '/dashboard/comment/list/' + 0 + '/' + 0,
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
                },
                {
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
                    autoHide: true,
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
                    autoHide: true,
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


        lastComment_dataTable.on('click', '.show_comment', function () {
            let txt = $(this).data('txt');
            swal.fire({
                title: '',
                text: txt,
                type: 'warning',
                showCancelButton: false,
            })
        });
        lastComment_dataTable.on('click', '[data-id]', function () {
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


    var getOrderDataForTopCart = function () {

        $.ajax({
            url: '/dashboard/getAllOrderCartData/0',
            type: 'post',
            success: function (response) {
                $('#allOrderCount').text(response.allOrderCount);
                $('#allOrderAmount').text(formatMoney(response.allOrderAmount));

                $('#allConfirmOrderCount').text(response.allConfirmOrderCount);
                $('#allConfirmOrderAmount').text(formatMoney(response.allConfirmOrderAmount));

                $('#allWaitingOrderCount').text(response.allWaitingOrderCount);
                $('#allWaitingOrderAmount').text(formatMoney(response.allWaitingOrderAmount));

            },
            error: function () {
            }
        });
    };

    var numHelper = 0;


    let initSellDateProductPriceChart = function () {
        let formFd = new FormData();
        formFd.set("year", $('.per_month_status_year').val() );
        formFd.set("month", $('.per_month_status_month').val());
        formFd.set("groupByMonth", $('.groupByMonth').val() === 'true');
        $.ajax({
            url: '/dashboard/order/chart',
            method: 'post',
            data: formFd,
            contentType: false,
            processData: false,
            beforeSend:function () {
                $('#chartdiv').empty();
                $("#title_function_type_chart_div").removeClass('d-none');
            },
            success: function (res) {
                sellDateProductPriceChart(res);
            },
            error: function () {

            },
            complete: function () {

            }
        });

    };
    let initSellCategoryProductChart = function () {
        let formFd = new FormData();
        formFd.set("year", $('.per_month_status_year').val() );
        formFd.set("month", $('.per_month_status_month').val());
        formFd.set("groupByMonth", $('.groupByMonth').val() === 'true');
        $.ajax({
            url: '/dashboard/category/order/chart',
            method: 'post',
            data: formFd,
            contentType: false,
            processData: false,
            beforeSend:function () {
                $('#chartdiv').empty();
                $("#title_function_type_chart_div").removeClass('d-none');
            },
            success: function (res) {
                sellCategoryProductChart(res);
            },
            error: function () {

            },
            complete: function () {

            }
        });

    };


    let sellDateProductPriceChart = function (response) {

        var chart = am4core.create("chartdiv", am4charts.XYChart);
        chart.data = response;
        chart.rtl = true;

        /* Create axes */
        var categoryAxis = chart.xAxes.push(new am4charts.CategoryAxis());
        categoryAxis.dataFields.category = "persianDate";
        categoryAxis.renderer.minGridDistance = 30;

        /* Create value axis */
        var valueAxis = chart.yAxes.push(new am4charts.ValueAxis());


        var lineSeries = chart.series.push(new am4charts.LineSeries());
        lineSeries.name = "مبلغ";
        lineSeries.dataFields.valueY = "price";
        lineSeries.dataFields.categoryX = "persianDate";

        lineSeries.stroke = am4core.color("#1e1e2d");
        lineSeries.strokeWidth = 3;
        lineSeries.propertyFields.strokeDasharray = "lineDash";
        lineSeries.tooltip.label.textAlign = "middle";

        var bullet = lineSeries.bullets.push(new am4charts.Bullet());
        bullet.fill = am4core.color("#1e1e2d"); // tooltips grab fill from parent by default
        bullet.tooltipText = "[#fff font-size: 13px]{name} در {categoryX}: [/][#fff font-size: 15px]{valueY}[/]\n" +
            " تعداد فاکتور: {count} "+
            "\n"+
            " تعداد محصول فروش رفته: {productCount}";
        var circle = bullet.createChild(am4core.Circle);
        circle.radius = 4;
        circle.fill = am4core.color("#fff");
        circle.strokeWidth = 3;
        // Add cursor
        // chart.cursor = new am4charts.XYCursor();
        // chart.cursor.fullWidthLineX = true;
        // chart.cursor.xAxis = dateAxis;
        // chart.cursor.lineX.strokeWidth = 0;
        // chart.cursor.lineX.fill = am4core.color("#000");
        // chart.cursor.lineX.fillOpacity = 0.1;
    };
    let sellCategoryProductChart = function (response) {

        var container = am4core.create("sell_category", am4core.Container);
        container.width = am4core.percent(100);
        container.height = am4core.percent(100);
        container.layout = "horizontal";

        console.log(response);
        var chart = container.createChild(am4charts.PieChart);

// Add data
        chart.data =
            response;

// Add and configure Series
        var pieSeries = chart.series.push(new am4charts.PieSeries());
        let label = chart.chartContainer.createChild(am4core.Label);
        label.text = "دسته‌بندی";
        label.align = "center";
        pieSeries.dataFields.value = "price";
        pieSeries.dataFields.category = "categoryName";
        pieSeries.tooltip.disabled = true;
        pieSeries.slices.template.states.getKey("active").properties.shiftRadius = 0;
        pieSeries.labels.template.text =
            "دسته بندی: " +
            "{category}" +
            "\n" +
            " مجموع مبلغ: " +
            "{value} "  +
            "\n" +
            " تعداد: " +
            "{count} ";


        pieSeries.alignLabels = false;
        // pieSeries.labels.template.bent = true;
        pieSeries.labels.template.radius = -10;
        // pieSeries.labels.template.padding(30, 30, 30, 30);
        pieSeries.labels.template.fill = am4core.color("#1e1e2d");
        pieSeries.ticks.template.disabled = true;


        pieSeries.slices.template.events.on("hit", function(event) {
            selectSlice(event.target.dataItem);
        })

        var chart2 = container.createChild(am4charts.PieChart);
        chart2.width = am4core.percent(40);
        chart2.radius = am4core.percent(80);

// Add and configure Series
        var pieSeries2 = chart2.series.push(new am4charts.PieSeries());
        pieSeries2.dataFields.value = "price";
        pieSeries2.dataFields.category = "productName";
        pieSeries2.labels.template.text =
            "عنوان محصول: " +
            "{category}" +
            "\n" +
            " مجموع مبلغ: " +
            "{value} "  +
            "\n" +
            " تعداد: " +
            "{count} ";

        pieSeries2.alignLabels = false;
        // pieSeries2.labels.template.bent = true;
        pieSeries2.labels.template.radius = -10;
        pieSeries2.labels.template.padding(0, 0, 0, 0);
        pieSeries2.labels.template.fill = am4core.color("#1e1e2d");
        pieSeries2.ticks.template.disabled = true;

        pieSeries2.slices.template.states.getKey("active").properties.shiftRadius = 0;
        pieSeries2.labels.template.disabled = false;
        pieSeries2.tooltip.disabled = true;

        pieSeries2.alignLabels = false;
        pieSeries2.events.on("positionchanged", updateLines);

        var interfaceColors = new am4core.InterfaceColorSet();

        var line1 = container.createChild(am4core.Line);
        line1.strokeDasharray = "2,2";
        line1.strokeOpacity = 0.5;
        line1.stroke = interfaceColors.getFor("alternativeBackground");
        line1.isMeasured = false;

        var line2 = container.createChild(am4core.Line);
        line2.strokeDasharray = "2,2";
        line2.strokeOpacity = 0.5;
        line2.stroke = interfaceColors.getFor("alternativeBackground");
        line2.isMeasured = false;

        var selectedSlice;

        function selectSlice(dataItem) {

            selectedSlice = dataItem.slice;

            var fill = selectedSlice.fill;

            console.log(dataItem.dataContext);
            var count = dataItem.dataContext.subDetail.length;
            pieSeries2.colors.list = [];
            for (var i = 0; i < count; i++) {
                pieSeries2.colors.list.push(fill.brighten(i * 2 / count));
            }

            chart2.data = dataItem.dataContext.subDetail;
            pieSeries2.appear();

            var middleAngle = selectedSlice.middleAngle;
            var firstAngle = pieSeries.slices.getIndex(0).startAngle;
            var animation = pieSeries.animate([{ property: "startAngle", to: firstAngle - middleAngle }, { property: "endAngle", to: firstAngle - middleAngle + 360 }], 600, am4core.ease.sinOut);
            animation.events.on("animationprogress", updateLines);

            selectedSlice.events.on("transformed", updateLines);

        }


        function updateLines() {
            if (selectedSlice) {
                var p11 = { x: selectedSlice.radius * am4core.math.cos(selectedSlice.startAngle), y: selectedSlice.radius * am4core.math.sin(selectedSlice.startAngle) };
                var p12 = { x: selectedSlice.radius * am4core.math.cos(selectedSlice.startAngle + selectedSlice.arc), y: selectedSlice.radius * am4core.math.sin(selectedSlice.startAngle + selectedSlice.arc) };

                p11 = am4core.utils.spritePointToSvg(p11, selectedSlice);
                p12 = am4core.utils.spritePointToSvg(p12, selectedSlice);

                var p21 = { x: 0, y: -pieSeries2.pixelRadius };
                var p22 = { x: 0, y: pieSeries2.pixelRadius };

                p21 = am4core.utils.spritePointToSvg(p21, pieSeries2);
                p22 = am4core.utils.spritePointToSvg(p22, pieSeries2);

                line1.x1 = p11.x;
                line1.x2 = p21.x;
                line1.y1 = p11.y;
                line1.y2 = p21.y;

                line2.x1 = p12.x;
                line2.x2 = p22.x;
                line2.y1 = p12.y;
                line2.y2 = p22.y;
            }
        }

        chart.events.on("datavalidated", function() {
            setTimeout(function() {
                selectSlice(pieSeries.dataItems.getIndex(0));
            }, 1000);
        });
    };

    let initSelect2 = function (){

        $('.per_month_status_year').select2({
            placeholder: "انتخاب سال",
        });

        $('.per_month_status_month').select2({
            placeholder: "انتخاب ماه",
        });
        $('.groupByMonth').select2({
            placeholder: "انتخاب دسته‌بندی",
        });

        $('.per_month_status_year').on('select2:select',function() {
            if($(this).val() == 0){
                $('.per_month_status_month').val(0).trigger('change');
                $('.per_month_status_month').attr('disabled', true);
            }else{
                $('.per_month_status_month').attr('disabled', false);
            }
            initSellCategoryProductChart();
        });
        $('.per_month_status_month,.groupByMonth').on('select2:select',function() {
            initSellDateProductPriceChart();
            initSellCategoryProductChart();
        });

    }

    return {
        init: function () {
            initSelect2();
            getOrderDataForTopCart();
            bestSellerProductDataTable();
            initSellDateProductPriceChart();
            initSellCategoryProductChart();
            lastFactorDataTable();
            lastProductDataTable();
            lastCommentDataTable();
        },
    };
}();

jQuery(document).ready(function () {
    Dashboard.init();
});