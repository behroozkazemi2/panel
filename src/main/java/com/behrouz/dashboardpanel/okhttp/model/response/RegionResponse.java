package com.behrouz.dashboardpanel.okhttp.model.response;

import java.util.List;

public class RegionResponse extends IdName {


    private List<IdName> regions;


    public RegionResponse() {
    }

    public RegionResponse(int id, String name, List<IdName> regions) {
        super(id, name);
        this.regions = regions;
    }

    public List<IdName> getRegions() {
        return regions;
    }
    public void setRegions(List<IdName> regions) {
        this.regions = regions;
    }
}
