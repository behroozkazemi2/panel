package com.behrouz.dashboardpanel.okhttp.model.response;

import java.io.Serializable;

/**
 * created by Hapi.
 * company: Mobin Tabaran
 * create Date: 24 Sep 2018
 * user Group: mobin
 * project: Koala
 * package: ir.moblongabaran.xima.android.customer.okhttp.model.response
 */

public class IdLong implements Serializable {

    protected long id;
    protected long value;


    public IdLong() {
    }


    public IdLong(long id, long value) {
        this.id = id;
        this.value = value;
    }


    public IdLong(long id) {
        this.id = id;
    }

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public long getValue() {
        return value;
    }
    public void setValue(long value) {
        this.value = value;
    }
}

