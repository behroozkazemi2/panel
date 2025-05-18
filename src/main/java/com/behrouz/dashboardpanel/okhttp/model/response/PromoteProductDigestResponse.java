package com.behrouz.dashboardpanel.okhttp.model.response;

public class PromoteProductDigestResponse {


    private long productProviderId;
    private String productName;
    private String providerName;
    private String brand;
    private String category;
    private String primitivePrice;
    private String discountPercent;
    private String finalAmount;


    public PromoteProductDigestResponse() {
    }

    public PromoteProductDigestResponse(long productProviderId, String productName, String providerName, String brand, String category, String primitivePrice, String discountPercent, String finalAmount) {
        this.productProviderId = productProviderId;
        this.productName = productName;
        this.providerName = providerName;
        this.brand = brand;
        this.category = category;
        this.primitivePrice = primitivePrice;
        this.discountPercent = discountPercent;
        this.finalAmount = finalAmount;
    }

    public long getProductProviderId() {
        return productProviderId;
    }
    public void setProductProviderId(long productProviderId) {
        this.productProviderId = productProviderId;
    }

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

    public String getBrand() {
        return brand;
    }
    public void setBrand(String brand) {
        this.brand = brand;
    }

    public String getCategory() {
        return category;
    }
    public void setCategory(String category) {
        this.category = category;
    }

    public String getPrimitivePrice() {
        return primitivePrice;
    }
    public void setPrimitivePrice(String primitivePrice) {
        this.primitivePrice = primitivePrice;
    }

    public String getDiscountPercent() {
        return discountPercent;
    }
    public void setDiscountPercent(String discountPercent) {
        this.discountPercent = discountPercent;
    }

    public String getFinalAmount() {
        return finalAmount;
    }
    public void setFinalAmount(String finalAmount) {
        this.finalAmount = finalAmount;
    }

}
