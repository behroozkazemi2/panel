package com.behrouz.dashboardpanel.component;

import java.util.List;

public class features {

    private int id;

    private String name;

    private List<featuresfilter> filter;

    public features() {
    }

    public features(int id, String name, List<featuresfilter> filter) {
        this.id = id;
        this.name = name;
        this.filter = filter;
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

    public List<featuresfilter> getFilter() {
        return filter;
    }

    public void setFilter(List<featuresfilter> filter) {
        this.filter = filter;
    }
}
