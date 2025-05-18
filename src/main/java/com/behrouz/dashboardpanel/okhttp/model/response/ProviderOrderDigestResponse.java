package com.behrouz.dashboardpanel.okhttp.model.response;

import java.util.List;

public class ProviderOrderDigestResponse {

    private long billId;
    private String trackingCode;
    private long statusId;
    private String status;
    private String billInsertDate;
    private List<String> products;
    private String providerName;
    private double finalPrice;
    private String deliverDate;
    private String customerMobile;
    private String customerName;
    private long providerImageId;
    private long paymentMethod;


    public ProviderOrderDigestResponse() {
    }

    public ProviderOrderDigestResponse(long billId, String trackingCode, long statusId, String status, String billInsertDate, List<String> products, double finalPrice, String  providerName, String  deliverDate) {
        this.billId = billId;
        this.trackingCode = trackingCode;
        this.statusId = statusId;
        this.status = status;
        this.billInsertDate = billInsertDate;
        this.products = products;
        this.finalPrice = finalPrice;
        this.providerName = providerName;
        this.deliverDate = deliverDate;
    }


    public long getBillId() {
        return billId;
    }
    public void setBillId(long billId) {
        this.billId = billId;
    }


    public String getTrackingCode() {
        return trackingCode;
    }
    public void setTrackingCode(String trackingCode) {
        this.trackingCode = trackingCode;
    }


    public long getStatusId() {
        return statusId;
    }
    public void setStatusId(long statusId) {
        this.statusId = statusId;
    }


    public String getStatus() {
        return status;
    }
    public void setStatus(String status) {
        this.status = status;
    }


    public String getBillInsertDate() {
        return billInsertDate;
    }
    public void setBillInsertDate(String billInsertDate) {
        this.billInsertDate = billInsertDate;
    }


    public List<String> getProducts() {
        return products;
    }
    public void setProducts(List<String> products) {
        this.products = products;
    }


    public double getFinalPrice() {
        return finalPrice;
    }
    public void setFinalPrice(double finalPrice) {
        this.finalPrice = finalPrice;
    }

    public String getProviderName() {
        return providerName;
    }
    public void setProviderName(String providerName) {
        this.providerName = providerName;
    }

    public String getDeliverDate() {
        return deliverDate;
    }
    public void setDeliverDate(String deliverDate) {
        this.deliverDate = deliverDate;
    }


    public String getCustomerName() {
        return customerName;
    }
    public void setCustomerName(String customerName) {
        this.customerName = customerName;
    }

    public String getCustomerMobile() {
        return customerMobile;
    }
    public void setCustomerMobile(String customerMobile) {
        this.customerMobile = customerMobile;
    }

    public long getProviderImageId() {
        return providerImageId;
    }
    public void setProviderImageId(long providerImageId) {
        this.providerImageId = providerImageId;
    }

    public long getPaymentMethod() {
        return paymentMethod;
    }
    public void setPaymentMethod(long paymentMethod) {
        this.paymentMethod = paymentMethod;
    }
}
