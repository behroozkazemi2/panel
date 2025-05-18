package com.behrouz.dashboardpanel.okhttp.model.request;



import java.util.Date;
import java.util.List;

public class PromoteSaveRequest {

    protected int id;

    protected String name;
    protected Date startDate;
    protected Date endDate;
    protected List<Long> productProviderIds;



    public int getId() {
        return id;
    }
    public void setId(int id) {
        this.id = id;
    }


    public String getName() {
        return name;
    }
    public void setName(String name) {
        this.name = name;
    }


    public Date getStartDate() {
        return startDate;
    }
    public void setStartDate(Date startDate) {
        this.startDate = startDate;
    }


    public Date getEndDate() {
        return endDate;
    }
    public void setEndDate(Date endDate) {
        this.endDate = endDate;
    }

    public List<Long> getProductProviderIds() {
        return productProviderIds;
    }
    public void setProductProviderIds(List<Long> productProviderIds) {
        this.productProviderIds = productProviderIds;
    }
}
