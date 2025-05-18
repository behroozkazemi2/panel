package com.behrouz.dashboardpanel.rest.request;

public class TicketMessageRequest {

    private long ticketId;
    private boolean lastMessage;

    public TicketMessageRequest() {
    }

    public TicketMessageRequest(long ticketId, boolean lastMessage) {
        this.ticketId = ticketId;
        this.lastMessage = lastMessage;
    }

    public long getTicketId() {
        return ticketId;
    }
    public void setTicketId(long ticketId) {
        this.ticketId = ticketId;
    }

    public boolean isLastMessage() {
        return lastMessage;
    }
    public void setLastMessage(boolean lastMessage) {
        this.lastMessage = lastMessage;
    }
}
