package com.behrouz.dashboardpanel.okhttp.model.response;

import java.util.Date;

/**
 * Created by: Hapi
 * 13 September 2020
 **/
public class SpecialOrderDigestResponse {

    protected int id;

    protected IdName category;

    protected IdName status;

    protected IdName region;

    protected Date insertDate;

    protected IdName provider;//if null is for all

    protected long suggestionAmount;//if 0 suggestion not set


    public SpecialOrderDigestResponse() {
    }


    public int getId() {
        return id;
    }
    public void setId(int id) {
        this.id = id;
    }


    public IdName getCategory() {
        return category;
    }
    public void setCategory(IdName category) {
        this.category = category;
    }



    public IdName getStatus() {
        return status;
    }
    public void setStatus(IdName status) {
        this.status = status;
    }


    public IdName getRegion() {
        return region;
    }
    public void setRegion(IdName region) {
        this.region = region;
    }


    public Date getInsertDate() {
        return insertDate;
    }
    public void setInsertDate(Date insertDate) {
        this.insertDate = insertDate;
    }


    public IdName getProvider() {
        return provider;
    }
    public void setProvider(IdName provider) {
        this.provider = provider;
    }

    public long getSuggestionAmount() {
        return suggestionAmount;
    }
    public void setSuggestionAmount(long suggestionAmount) {
        this.suggestionAmount = suggestionAmount;
    }
}
