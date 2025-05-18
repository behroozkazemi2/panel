package com.behrouz.dashboardpanel.okhttp.model.response;

import java.util.List;

public class PromoteDigestResponse {


    private long id;
    private String name;
    private String startDate;
    private String endDate;
    private String startTime;
    private String endTime;
    private long startDateTimeStamp;
    private long endDateTimeStamp;
    private List<IdName> productProviderIds;


    public PromoteDigestResponse() {
    }


    public long getId() {
        return id;
    }
    public void setId(long id) {
        this.id = id;
    }

    public long getStartDateTimeStamp() {
        return startDateTimeStamp;
    }
    public void setStartDateTimeStamp(long startDateTimeStamp) {
        this.startDateTimeStamp = startDateTimeStamp;
    }

    public long getEndDateTimeStamp() {
        return endDateTimeStamp;
    }
    public void setEndDateTimeStamp(long endDateTimeStamp) {
        this.endDateTimeStamp = endDateTimeStamp;
    }

    public String getName() {
        return name;
    }
    public void setName(String name) {
        this.name = name;
    }


    public String getStartDate() {
        return startDate;
    }
    public void setStartDate(String startDate) {
        this.startDate = startDate;
    }


    public String getEndDate() {
        return endDate;
    }
    public void setEndDate(String endDate) {
        this.endDate = endDate;
    }


    public List<IdName> getProductProviderIds() {
        return productProviderIds;
    }
    public void setProductProviderIds(List<IdName> productProviderIds) {
        this.productProviderIds = productProviderIds;
    }

    public String getStartTime() {
        return startTime;
    }
    public void setStartTime(String startTime) {
        this.startTime = startTime;
    }

    public String getEndTime() {
        return endTime;
    }
    public void setEndTime(String endTime) {
        this.endTime = endTime;
    }
}
