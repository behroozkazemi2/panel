/**
 * Created by thunderbolt on 10/31/19.
 */

var map;

var vectorSource = new ol.source.Vector({});

var vectorLayer = new ol.layer.Vector({
    source: vectorSource
});

var initMap = function (target, locations) {
    const iconFeature = new ol.Feature({
        geometry: new ol.geom.Point(ol.proj.fromLonLat([-2, 53])),
        name: 'Somewhere near Nottingham',
    })

    map = new ol.Map({
        target: target,
        key: 'web.Zw2gC692Eo64xyu2acOKZ2E9YtTPs7usDwJgCSjh',
        maptype: 'neshan',
        view: new ol.View({
            center: ol.proj.fromLonLat([59.449611, 36.356213]),
            zoom: 14,
            minZoom: 6,
            maxZoom: 15,
        }),
        poi: true,
        traffic: false,
        layers: [
            vectorLayer,
        ]
    });


    if (locations != null){
        locations.forEach( item => {
            // item.type  شروع          1
            // item.type  پایان         2
            // item.type  ارسال اطلاعات  3

            if ( item.type != 3) {
                let markerColor = (Number(item.type) == 1 ? "/assets/images/successMarker.png" :
                    Number(item.type) == 2 ? "/assets/images/blueMarker.png" : "/assets/images/purple.png");

                var markers = new ol.layer.Vector({
                    source: new ol.source.Vector(),
                    style: new ol.style.Style({
                        image: new ol.style.Icon({
                            anchor: [0.5, 1],
                            // the scale factor
                            scale: 0.5,
                            src: markerColor
                        })
                    })
                });

                map.addLayer(markers);
                markers.setZIndex(1001 - item.type);

                // START Location:
                var mark = new ol.Feature(new ol.geom.Point(ol.proj.fromLonLat([item.longitude, item.latitude])));
                markers.getSource().addFeature(mark);
            }
        });

        // fake popUp on Marker Click
        // map.on('click', function (evt) {
        //
        //     console.log(evt);
        //
        //     var feature = map.forEachFeatureAtPixel(evt.pixel,
        //         function(feature) {
        //
        //             return feature;
        //         });
        //     if (feature != null || feature != undefined ) {
        //         console.log("IsMarker");
        //         var element = popup.getElement();
        //         var coordinate = evt.coordinate;
        //         $(element).popover('dispose');
        //         popup.setPosition(coordinate);
        //         $(element).popover({
        //             container: element,
        //             placement: 'top',
        //             animation: false,
        //             html: true,
        //             content: '<p>شروع یا پایان یا ارسال اطلاعات</p>',
        //         });
        //         $(element).popover('show');
        //
        //     }
        // });

    }
    // selectOnMap();
};