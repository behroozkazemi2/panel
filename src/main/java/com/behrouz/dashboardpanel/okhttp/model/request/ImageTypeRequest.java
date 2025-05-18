package com.behrouz.dashboardpanel.okhttp.model.request;

/**
 * Created by: MojtabaJ
 * 15 June 2020
 **/
public class ImageTypeRequest {

    private int id;

    private int type;


    public ImageTypeRequest() {
    }

    public ImageTypeRequest(int id, int type) {
        this.id = id;
        this.type = type;
    }


    public int getId() {
        return id;
    }
    public void setId(int id) {
        this.id = id;
    }


    public int getType() {
        return type;
    }
    public void setType(int type) {
        this.type = type;
    }
}