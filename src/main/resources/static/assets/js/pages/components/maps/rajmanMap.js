/**
 * Created by thunderbolt on 10/31/19.
 */

var map;
var getIconUrl = function (status) {
    switch (status){
        case 1 : return '/assets/images/car-r.png';
        case 2: return '/assets/images/car-b.png';
        case 3: return '/assets/images/car-g.png';
        case 4: return '/assets/images/car-black.png';
        default : return '/assets/images/car-r.png'
    }
};
var vectorSource = new ol.source.Vector({});

var vectorLayer = new ol.layer.Vector({
    source: vectorSource
});

var initMap = function (target) {
    map = new ol.Map({
        target: target,
        key: 'web.Zw2gC692Eo64xyu2acOKZ2E9YtTPs7usDwJgCSjh',
        maptype: 'neshan',
        view: new ol.View({
            center: ol.proj.fromLonLat([59.449611, 36.356213]),
            zoom: 14
        }),
        layers: [
            vectorLayer
        ]
    });
    // selectOnMap();
};