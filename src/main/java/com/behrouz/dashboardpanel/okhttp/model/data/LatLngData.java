package com.behrouz.dashboardpanel.okhttp.model.data;


/*
 * api-action: app.customer.region.find
 * response -> IdName
 */
public class LatLngData {


    protected double lat;

    protected double lng;


    public LatLngData() {
    }

    public LatLngData(double lat, double lng) {
        this.lat = lat;
        this.lng = lng;
    }

    public double getLat() {
        return lat;
    }
    public void setLat(double lat) {
        this.lat = lat;
    }



    public double getLng() {
        return lng;
    }
    public void setLng(double lng) {
        this.lng = lng;
    }
}
