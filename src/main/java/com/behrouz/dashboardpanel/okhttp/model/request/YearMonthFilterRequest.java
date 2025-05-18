package com.behrouz.dashboardpanel.okhttp.model.request;

import java.io.Serializable;

/**
 * created by Hapi.
 * company: Mobin Tabaran
 * create Date: 24 Sep 2018
 * user Group: mobin
 * project: Koala
 * package: ir.moblongabaran.xima.android.customer.okhttp.model.response
 */

public class YearMonthFilterRequest implements Serializable {

    protected long year;
    protected long month;
    protected boolean groupByMonth;


    public YearMonthFilterRequest() {
    }

    public YearMonthFilterRequest(long year, long month, boolean groupByMonth) {
        this.year = year;
        this.month = month;
        this.groupByMonth = groupByMonth;
    }

    public long getYear() {
        return year;
    }
    public void setYear(long year) {
        this.year = year;
    }

    public long getMonth() {
        return month;
    }
    public void setMonth(long month) {
        this.month = month;
    }

    public boolean isGroupByMonth() {
        return groupByMonth;
    }
    public void setGroupByMonth(boolean groupByMonth) {
        this.groupByMonth = groupByMonth;
    }
}