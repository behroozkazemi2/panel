package com.behrouz.dashboardpanel.okhttp.model.request;

/**
 * Created by: Hapi
 * 27 May 2020
 **/
public class IdNameType {

    protected int id;

    protected String name;

    protected int type;


    public IdNameType() {
    }


    public IdNameType(int id, String name, int type) {
        this.id = id;
        this.name = name;
        this.type = type;
    }

    public int getId () {
        return id;
    }
    public void setId ( int id ) {
        this.id = id;
    }


    public String getName () {
        return name;
    }
    public void setName ( String name ) {
        this.name = name;
    }


    public int getType() {
        return type;
    }
    public void setType(int type) {
        this.type = type;
    }
}
