package com.behrouz.dashboardpanel.okhttp.model.request;

/**
 * Created by Abolfazl
 * Project xima-webapplication
 * 21 January 2019 3:52 PM
 **/
public class ListRequest {

    protected int page;

    protected int length;


    public ListRequest() {
    }

    public ListRequest(int page, int length) {
        this.page = page;
        this.length = length;
    }

    public int getPage() {
        return page;
    }
    public void setPage(int page) {
        this.page = page;
    }



    public int getLength() {
        return length;
    }
    public void setLength(int length) {
        this.length = length;
    }
}
