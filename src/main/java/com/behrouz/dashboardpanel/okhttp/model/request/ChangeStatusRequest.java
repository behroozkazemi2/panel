package com.behrouz.dashboardpanel.okhttp.model.request;

/**
 * Created by Hapi
 * 09 September 2018 16:47
 **/
public class ChangeStatusRequest {

    //this id of vacation that we want to change status id
    private int id;
    //the new status for this vacation
    private int status;


    public ChangeStatusRequest() {
    }


    public ChangeStatusRequest(int id, int status) {
        this.id = id;
        this.status = status;
    }

    public int getId() {
        return id;
    }
    public void setId(int id) {
        this.id = id;
    }



    public int getStatus() {
        return status;
    }
    public void setStatus(int status) {
        this.status = status;
    }


}
