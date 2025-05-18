package com.behrouz.dashboardpanel.okhttp.model;



/**
 * Created by MojtabaJ
 * 10 September 2020 09:10
 **/
public class UnitListDigestResponse {

    private int id;

    private String name;

    private boolean dividable;

    private float ratio;

    private float tolerance;

    public UnitListDigestResponse() {
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



    public boolean isDividable() {
        return dividable;
    }
    public void setDividable(boolean dividable) {
        this.dividable = dividable;
    }



    public float getRatio() {
        return ratio;
    }
    public void setRatio(float ratio) {
        this.ratio = ratio;
    }



    public float getTolerance() {
        return tolerance;
    }
    public void setTolerance(float tolerance) {
        this.tolerance = tolerance;
    }


}
