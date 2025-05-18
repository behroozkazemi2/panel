package com.behrouz.dashboardpanel.rest.response;

import com.behrouz.dashboardpanel.okhttp.model.response.IdName;

/**
 * Created by: HapiKzm
 * 30 September 2020
 **/
public class CustomerOrderRestResponse {

    private int id;

    private int factorId;

    private IdName status;

    private IdName customer;

    private String customerPhone;

    private String code;

    private String date;

    private long finalAmount;

    public CustomerOrderRestResponse() {
    }

    public CustomerOrderRestResponse(int id, int factorId, IdName status, IdName customer, String customerPhone, String code, String date, long finalAmount) {
        this.id = id;
        this.factorId = factorId;
        this.status = status;
        this.customer = customer;
        this.customerPhone = customerPhone;
        this.code = code;
        this.date = date;
        this.finalAmount = finalAmount;
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


    public String getDate() {
        return date;
    }
    public void setDate(String date) {
        this.date = date;
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


    public long getFinalAmount() {
        return finalAmount;
    }
    public void setFinalAmount(long finalAmount) {
        this.finalAmount = finalAmount;
    }
}
