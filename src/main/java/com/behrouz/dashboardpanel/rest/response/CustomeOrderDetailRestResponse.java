package com.behrouz.dashboardpanel.rest.response;

import com.behrouz.dashboardpanel.okhttp.model.response.IdName;

import java.util.List;

public class CustomeOrderDetailRestResponse {

    private int id;

    private int factorId;

    private IdName status;

    private IdName customer;

    private String customerPhone;

    private String code;

    private String date;

    private String Address;

    private long finalAmount;

    private int discountPercent;

    private List orders;

    //with out orderList
    public CustomeOrderDetailRestResponse(int id, int factorId, IdName status, IdName customer, String customerPhone, String code, String date, String address, long finalAmount, int discountPercent) {
        this.id = id;
        this.factorId = factorId;
        this.status = status;
        this.customer = customer;
        this.customerPhone = customerPhone;
        this.code = code;
        this.date = date;
        this.Address = address;
        this.finalAmount = finalAmount;
        this.discountPercent = discountPercent;
    }
    //

    public CustomeOrderDetailRestResponse(int id, int factorId, IdName status, IdName customer, String customerPhone, String code, String date, String address, long finalAmount, int discountPercent, List orders) {
        this.id = id;
        this.factorId = factorId;
        this.status = status;
        this.customer = customer;
        this.customerPhone = customerPhone;
        this.code = code;
        this.date = date;
        Address = address;
        this.finalAmount = finalAmount;
        this.discountPercent = discountPercent;
        this.orders = orders;
    }

    public CustomeOrderDetailRestResponse(int id, int factorId, IdName ثبت_شده, IdName سید_امید_رضایی, String customerPhone, int i, String date, String address, int finalAmount, int discountPercent) {
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public int getFactorId() {
        return factorId;
    }

    public void setFactorId(int factorId) {
        this.factorId = factorId;
    }

    public IdName getStatus() {
        return status;
    }

    public void setStatus(IdName status) {
        this.status = status;
    }

    public IdName getCustomer() {
        return customer;
    }

    public void setCustomer(IdName customer) {
        this.customer = customer;
    }

    public String getCustomerPhone() {
        return customerPhone;
    }

    public void setCustomerPhone(String customerPhone) {
        this.customerPhone = customerPhone;
    }

    public String getCode() {
        return code;
    }

    public void setCode(String code) {
        this.code = code;
    }

    public String getDate() {
        return date;
    }

    public void setDate(String date) {
        this.date = date;
    }

    public String getAddress() {
        return Address;
    }

    public void setAddress(String address) {
        Address = address;
    }

    public long getFinalAmount() {
        return finalAmount;
    }

    public void setFinalAmount(long finalAmount) {
        this.finalAmount = finalAmount;
    }

    public int getDiscountPercent() {
        return discountPercent;
    }

    public void setDiscountPercent(int discountPercent) {
        this.discountPercent = discountPercent;
    }

    public List getOrders() {
        return orders;
    }

    public void setOrders(List orders) {
        this.orders = orders;
    }
}
