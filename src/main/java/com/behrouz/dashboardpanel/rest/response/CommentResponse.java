package com.behrouz.dashboardpanel.rest.response;

import java.util.Date;

/**
 * Created by: HapiKZM
 * Project Name: behta-server
 * 15 September 2020
 **/
public class CommentResponse {

    private long id;
    private long status;

    private boolean logedIn;
    private String customerName;

    private String text;
    private String originalText;
    private String email;

    private float rate;

    private Date date;

    public CommentResponse() {
    }

    public CommentResponse(boolean logedIn, long id, String customerName, String text, float rate, Date date) {
        this.logedIn = logedIn;
        this.id = id;
        this.customerName = customerName;
        this.text = text;
        this.originalText = text;
        this.rate = rate;
        this.date = date;
    }

    public CommentResponse(boolean logedIn, long id, String customerName, String text, String originalText, float rate, Date date) {
        this.logedIn = logedIn;
        this.id = id;
        this.customerName = customerName;
        this.text = text;
        this.originalText = originalText;
        this.rate = rate;
        this.date = date;
    }

    public long getId() {
        return id;
    }
    public void setId(long id) {
        this.id = id;
    }


    public String getCustomerName() {
        return customerName;
    }
    public void setCustomerName(String customerName) {
        this.customerName = customerName;
    }


    public String getText() {
        return text;
    }
    public void setText(String text) {
        this.text = text;
    }


    public long getStatus() {
        return status;
    }
    public void setStatus(long status) {
        this.status = status;
    }

    public float getRate() {
        return rate;
    }
    public void setRate(float rate) {
        this.rate = rate;
    }


    public Date getDate() {
        return date;
    }
    public void setDate(Date date) {
        this.date = date;
    }

    public boolean isLogedIn() {
        return logedIn;
    }
    public void setLogedIn(boolean logedIn) {
        this.logedIn = logedIn;
    }

    public String getOriginalText() {
        return originalText;
    }
    public void setOriginalText(String originalText) {
        this.originalText = originalText;
    }

    public String getEmail() {
        return email;
    }
    public void setEmail(String email) {
        this.email = email;
    }
}
