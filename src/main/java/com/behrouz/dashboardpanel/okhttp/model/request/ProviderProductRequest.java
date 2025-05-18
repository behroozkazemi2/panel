package com.behrouz.dashboardpanel.okhttp.model.request;



import java.util.List;

public class ProviderProductRequest {

    protected int id;

    protected float showOrder;

    protected boolean productProviderExistence;

    protected String shortDescription;

    protected String fullDescription;

    protected int providerId; // if user is super admin , should be fill

    protected int productProviderUnitId;

    protected String name;

    protected int categoryId;

    protected double unitStep;

    protected double minAllow;

    protected double maxAllow;

    protected int prepareHour;

    protected long primitiveAmount;

    protected float offPercent;

    protected List<Integer> images;

    protected List<Integer> tagsId;



    public int getId() {
        return id;
    }
    public void setId(int id) {
        this.id = id;
    }



    public float getShowOrder() {
        return showOrder;
    }
    public void setShowOrder(float showOrder) {
        this.showOrder = showOrder;
    }



    public boolean isProductProviderExistence() {
        return productProviderExistence;
    }
    public void setProductProviderExistence(boolean productProviderExistence) {
        this.productProviderExistence = productProviderExistence;
    }



    public String getShortDescription() {
        return shortDescription;
    }
    public void setShortDescription(String shortDescription) {
        this.shortDescription = shortDescription;
    }



    public String getFullDescription() {
        return fullDescription;
    }
    public void setFullDescription(String fullDescription) {
        this.fullDescription = fullDescription;
    }


    public int getProviderId() {
        return providerId;
    }
    public void setProviderId(int providerId) {
        this.providerId = providerId;
    }


    public int getProductProviderUnitId() {
        return productProviderUnitId;
    }
    public void setProductProviderUnitId(int productProviderUnitId) {
        this.productProviderUnitId = productProviderUnitId;
    }


    public int getCategoryId() {
        return categoryId;
    }
    public void setCategoryId(int categoryId) {
        this.categoryId = categoryId;
    }


    public String getName() {
        return name;
    }
    public void setName(String name) {
        this.name = name;
    }


    public double getUnitStep() {
        return unitStep;
    }
    public void setUnitStep(double unitStep) {
        this.unitStep = unitStep;
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



    public int getPrepareHour() {
        return prepareHour;
    }
    public void setPrepareHour(int prepareHour) {
        this.prepareHour = prepareHour;
    }


    public long getPrimitiveAmount() {
        return primitiveAmount;
    }
    public void setPrimitiveAmount(long primitiveAmount) {
        this.primitiveAmount = primitiveAmount;
    }


    public float getOffPercent() {
        return offPercent;
    }
    public void setOffPercent(float offPercent) {
        this.offPercent = offPercent;
    }


    public List<Integer> getImages() {
        return images;
    }
    public void setImages(List<Integer> images) {
        this.images = images;
    }


    public List<Integer> getTagsId() {
        return tagsId;
    }
    public void setTagsId(List<Integer> tagsId) {
        this.tagsId = tagsId;
    }

}
