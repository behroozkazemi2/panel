package com.behrouz.dashboardpanel.rest.response;


import com.behrouz.dashboardpanel.okhttp.model.response.IdName;

public class SpecialProductSuggestionResponse {

    private int id;

    private IdName provider;

    private boolean accept;

    private IdName unit;

    private float count;

    private long unitAmount;

    private long extraAmount;

    private long minuteToReady;

    private String providerDescription;


    public SpecialProductSuggestionResponse() {
    }

    public SpecialProductSuggestionResponse(int id, IdName provider, boolean accept, IdName unit, float count, long unitAmount, long extraAmount, long minuteToReady, String providerDescription) {
        this.id = id;
        this.provider = provider;
        this.accept = accept;
        this.unit = unit;
        this.count = count;
        this.unitAmount = unitAmount;
        this.extraAmount = extraAmount;
        this.minuteToReady = minuteToReady;
        this.providerDescription = providerDescription;
    }

    public int getId() {
        return id;
    }
    public void setId(int id) {
        this.id = id;
    }



    public IdName getProvider() {
        return provider;
    }
    public void setProvider(IdName provider) {
        this.provider = provider;
    }



    public boolean isAccept() {
        return accept;
    }
    public void setAccept(boolean accept) {
        this.accept = accept;
    }



    public IdName getUnit() {
        return unit;
    }
    public void setUnit(IdName unit) {
        this.unit = unit;
    }



    public float getCount() {
        return count;
    }
    public void setCount(float count) {
        this.count = count;
    }



    public long getUnitAmount() {
        return unitAmount;
    }
    public void setUnitAmount(long unitAmount) {
        this.unitAmount = unitAmount;
    }




    public long getExtraAmount() {
        return extraAmount;
    }
    public void setExtraAmount(long extraAmount) {
        this.extraAmount = extraAmount;
    }



    public long getMinuteToReady() {
        return minuteToReady;
    }
    public void setMinuteToReady(long minuteToReady) {
        this.minuteToReady = minuteToReady;
    }


    public String getProviderDescription() {
        return providerDescription;
    }
    public void setProviderDescription(String providerDescription) {
        this.providerDescription = providerDescription;
    }
}


