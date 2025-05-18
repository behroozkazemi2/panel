package com.behrouz.dashboardpanel.rest.response;



import com.behrouz.dashboardpanel.okhttp.model.request.LatLngData;

import java.util.List;

public class FactorDetailResponse {

    private List<FactorProductResponse> products;

    private List<RequestDetailResponse > steps;

    private int currentStepId;

    private boolean lastPayActive;

    private long realAmount;

    private long discountAmount;

    private long offCodeAmount;

    private long distanceAmount;

    private long payableAmount;

    private long taxAmount;

    private String trackingCode;
    private String insertDate;
    private String address;
    private LatLngData location;

    private String customerName;
    private String customerNumber;
    private String offCodeCode;
    private String description;

//    private Date supposedToDeliverDate;
//
//    private RequestDetailResponse supposedToDeliverTime;
//
//    private Date deliveredDate;



    public List < FactorProductResponse > getProducts () {
        return products;
    }
    public void setProducts ( List < FactorProductResponse > products ) {
        this.products = products;
    }


    public List < RequestDetailResponse > getSteps () {
        return steps;
    }
    public void setSteps ( List < RequestDetailResponse > steps ) {
        this.steps = steps;
    }


    public int getCurrentStepId () {
        return currentStepId;
    }
    public void setCurrentStepId ( int currentStepId ) {
        this.currentStepId = currentStepId;
    }



    public long getOffCodeAmount() {
        return offCodeAmount;
    }
    public void setOffCodeAmount(long offCodeAmount) {
        this.offCodeAmount = offCodeAmount;
    }


    public long getRealAmount() {
        return realAmount;
    }
    public void setRealAmount(long realAmount) {
        this.realAmount = realAmount;
    }



    public long getDiscountAmount() {
        return discountAmount;
    }
    public void setDiscountAmount(long discountAmount) {
        this.discountAmount = discountAmount;
    }



    public long getDistanceAmount() {
        return distanceAmount;
    }
    public void setDistanceAmount(long distanceAmount) {
        this.distanceAmount = distanceAmount;
    }



    public long getPayableAmount() {
        return payableAmount;
    }
    public void setPayableAmount(long payableAmount) {
        this.payableAmount = payableAmount;
    }



    public String getTrackingCode() {
        return trackingCode;
    }
    public void setTrackingCode(String trackingCode) {
        this.trackingCode = trackingCode;
    }



    public boolean isLastPayActive () {
        return lastPayActive;
    }
    public void setLastPayActive ( boolean lastPayActive ) {
        this.lastPayActive = lastPayActive;
    }


    public long getTaxAmount() {
        return taxAmount;
    }
    public void setTaxAmount(long taxAmount) {
        this.taxAmount = taxAmount;
    }

    public String getInsertDate() {
        return insertDate;
    }
    public void setInsertDate(String insertDate) {
        this.insertDate = insertDate;
    }


    public String getAddress() {
        return address;
    }
    public void setAddress(String address) {
        this.address = address;
    }


    public LatLngData getLocation() {
        return location;
    }
    public void setLocation(LatLngData location) {
        this.location = location;
    }

    public String getCustomerName() {
        return customerName;
    }
    public void setCustomerName(String customerName) {
        this.customerName = customerName;
    }

    public String getCustomerNumber() {
        return customerNumber;
    }
    public void setCustomerNumber(String customerNumber) {
        this.customerNumber = customerNumber;
    }

    public String getOffCodeCode() {
        return offCodeCode;
    }
    public void setOffCodeCode(String offCodeCode) {
        this.offCodeCode = offCodeCode;
    }


    public String getDescription() {
        return description;
    }
    public void setDescription(String description) {
        this.description = description;
    }
}
