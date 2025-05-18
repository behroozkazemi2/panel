package com.behrouz.dashboardpanel.rest.request;


import com.behrouz.dashboardpanel.okhttp.model.response.IdName;

public class SpecialProductOfferRequest {

    private long specialProductId;

    private long providerId;

    private IdName productProviderUnit;

    private int prepareHour;

    private long primitiveAmount;

    private long extraAmount;

    private long finalAmount;

    private String fullDescription;

    private double count;

    private boolean accepted;



    public SpecialProductOfferRequest() {
    }



    public SpecialProductOfferRequest(long specialProductId, long providerId, IdName productProviderUnit, int prepareHour, long primitiveAmount, long extraAmount, long finalAmount, String fullDescription, double count, boolean accepted) {
        this.specialProductId = specialProductId;
        this.providerId = providerId;
        this.productProviderUnit = productProviderUnit;
        this.prepareHour = prepareHour;
        this.primitiveAmount = primitiveAmount;
        this.extraAmount = extraAmount;
        this.finalAmount = finalAmount;
        this.fullDescription = fullDescription;
        this.count = count;
        this.accepted = accepted;
    }

    public long getSpecialProductId() {
        return specialProductId;
    }
    public void setSpecialProductId(long specialProductId) {
        this.specialProductId = specialProductId;
    }


    public long getProviderId() {
        return providerId;
    }
    public void setProviderId(long providerId) {
        this.providerId = providerId;
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


    public long getExtraAmount() {
        return extraAmount;
    }
    public void setExtraAmount(long extraAmount) {
        this.extraAmount = extraAmount;
    }


    public long getFinalAmount() {
        return finalAmount;
    }
    public void setFinalAmount(long finalAmount) {
        this.finalAmount = finalAmount;
    }


    public String getFullDescription() {
        return fullDescription;
    }
    public void setFullDescription(String fullDescription) {
        this.fullDescription = fullDescription;
    }


    public boolean isAccepted() {
        return accepted;
    }
    public void setAccepted(boolean accepted) {
        this.accepted = accepted;
    }


    public IdName getProductProviderUnit() {
        return productProviderUnit;
    }
    public void setProductProviderUnit(IdName productProviderUnit) {
        this.productProviderUnit = productProviderUnit;
    }


    public double getCount() {
        return count;
    }
    public void setCount(double count) {
        this.count = count;
    }
}