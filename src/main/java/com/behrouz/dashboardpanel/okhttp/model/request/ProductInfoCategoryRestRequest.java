package com.behrouz.dashboardpanel.okhttp.model.request;

public class ProductInfoCategoryRestRequest {

    private int id;
    private int productId;
    private int informationCategoryId;
    private String value;
    private String name;
    private double showOrder;

    public ProductInfoCategoryRestRequest() {
    }


    public String getName() {
        return name;
    }
    public void setName(String name) {
        this.name = name;
    }

    public int getId() {
        return id;
    }
    public void setId(int id) {
        this.id = id;
    }

    public int getProductId() {
        return productId;
    }
    public void setProductId(int productId) {
        this.productId = productId;
    }

    public int getInformationCategoryId() {
        return informationCategoryId;
    }
    public void setInformationCategoryId(int informationCategoryId) {
        this.informationCategoryId = informationCategoryId;
    }

    public String getValue() {
        return value;
    }
    public void setValue(String value) {
        this.value = value;
    }

    public double getShowOrder() {
        return showOrder;
    }
    public void setShowOrder(double showOrder) {
        this.showOrder = showOrder;
    }
}
