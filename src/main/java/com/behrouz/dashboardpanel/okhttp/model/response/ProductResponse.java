package com.behrouz.dashboardpanel.okhttp.model.response;


import java.util.List;
import java.util.stream.Collectors;

public class ProductResponse implements ThymeleafUtil {

    private int id;

    private String shortDescription;

    private String fullDescription;

    private IdName unit;

    private int unitId; // JUST FOR PANEL

    private String name;

    private IdName category;

    private int categoryId; // JUST FOR PANEL

    private double unitStep;

    private List<Long> images;

    private List<IdName> tags;

    private IdName brand;

    private int brandId; // JUST FOR PANEL

    private List<Long> tagsId; // JUST FOR PANEL

    public ProductResponse() {
    }





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



    public IdName getCategory() {
        return category;
    }
    public void setCategory(IdName category) {
        this.category = category;
        this.categoryId = (int) category.id;
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


    public List<IdName> getTags() {
        return tags;
    }
    public void setTags(List<IdName> tags) {
        this.tags = tags;
        if(tags != null && !tags.isEmpty()){
            tagsId = tags.stream().map(IdName::getId).collect(Collectors.toList());
        }
    }

    public IdName getUnit() {
        return unit;
    }
    public void setUnit(IdName unit) {
        this.unit = unit;
    }

    public int getUnitId() {
        return unitId;
    }
    public void setUnitId(int unitId) {
        this.unitId = unitId;
    }


    public List<Long> getTagsId() {
        return tagsId;
    }
    public void setTagsId(List<Long> tagsId) {
        this.tagsId = tagsId;
    }

    public int getCategoryId() {
        return categoryId;
    }
    public void setCategoryId(int categoryId) {
        this.categoryId = categoryId;
    }

    public IdName getBrand() {
        return brand;
    }
    public void setBrand(IdName brand) {
        this.brand = brand;
    }


    public int getBrandId() {
        return brandId;
    }
    public void setBrandId(int brandId) {
        this.brandId = brandId;
    }
}
