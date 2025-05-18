package com.behrouz.dashboardpanel.controller;

/**
 * Created by: Hapi
 * 13 September 2020
 **/

public class DataTable {

    private int page;
    private int pages;
    private int perpage;
    private long total;
    private String sort;
    private String field;

    public DataTable () {
    }

    public DataTable ( int page, int perpage, long total) {
        this.page = page;
        this.perpage = perpage;
        this.total = total;
    }

    public DataTable ( int page, int pages, int perpage, int total, String sort, String field) {
        this.page = page;
        this.pages = pages;
        this.perpage = perpage;
        this.total = total;
        this.sort = sort;
        this.field = field;
    }

    public int getPage() {
        return page;
    }
    public void setPage(int page) {
        this.page = page;
    }



    public int getPages() {
        return pages;
    }
    public void setPages(int pages) {
        this.pages = pages;
    }



    public int getPerpage() {
        return perpage;
    }
    public void setPerpage(int perpage) {
        this.perpage = perpage;
    }



    public long getTotal() {
        return total;
    }
    public void setTotal(long total) {
        this.total = total;
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


}
