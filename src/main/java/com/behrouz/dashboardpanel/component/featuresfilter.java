package com.behrouz.dashboardpanel.component;

public class featuresfilter {

    private int id;

    private String name;

    public featuresfilter() {
    }

    public featuresfilter(int id, String name) {
        this.id = id;
        this.name = name;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }
}
