"use strict";
// Class definition

let orderDetail = function () {

    let initLocationInMap = function () {
        initCustomerAddressMap('kt_location', $('.latlon').data('lat'), $('.latlon').data('lon') );
    }
    // selected records status update
    return {
        // public functions
        init: function () {
            // initTable();
            initLocationInMap();
            // selectedFetch();


        },
    };
}();

// On document ready
KTUtil.ready(function () {
    orderDetail.init();
});