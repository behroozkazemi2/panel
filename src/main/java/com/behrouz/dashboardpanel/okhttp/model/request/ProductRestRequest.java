package com.behrouz.dashboardpanel.okhttp.model.request;


import java.util.List;

public class ProductRestRequest{


    private int id;

    private String shortDescription;

    private String fullDescription;

    private int unitId;

    private String name;

    private int categoryId;

    private int brandId;


    private double unitStep;

    private List<Long> images;

    private List<Long> tagsId;



    public int getId() {
        return id;
    }
    public void setId(int id) {
        this.id = id;
    }


    public String getShortDescription() {
        return shortDescription;
    }
    public void setShortDescription(String shortDescription) {
        this.shortDescription = shortDescription;
    }



    public String getFullDescription() {
        return fullDescription;
    }
    public void setFullDescription(String fullDescription) {
        this.fullDescription = fullDescription;
    }



    public String getName() {
        return name;
    }
    public void setName(String name) {
        this.name = name;
    }



    public int getCategoryId() {
        return categoryId;
    }
    public void setCategoryId(int categoryId) {
        this.categoryId = categoryId;
    }


    public double getUnitStep() {
        return unitStep;
    }
    public void setUnitStep(double unitStep) {
        this.unitStep = unitStep;
    }



    public List<Long> getImages() {
        return images;
    }
    public void setImages(List<Long> images) {
        this.images = images;
    }



    public List<Long> getTagsId() {
        return tagsId;
    }
    public void setTagsId(List<Long> tagsId) {
        this.tagsId = tagsId;
    }

    public int getUnitId() {
        return unitId;
    }
    public void setUnitId(int unitId) {
        this.unitId = unitId;
    }

    public int getBrandId() {
        return brandId;
    }
    public void setBrandId(int brandId) {
        this.brandId = brandId;
    }
}
