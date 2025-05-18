package com.behrouz.dashboardpanel.okhttp.model.response;


public class ProviderLoginResponse {

    private int id;

    private String firstName;

    private String lastName;

    private String address;

    private String phone;

    private String emergencyPhone;

    private String instagramId;

    private String telegramId;

    private int avatar;

    private String token;

    private String username;

    //master operator
    private boolean master;

    private int providerId;


    public ProviderLoginResponse() {
    }



    public int getId() {
        return id;
    }
    public void setId(int id) {
        this.id = id;
    }



    public String getFirstName() {
        return firstName;
    }
    public void setFirstName(String firstName) {
        this.firstName = firstName;
    }



    public String getLastName() {
        return lastName;
    }
    public void setLastName(String lastName) {
        this.lastName = lastName;
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
    public void setPhone(String phone) {
        this.phone = phone;
    }


    public String getEmergencyPhone() {
        return emergencyPhone;
    }
    public void setEmergencyPhone(String emergencyPhone) {
        this.emergencyPhone = emergencyPhone;
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


    public int getAvatar() {
        return avatar;
    }
    public void setAvatar(int avatar) {
        this.avatar = avatar;
    }



    public String getToken() {
        return token;
    }
    public void setToken(String token) {
        this.token = token;
    }



    public String getUsername() {
        return username;
    }
    public void setUsername(String username) {
        this.username = username;
    }



    public boolean isMaster() {
        return master;
    }
    public void setMaster(boolean master) {
        this.master = master;
    }



    public int getProviderId() {
        return providerId;
    }
    public void setProviderId(int providerId) {
        this.providerId = providerId;
    }
}
