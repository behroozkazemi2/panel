package com.behrouz.dashboardpanel.okhttp.model.response;

public class ProductDigestResponse {

    private int id;

    private long image;

    private IdName provider;

    private String name;

    private String shortDescription;

    private String category;

    private String brand;

    private String unit;


    public ProductDigestResponse() {
    }


    public ProductDigestResponse(int id, long image, IdName provider, String name, String shortDescription, String category, long primitiveAmount, float discountPercent, long discountAmount, long finalAmount, String unit, float rate, boolean exist, float showOrder, String  brand) {
        this.id = id;
        this.image = image;
        this.provider = provider;
        this.name = name;
        this.shortDescription = shortDescription;
        this.category = category;
        this.unit = unit;
        this.brand = brand;
    }

    public int getId() {
        return id;
    }
    public void setId(int id) {
        this.id = id;
    }



    public long getImage() {
        return image;
    }
    public void setImage(long image) {
        this.image = image;
    }


    public IdName getProvider() {
        return provider;
    }
    public void setProvider(IdName provider) {
        this.provider = provider;
    }


    public String getName() {
        return name;
    }
    public void setName(String name) {
        this.name = name;
    }

    public String getUnit() {
        return unit;
    }
    public void setUnit(String unit) {
        this.unit = unit;
    }

    public String getShortDescription() {
        return shortDescription;
    }
    public void setShortDescription(String shortDescription) {
        this.shortDescription = shortDescription;
    }



    public String getCategory() {
        return category;
    }
    public void setCategory(String category) {
        this.category = category;
    }

    public String getBrand() {
        return brand;
    }
    public void setBrand(String brand) {
        this.brand = brand;
    }
}
