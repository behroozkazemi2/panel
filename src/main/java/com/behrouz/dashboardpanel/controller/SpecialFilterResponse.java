package com.behrouz.dashboardpanel.controller;

import com.behrouz.dashboardpanel.okhttp.model.response.IdName;
import com.behrouz.dashboardpanel.okhttp.model.response.RegionResponse;

import java.util.HashMap;
import java.util.List;

public class SpecialFilterResponse {

    private List<RegionResponse> regions ;
    private HashMap<Integer, List<IdName>> categories ;
    private HashMap<Integer, HashMap<Integer, List<IdName>>> providers ;

    public SpecialFilterResponse() {
    }

    public SpecialFilterResponse(List<RegionResponse> regions, HashMap<Integer, List<IdName>> categories, HashMap<Integer, HashMap<Integer, List<IdName>>> providers) {
        this.regions = regions;
        this.categories = categories;
        this.providers = providers;
    }

    public List<RegionResponse> getRegions() {
        return regions;
    }
    public void setRegions(List<RegionResponse> regions) {
        this.regions = regions;
    }


    public HashMap<Integer, List<IdName>> getCategories() {
        return categories;
    }
    public void setCategories(HashMap<Integer, List<IdName>> categories) {
        this.categories = categories;
    }


    public HashMap<Integer, HashMap<Integer, List<IdName>>> getProviders() {
        return providers;
    }
    public void setProviders(HashMap<Integer, HashMap<Integer, List<IdName>>> providers) {
        this.providers = providers;
    }
}
