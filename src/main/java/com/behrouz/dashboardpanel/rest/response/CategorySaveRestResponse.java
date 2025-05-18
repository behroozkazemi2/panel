package com.behrouz.dashboardpanel.rest.response;

public class CategorySaveRestResponse {
    private long id;
    private long parent;
    private long imageId;
    private String name;
    private String description;
    private double showOrder;

    public CategorySaveRestResponse() {
    }

    public CategorySaveRestResponse(long id, long imageId, long parent, String name, String description, double showOrder) {
        this.id = id;
        this.parent = parent;
        this.imageId = imageId;
        this.name = name;
        this.description = description;
        this.showOrder = showOrder;
    }

    public long getId() {
        return id;
    }
    public void setId(long id) {
        this.id = id;
    }


    public long getParent() {
        return parent;
    }
    public void setParent(long parent) {
        this.parent = parent;
    }

    public long getImageId() {
        return imageId;
    }
    public void setImageId(long imageId) {
        this.imageId = imageId;
    }


    public String getName() {
        return name;
    }
    public void setName(String name) {
        this.name = name;
    }


    public String getDescription() {
        return description;
    }
    public void setDescription(String description) {
        this.description = description;
    }

    public double getShowOrder() {
        return showOrder;
    }
    public void setShowOrder(double showOrder) {
        this.showOrder = showOrder;
    }
}
