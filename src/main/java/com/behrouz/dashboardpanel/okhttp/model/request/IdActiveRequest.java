package com.behrouz.dashboardpanel.okhttp.model.request;

public class IdActiveRequest {

    private int id;

    private boolean active;

    public IdActiveRequest() {
    }

    public IdActiveRequest(int id, boolean active) {
        this.id = id;
        this.active = active;
    }

    public int getId() {
        return id;
    }
    public void setId(int id) {
        this.id = id;
    }



    public boolean isActive() {
        return active;
    }
    public void setActive(boolean active) {
        this.active = active;
    }
}
