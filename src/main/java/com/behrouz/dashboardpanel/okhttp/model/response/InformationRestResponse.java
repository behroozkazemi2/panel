package com.behrouz.dashboardpanel.okhttp.model.response;

public class InformationRestResponse {

    private long id;
    private String name;
    private String value;

    private long productId;
    private String informationCategoryName;
    private long informationCategoryId;
    private double showOrder;

    public InformationRestResponse() {
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

    public long getProductId() {
        return productId;
    }
    public void setProductId(long productId) {
        this.productId = productId;
    }

    public String getInformationCategoryName() {
        return informationCategoryName;
    }
    public void setInformationCategoryName(String informationCategoryName) {
        this.informationCategoryName = informationCategoryName;
    }

    public long getInformationCategoryId() {
        return informationCategoryId;
    }
    public void setInformationCategoryId(long informationCategoryId) {
        this.informationCategoryId = informationCategoryId;
    }

    public String getValue() {
        return value;
    }
    public void setValue(String value) {
        this.value = value;
    }
}
