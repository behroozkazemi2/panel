var pointList = [];
var markers = new ol.layer.Vector({
    source: new ol.source.Vector(),
    style: new ol.style.Style({
        image: new ol.style.Icon({
            anchorXUnits: 'fraction',
            anchorYUnits: 'fraction',
            scale: 0.1,
            src: '/assets/images/data-marker.png'
        })
    })
});
var map;
var coordsMultiPolygon = [];
var coordsSinglePolygon = [];
var coordsCircle = [];
var coordsPoint = [];
var coordsLineString = [];
var circlePoint = [];
var polygonPoints = [];
var lineStringPoint = [];
var vectorSource = new ol.source.Vector({});
var vectorLayer = new ol.layer.Vector({
    source: vectorSource
});
var view = new ol.View({
    center: ol.proj.fromLonLat([59.5974796, 36.2999664]),
    zoom: 11,
    minZoom: autocad ? 11 : 0,
    maxZoom: autocad ? 11 : 21,
});
var raster = new ol.layer.Tile({
    source: new ol.source.OSM()
});
var vector = new ol.layer.Vector({
    source: vectorSource,
    style: new ol.style.Style({
        fill: new ol.style.Fill({
            color: 'rgba(255,255,255,0.7)',
        }),
        stroke: new ol.style.Stroke({
            color: '#3399CC',
            width: 3,
        }),
        image: new ol.style.Circle({
            radius: 7,
            fill: new ol.style.Fill({
                color: '#3399CC'
            })
        })
    })
});

var highlightStyle = new ol.style.Style({
    fill: new ol.style.Fill({
        color: 'rgba(255,255,255,0.7)',
    }),
    stroke: new ol.style.Stroke({
        color: '#3399CC',
        width: 3,
    }),
});
var autocad;
var selectedProviderId = -1;
var oldSelectedArea;

let vecs = [];

var addressMarkerLat;
var addressMarkerLon;


var initCustomerAddressMap = function (target, lat, lon) {

    console.log(lat);
    console.log(lon);
    map = new ol.Map({
        target: target,
        key: 'web.dcSie6nyRlk4S7thehU99IgdHgKZG6BElfC8TxHG',
        maptype: 'neshan',
        projection: 'EPSG:4326',
        view: view,
        layers: [
            raster, vector, vectorLayer
        ],
    });
    var modify = new ol.interaction.Modify({source: vectorSource});
    map.addInteraction(modify);
    var markers = new ol.layer.Vector({
        source: new ol.source.Vector(),
        style: new ol.style.Style({
            image: new ol.style.Icon({
                anchor: [0.5, 1],
                zIndex: 1000,
                // the scale factor
                scale: 1,
                src: '/assets/images/9.svg',
            })
        })
    });


    map.addLayer(markers);
    markers.setZIndex(1001);
    var marker = new ol.Feature(new ol.geom.Point(ol.proj.fromLonLat([lon, lat])));
    markers.getSource().addFeature(marker);
};


var initAddressMap = function (target, items) {
    map = new ol.Map({
        target: target,
        key: 'web.dcSie6nyRlk4S7thehU99IgdHgKZG6BElfC8TxHG',
        maptype: 'neshan',
        projection: 'EPSG:4326',
        view: view,
        layers: [
            raster, vector, vectorLayer
        ],
    });

    var modify = new ol.interaction.Modify({source: vectorSource});
    map.addInteraction(modify);
    var markers = new ol.layer.Vector({
        source: new ol.source.Vector(),
        style: new ol.style.Style({
            image: new ol.style.Icon({
                anchor: [0.5, 1],
                zIndex: 1000,
                // the scale factor
                scale: 1,
                src: '/assets/images/icons/9.svg',
            })
        })
    });

    if (items != null && items.length != 0) {
        drawPolygon([items]);
    }
    map.on('click', function (evt) {
        var coordinate;
        let typeSelected;
        coordinate = polygonLocation();
        polygonPoints = [];
        coordsMultiPolygon = [];
        let coordPoint = [];
        let coordArray = [];
        let coordData = [];

        coordinate.forEach(item => {
            coordArray = [];
            item.forEach(pointArray => {
                coordPoint = [];
                pointArray.forEach(point => {
                    coordPoint = {
                        lat: point[0],
                        lng: point[1]
                    };
                    coordArray.push(coordPoint);

                });
                coordData.push([coordArray]);
            })
        });
    });
    addInteractions();


};

function polygonLocation() {
    var polyFeatures = vector.getSource();
    polyFeatures.forEachFeature(function (polyFeature) {
        // this will get you all polygon coordinates

        coordsMultiPolygon.push(polyFeature.getGeometry().getCoordinates());

        // this will get you central coordinate of polygon
        coordsSinglePolygon.push(polyFeature.getGeometry().getInteriorPoint());
    });

    polygonPoints = [];
    coordsMultiPolygon.forEach(p => {
        p.forEach(po => {
            po.forEach(pt => {
                var lonlat = ol.proj.transform(pt, 'EPSG:3857', 'EPSG:4326');
                pt[0] = lonlat[0];
                pt[1] = lonlat[1];
                polygonPoints.push({lat: lonlat[1], lng: lonlat[0]});
                // var coordinates = [lat, lng];
                // polygonPoints.push(coordinates)

            });
        });
    });

    if (coordsMultiPolygon.length != 0) {
        map.addLayer(vectorLayer);
    }
    return coordsMultiPolygon;
}

function addInteractions() {
    draw = new ol.interaction.Draw({
        source: vectorSource,
        type: 'Polygon'
    });
    map.addInteraction(draw);
    snap = new ol.interaction.Snap({source: vectorSource});
    map.addInteraction(snap);

}

let clearMap = function () {
    coordsMultiPolygon = [];
    coordsSinglePolygon = [];
    coordsCircle = [];
    coordsPoint = [];
    coordsLineString = [];
    $('#kt_location').empty();
    initAddressMap("kt_location", []);

}


var drawPolygon = function (items) {
    items.forEach(points => {
        var oldItemss = [];
        points.forEach(p => {
            var coordinates = [p.lng, p.lat];
            oldItemss.push(coordinates)
            polygonPoints.push({lat: p.lat, lng: p.lng})
        });


        var geometry = new ol.geom.Polygon([oldItemss]);

        geometry.set('id', points.id)

        geometry.transform('EPSG:4326', 'EPSG:3857');

        var vectorLayer = new ol.layer.Vector({
            source: new ol.source.Vector({
                features: [new ol.Feature({
                    geometry: geometry
                })]
            })
        });
        vecs.push(vectorLayer)
        map.addLayer(vectorLayer);
        markers.setZIndex(900);
    });
};

