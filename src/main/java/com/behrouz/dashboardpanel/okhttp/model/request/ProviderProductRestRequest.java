package com.behrouz.dashboardpanel.okhttp.model.request;

public class ProviderProductRestRequest {

    private long productProviderId;

    private long providerId;

    private long productId;

    private double minAllow;

    private double maxAllow;

    private long prepareHour;
    private long productCount;
    private long storageCount;
    private boolean changeExistCount;

    private long primitiveAmount;

    private float discountPercent;

    private long discountAmount;

    private long finalAmount;

    private float rate;

    private float showOrder;

    public ProviderProductRestRequest() {
    }


    public ProviderProductRestRequest(long productProviderId, long providerId, long productId, long minAllow, long maxAllow, long prepare_hour, long primitiveAmount, float discountPercent, long discountAmount, long finalAmount, float rate, float showOrder, long productCount) {
        this.productProviderId = productProviderId;
        this.providerId = providerId;
        this.productId = productId;
        this.minAllow = minAllow;
        this.maxAllow = maxAllow;
        this.prepareHour = prepare_hour;
        this.primitiveAmount = primitiveAmount;
        this.discountPercent = discountPercent;
        this.discountAmount = discountAmount;
        this.finalAmount = finalAmount;
        this.rate = rate;
        this.showOrder = showOrder;
        this.productCount = productCount;
    }


    public long getProductProviderId() {
        return productProviderId;
    }
    public void setProductProviderId(long productProviderId) {
        this.productProviderId = productProviderId;
    }


    public long getProductId() {
        return productId;
    }
    public void setProductId(long productId) {
        this.productId = productId;
    }


    public long getPrimitiveAmount() {
        return primitiveAmount;
    }
    public void setPrimitiveAmount(long primitiveAmount) {
        this.primitiveAmount = primitiveAmount;
    }


    public float getDiscountPercent() {
        return discountPercent;
    }
    public void setDiscountPercent(float discountPercent) {
        this.discountPercent = discountPercent;
    }


    public long getDiscountAmount() {
        return discountAmount;
    }
    public void setDiscountAmount(long discountAmount) {
        this.discountAmount = discountAmount;
    }


    public long getFinalAmount() {
        return finalAmount;
    }
    public void setFinalAmount(long finalAmount) {
        this.finalAmount = finalAmount;
    }


    public float getRate() {
        return rate;
    }
    public void setRate(float rate) {
        this.rate = rate;
    }


    public float getShowOrder() {
        return showOrder;
    }
    public void setShowOrder(float showOrder) {
        this.showOrder = showOrder;
    }


    public long getProviderId() {
        return providerId;
    }
    public void setProviderId(long providerId) {
        this.providerId = providerId;
    }


    public double getMinAllow() {
        return minAllow;
    }
    public void setMinAllow(double minAllow) {
        this.minAllow = minAllow;
    }


    public double getMaxAllow() {
        return maxAllow;
    }
    public void setMaxAllow(double maxAllow) {
        this.maxAllow = maxAllow;
    }


    public long getPrepareHour() {
        return prepareHour;
    }
    public void setPrepareHour(long prepareHour) {
        this.prepareHour = prepareHour;
    }

    public long getProductCount() {
        return productCount;
    }
    public void setProductCount(long productCount) {
        this.productCount = productCount;
    }

    public long getStorageCount() {
        return storageCount;
    }
    public void setStorageCount(long storageCount) {
        this.storageCount = storageCount;
    }

    public boolean isChangeExistCount() {
        return changeExistCount;
    }
    public void setChangeExistCount(boolean changeExistCount) {
        this.changeExistCount = changeExistCount;
    }
}
