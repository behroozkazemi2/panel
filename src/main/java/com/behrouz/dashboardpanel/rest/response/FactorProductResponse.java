package com.behrouz.dashboardpanel.rest.response;




public class FactorProductResponse {


    private String productName;

    private String providerName;

    private long productProviderId;

    private long finalPrice;

    private float count;

    private String unit;

    private long price;

    private int imageId;

    private long discount;

    private boolean customized;



    public String getProductName() {
        return productName;
    }
    public void setProductName(String productName) {
        this.productName = productName;
    }


    public String getProviderName() {
        return providerName;
    }
    public void setProviderName(String providerName) {
        this.providerName = providerName;
    }


    public long getProductProviderId() {
        return productProviderId;
    }
    public void setProductProviderId(long productProviderId) {
        this.productProviderId = productProviderId;
    }


    public long getFinalPrice() {
        return finalPrice;
    }
    public void setFinalPrice(long finalPrice) {
        this.finalPrice = finalPrice;
    }


    public float getCount() {
        return count;
    }
    public void setCount(float count) {
        this.count = count;
    }


    public String getUnit() {
        return unit;
    }
    public void setUnit(String unit) {
        this.unit = unit;
    }


    public long getPrice() {
        return price;
    }
    public void setPrice(long price) {
        this.price = price;
    }


    public int getImageId() {
        return imageId;
    }
    public void setImageId(int imageId) {
        this.imageId = imageId;
    }


    public long getDiscount() {
        return discount;
    }
    public void setDiscount(long discount) {
        this.discount = discount;
    }


    public boolean isCustomized() {
        return customized;
    }
    public void setCustomized(boolean customized) {
        this.customized = customized;
    }
}
