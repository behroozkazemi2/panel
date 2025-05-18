package com.behrouz.dashboardpanel.okhttp.model.response;

public class ProductProviderDigestResponse {


    private long id;

    private long image;

    private String brand;

    private String unit;

    private String category;

    private IdName provider;

    private IdName product;

    private long minAllow;

    private long maxAllow;

    private long prepare_hour;

    private long primitiveAmount;

    private float discountPercent;

    private long discountAmount;

    private long finalAmount;

    private float rate;

    private boolean exist;

    private float showOrder;



    public ProductProviderDigestResponse() {
    }


    public ProductProviderDigestResponse(long id, IdName provider, IdName product, String brand , String category, String unit, long primitiveAmount, float discountPercent, long discountAmount, long finalAmount, float rate, boolean exist, float showOrder) {
        this.id = id;
        this.provider = provider;
        this.product = product;
        this.brand = brand;
        this.unit = unit;
        this.category = category;
        this.primitiveAmount = primitiveAmount;
        this.discountPercent = discountPercent;
        this.discountAmount = discountAmount;
        this.finalAmount = finalAmount;
        this.rate = rate;
        this.exist = exist;
        this.showOrder = showOrder;

    }


    public ProductProviderDigestResponse(long id, IdName provider, IdName product, long minAllow, long maxAllow, long prepare_hour, long primitiveAmount, float discountPercent, long discountAmount, long finalAmount, float rate, boolean exist, float showOrder) {
        this.id = id;
        this.provider = provider;
        this.product = product;
        this.minAllow = minAllow;
        this.maxAllow = maxAllow;
        this.prepare_hour = prepare_hour;
        this.primitiveAmount = primitiveAmount;
        this.discountPercent = discountPercent;
        this.discountAmount = discountAmount;
        this.finalAmount = finalAmount;
        this.rate = rate;
        this.exist = exist;
        this.showOrder = showOrder;
    }

    public long getId() {
        return id;
    }
    public void setId(long id) {
        this.id = id;
    }



    public long getImage() {
        return image;
    }
    public void setImage(long image) {
        this.image = image;
    }


    public IdName getProvider() {
        return provider;
    }
    public void setProvider(IdName provider) {
        this.provider = provider;
    }


    public IdName getProduct() {
        return product;
    }
    public void setProduct(IdName product) {
        this.product = product;
    }

    public float getRate() {
        return rate;
    }
    public void setRate(float rate) {
        this.rate = rate;
    }


    public long getPrimitiveAmount() {
        return primitiveAmount;
    }
    public void setPrimitiveAmount(long primitiveAmount) {
        this.primitiveAmount = primitiveAmount;
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



    public float getDiscountPercent() {
        return discountPercent;
    }
    public void setDiscountPercent(float discountPercent) {
        this.discountPercent = discountPercent;
    }


    public boolean isExist() {
        return exist;
    }
    public void setExist(boolean exist) {
        this.exist = exist;
    }


    public float getShowOrder() {
        return showOrder;
    }
    public void setShowOrder(float showOrder) {
        this.showOrder = showOrder;
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

    public long getMinAllow() {
        return minAllow;
    }
    public void setMinAllow(long minAllow) {
        this.minAllow = minAllow;
    }


    public long getMaxAllow() {
        return maxAllow;
    }
    public void setMaxAllow(long maxAllow) {
        this.maxAllow = maxAllow;
    }


    public long getPrepare_hour() {
        return prepare_hour;
    }
    public void setPrepare_hour(long prepare_hour) {
        this.prepare_hour = prepare_hour;
    }


    public String getUnit() {
        return unit;
    }
    public void setUnit(String unit) {
        this.unit = unit;
    }


}
