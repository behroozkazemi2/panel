package com.behrouz.dashboardpanel.okhttp.model.response;

public class InformationCategoryRestResponse {

    private long id;

    private String name;
    private double showOrder;

    public InformationCategoryRestResponse() {
    }

    public InformationCategoryRestResponse(long id, String name) {
        this.id = id;
        this.name = name;
    }

    public InformationCategoryRestResponse(long id, String name, double showOrder) {
        this.id = id;
        this.name = name;
        this.showOrder = showOrder;
    }

    public long getId() {
        return id;
    }
    public void setId(long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }
    public void setName(String name) {
        this.name = name;
    }

    public double getShowOrder() {
        return showOrder;
    }
    public void setShowOrder(double showOrder) {
        this.showOrder = showOrder;
    }
}
