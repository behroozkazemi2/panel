package com.behrouz.dashboardpanel.rest.response;

import java.io.Serializable;
import java.util.List;

public class TicketMessageRestResponse implements Serializable  {

    private boolean isAdmin;
    private String role;
    private String insertDate;
    private String text;
    private List<DocumentRestResponse> doc;
    private String name;
    private String summaryText;

    public TicketMessageRestResponse() {
    }

    public TicketMessageRestResponse(boolean isAdmin , String role, String insertDate, String text, List<DocumentRestResponse> doc , String name) {
        this.isAdmin = isAdmin;
        this.role = role;
        this.insertDate = insertDate;
        this.text = text;
        this.doc = doc;
        this.name = name;
        this.summaryText = text.substring(0,Math.min(120, text.length())) + "..." ;
    }


    public boolean isAdmin() {
        return isAdmin;
    }
    public void setAdmin(boolean admin) {
        isAdmin = admin;
    }

    public String getRole() {
        return role;
    }
    public void setRole(String role) {
        this.role = role;
    }


    public String getInsertDate() {
        return insertDate;
    }
    public void setInsertDate(String insertDate) {
        this.insertDate = insertDate;
    }


    public String getText() {
        return text;
    }
    public void setText(String text) {
        this.text = text;
    }


    public List<DocumentRestResponse> getDoc() {
        return doc;
    }
    public void setDoc(List<DocumentRestResponse> doc) {
        this.doc = doc;
    }

    public String getName() {
        return name;
    }
    public void setName(String name) {
        this.name = name;
    }

    public String getSummaryText() {
        return summaryText;
    }
    public void setSummaryText(String summaryText) {
        this.summaryText = summaryText;
    }
}