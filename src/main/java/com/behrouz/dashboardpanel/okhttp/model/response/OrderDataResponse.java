package com.behrouz.dashboardpanel.okhttp.model.response;

public class OrderDataResponse {

    private long allOrderCount;
    private double allOrderAmount;


    private long allConfirmOrderCount;
    private double allConfirmOrderAmount;


    private long allWaitingOrderCount;
    private double allWaitingOrderAmount;

    public OrderDataResponse() {
    }

    public long getAllOrderCount() {
        return allOrderCount;
    }
    public void setAllOrderCount(long allOrderCount) {
        this.allOrderCount = allOrderCount;
    }

    public double getAllOrderAmount() {
        return allOrderAmount;
    }
    public void setAllOrderAmount(double allOrderAmount) {
        this.allOrderAmount = allOrderAmount;
    }

    public long getAllConfirmOrderCount() {
        return allConfirmOrderCount;
    }
    public void setAllConfirmOrderCount(long allConfirmOrderCount) {
        this.allConfirmOrderCount = allConfirmOrderCount;
    }

    public double getAllConfirmOrderAmount() {
        return allConfirmOrderAmount;
    }
    public void setAllConfirmOrderAmount(double allConfirmOrderAmount) {
        this.allConfirmOrderAmount = allConfirmOrderAmount;
    }

    public long getAllWaitingOrderCount() {
        return allWaitingOrderCount;
    }

    public void setAllWaitingOrderCount(long allWaitingOrderCount) {
        this.allWaitingOrderCount = allWaitingOrderCount;
    }

    public double getAllWaitingOrderAmount() {
        return allWaitingOrderAmount;
    }

    public void setAllWaitingOrderAmount(double allWaitingOrderAmount) {
        this.allWaitingOrderAmount = allWaitingOrderAmount;
    }
}
