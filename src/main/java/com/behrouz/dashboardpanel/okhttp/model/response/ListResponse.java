package com.behrouz.dashboardpanel.okhttp.model.response;

import java.util.List;

public class ListResponse<T> {

    private long count;

    private List<T> data;


    public ListResponse() {
    }

    public ListResponse(List<T> data, long count) {
        this.count = count;
        this.data = data;
    }

    public long getCount() {
        return count;
    }
    public void setCount(long count) {
        this.count = count;
    }



    public List<T> getData() {
        return data;
    }
    public void setData(List<T> data) {
        this.data = data;
    }
}
