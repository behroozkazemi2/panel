package com.behrouz.dashboardpanel.rest.request;


public class TicketListRestRequest {

    private int page;
    private int perpage;
    private long project;
    private long ticketImportance;
    private String search;
    private String sort;
    private String field;
    private long responseType;
    private long lastMsgDate;
    private long lastMsgToDate;
    private long closed;

    public TicketListRestRequest() {
    }

    public TicketListRestRequest(int page, int perpage, long project, long ticketImportance, String search, String sort, String field, long responseType, long lastMsgDate, long lastMsgToDate, long closed) {
        this.page = page;
        this.perpage = perpage;
        this.project = project;
        this.ticketImportance = ticketImportance;
        this.search = search;
        this.sort = sort;
        this.field = field;
        this.responseType = responseType;
        this.lastMsgDate = lastMsgDate;
        this.lastMsgToDate = lastMsgToDate;
        this.closed = closed;
    }


    public int getPage() {
        return page;
    }
    public void setPage(int page) {
        this.page = page;
    }


    public int getPerpage() {
        return perpage;
    }
    public void setPerpage(int perpage) {
        this.perpage = perpage;
    }


    public long getProject() {
        return project;
    }
    public void setProject(long project) {
        this.project = project;
    }


    public long getTicketImportance() {
        return ticketImportance;
    }
    public void setTicketImportance(long ticketImportance) {
        this.ticketImportance = ticketImportance;
    }


    public String getSearch() {
        return search;
    }
    public void setSearch(String search) {
        this.search = search;
    }


    public String getSort() {
        return sort;
    }
    public void setSort(String sort) {
        this.sort = sort;
    }


    public String getField() {
        return field;
    }
    public void setField(String field) {
        this.field = field;
    }


    public long getResponseType() {
        return responseType;
    }
    public void setResponseType(long responseType) {
        this.responseType = responseType;
    }


    public long getLastMsgDate() {
        return lastMsgDate;
    }
    public void setLastMsgDate(long lastMsgDate) {
        this.lastMsgDate = lastMsgDate;
    }


    public long getLastMsgToDate() {
        return lastMsgToDate;
    }
    public void setLastMsgToDate(long lastMsgToDate) {
        this.lastMsgToDate = lastMsgToDate;
    }


    public long isClosed() {
        return closed;
    }
    public void setClosed(long closed) {
        this.closed = closed;
    }
}
