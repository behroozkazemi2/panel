package com.behrouz.dashboardpanel.rest.request;

import java.util.List;

public class SaveTicketMessageRestRequest {

    private long ticketId;
    private String text;
    private List<Long> document;


    public long getTicketId() {
        return ticketId;
    }
    public void setTicketId(long ticketId) {
        this.ticketId = ticketId;
    }


    public String getText() {
        return text;
    }
    public void setText(String text) {
        this.text = text;
    }

    public List<Long> getDocument() {
        return document;
    }
    public void setDocument(List<Long> document) {
        this.document = document;
    }
}
