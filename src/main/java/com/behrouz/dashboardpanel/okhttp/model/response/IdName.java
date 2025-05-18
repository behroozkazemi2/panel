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

public class IdName implements Serializable {

    protected long id;

    protected String name;

    public IdName() {
    }


    public IdName(long id, String name) {
        this.id = id;
        this.name = name;
    }


    public IdName(long id) {
        this.id = id;
    }

    public long getId() {
        return id;
    }
    public void setId(long id) {
        this.id = id;
    }


    public String getName() {
        return name;
    }
    public void setName(String name) {
        this.name = name;
    }
}
