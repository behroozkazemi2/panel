package com.behrouz.dashboardpanel.okhttp.model.request;

import com.behrouz.dashboardpanel.util.Thymeleaf.ThymeleafBase64Model;
import com.behrouz.dashboardpanel.okhttp.model.response.IdName;
import com.behrouz.dashboardpanel.okhttp.model.response.ProviderResponse;

import java.util.List;
import java.util.stream.Collectors;

/**
 * Created by Hapi
 * 10 September 2018 12:20
 **/
public class ProviderRequest implements ThymeleafBase64Model {

    private int id; // 0 -> new , ow -> edit

    private String name;

    private String shortDescription;

    private String fullDescription;

    private int logoId;

    private List< Long > providerImage;

    private int minDay;

    private String address;

    private String phone;

    private String instagramId;

    private String telegramId;

    private List<LatLngData> location;
    private String locationString;
    public ProviderRequest() {
    }

    public ProviderRequest(int id, String name, String shortDescription, String fullDescription, int logoId, List<Long> providerImage, int minDay, String address, String phone, String instagramId, String telegramId, List<LatLngData> location) {
        this.id = id;
        this.name = name;
        this.shortDescription = shortDescription;
        this.fullDescription = fullDescription;
        this.logoId = logoId;
        this.providerImage = providerImage;
        this.minDay = minDay;
        this.address = address;
        this.phone = phone;
        this.instagramId = instagramId;
        this.telegramId = telegramId;
        this.location = location;
    }

    public ProviderRequest(ProviderResponse data) {
        this(
                data.getId(),
                data.getName(),
                data.getShortDescription(),
                data.getFullDescription(),
                data.getImageId(),
                data.getProviderImage()!= null ? data.getProviderImage().stream().map(IdName::getId).collect(Collectors.toList()) : null ,
                data.getMinDay(),
                data.getAddress(),
                data.getPhone(),
                data.getInstagramId(),
                data.getTelegramId(),
                data.getLocation()
    );
    }

    public int getId() {
        return id;
    }
    public void setId(int id) {
        this.id = id;
    }


    public String getPhone() {
        return phone;
    }
    public void setPhone(String phone) {
        this.phone = phone;
    }



    public String getName() {
        return name;
    }
    public void setName(String name) {
        this.name = name;
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



    public int getLogoId() {
        return logoId;
    }
    public void setLogoId(int logoId) {
        this.logoId = logoId;
    }



    public List<Long> getProviderImage() {
        return providerImage;
    }
    public void setProviderImage(List<Long> providerImage) {
        this.providerImage = providerImage;
    }


    public int getMinDay() {
        return minDay;
    }
    public void setMinDay(int minDay) {
        this.minDay = minDay;
    }



    public String getAddress() {
        return address;
    }
    public void setAddress(String address) {
        this.address = address;
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

    public List<LatLngData> getLocation() {
        return location;
    }
    public void setLocation(List<LatLngData> location) {
        this.location = location;
    }

    public String getLocationString() {
        return locationString;
    }
    public void setLocationString(String locationString) {
        this.locationString = locationString;
    }
}
