package com.behrouz.dashboardpanel.rest.response;


import com.behrouz.dashboardpanel.util.date.PersianDateUtil;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import java.io.Serializable;

/**
 * Created by: HapiKZM
 **/
@JsonIgnoreProperties(ignoreUnknown = true)
public class CommentResponseRequest implements Serializable {

    private int id;
    private long status;

    private String name;
    private String productName;
    private long productIde;

    private float rate;

    private String date;
    private boolean logedIn;

    private String text;
    private String email;



    public CommentResponseRequest(int id, long status, String name, String productName, long productIde, float rate, String date, boolean logedIn, String text, String email) {
        this.id = id;
        this.status = status;
        this.name = name;
        this.productName = productName;
        this.productIde = productIde;
        this.rate = rate;
        this.date = date;
        this.logedIn = logedIn;
        this.text = text;
        this.email = email;
    }

    public CommentResponseRequest() {
    }

    public CommentResponseRequest(String name, float rate, String date, String text) {
        this.name = name;
        this.rate = rate;
        this.date = date;
        this.text = text;
    }

    public CommentResponseRequest(CommentResponse c) {
        this.name = c.getCustomerName();
        this.status = c.getStatus();
        this.rate = c.getRate();
        this.email = c.getEmail();
        this.date = PersianDateUtil.getPersianDate(c.getDate().getTime());
        this.text = c.getText();
        this.logedIn = c.isLogedIn();
    }

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


    public float getRate() {
        return rate;
    }
    public void setRate(float rate) {
        this.rate = rate;
    }


    public String getDate() {
        return date;
    }
    public void setDate(String date) {
        this.date = date;
    }

    public String getEmail() {
        return email;
    }
    public void setEmail(String email) {
        this.email = email;
    }

    public String getText() {
        return text;
    }
    public void setText(String text) {
        this.text = text;
    }

    public boolean isLogedIn() {
        return logedIn;
    }
    public void setLogedIn(boolean logedIn) {
        this.logedIn = logedIn;
    }

    public long getStatus() {
        return status;
    }
    public void setStatus(long status) {
        this.status = status;
    }

    public String getProductName() {
        return productName;
    }
    public void setProductName(String productName) {
        this.productName = productName;
    }

    public long getProductIde() {
        return productIde;
    }

    public void setProductIde(long productIde) {
        this.productIde = productIde;
    }


}
