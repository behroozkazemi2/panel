package com.behrouz.dashboardpanel.okhttp.model.response;

import com.behrouz.dashboardpanel.okhttp.model.request.LatLngData;

import java.util.Date;
import java.util.List;

/**
 * Created by Hapi
 * 09 September 2018 15:52
 **/
public class ProviderResponse {

    private int id;

    private String name;


    private String address;// آدرس

    private String phone;// شماره تلفن ها

    private int imageId;// آیدی تصویر اصلی تامین کننده

    private boolean active;

    private Date insertDate;

    private int minDay;

    private double rate;

    private String shortDescription;

    private String fullDescription;

    private List<IdName> providerImage;


    protected String instagramId;

    private String telegramId;

    private long regionId;

    private List<LatLngData> location;

    public ProviderResponse() {
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



    public String getAddress() {
        return address;
    }
    public void setAddress(String address) {
        this.address = address;
    }



    public String getPhone() {
        return phone;
    }
    public void setPhone( String phone ) {
        this.phone = phone;
    }



    public int getImageId() {
        return imageId;
    }
    public void setImageId(int imageId) {
        this.imageId = imageId;
    }


    public boolean isActive() {
        return active;
    }
    public void setActive(boolean active) {
        this.active = active;
    }



    public Date getInsertDate() {
        return insertDate;
    }
    public void setInsertDate(Date insertDate) {
        this.insertDate = insertDate;
    }


    public int getMinDay() {
        return minDay;
    }
    public void setMinDay(int minDay) {
        this.minDay = minDay;
    }



    public double getRate() {
        return rate;
    }
    public void setRate(double rate) {
        this.rate = rate;
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


    public String getInstagramId() {
        return instagramId;
    }
    public void setInstagramId(String instagramId) {
        this.instagramId = instagramId;
    }



    public String getTelegramId() {
        return telegramId;
    }
    public void setTelegramId(String telegramId) {
        this.telegramId = telegramId;
    }

    public List<IdName> getProviderImage() {
        return providerImage;
    }
    public void setProviderImage(List<IdName> providerImage) {
        this.providerImage = providerImage;
    }


    public long getRegionId() {
        return regionId;
    }
    public void setRegionId(long regionId) {
        this.regionId = regionId;
    }

    public List<LatLngData> getLocation() {
        return location;
    }
    public void setLocation(List<LatLngData> location) {
        this.location = location;
    }
}
