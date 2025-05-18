package com.behrouz.dashboardpanel.rest.request;

import com.behrouz.dashboardpanel.security.model.OperatorSessionDetail;
import org.springframework.web.multipart.MultipartFile;

/**
 * Created by: Hapi
 * 12 September 2020
 **/
public class ProfileInformationRequest {

    private String name;

    private String address;

    private String telegramId;

    private String instagramId;

    private String phone;

    private String emergencyPhone;

    private MultipartFile avatar;

    private int avatarId;


    public ProfileInformationRequest() {
    }

    public ProfileInformationRequest(String name, String address, String telegramId, String instagramId, String phone, String emergencyPhone, MultipartFile avatar, int avatarId) {
        this.name = name;
        this.address = address;
        this.telegramId = telegramId;
        this.instagramId = instagramId;
        this.phone = phone;
        this.emergencyPhone = emergencyPhone;
        this.avatar = avatar;
        this.avatarId = avatarId;
    }

    public ProfileInformationRequest(OperatorSessionDetail detail) {
        this.name = detail.getUsername();
        this.address = detail.getAddress();
        this.telegramId = detail.getTelegramId();
        this.instagramId = detail.getInstagramId();
        this.phone = detail.getPhone();
        this.emergencyPhone = detail.getEmergencyPhone();
        this.avatarId = detail.getAvatar();
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


    public String getTelegramId() {
        return telegramId;
    }
    public void setTelegramId(String telegramId) {
        this.telegramId = telegramId;
    }


    public String getInstagramId() {
        return instagramId;
    }
    public void setInstagramId(String instagramId) {
        this.instagramId = instagramId;
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


    public MultipartFile getAvatar() {
        return avatar;
    }
    public void setAvatar(MultipartFile avatar) {
        this.avatar = avatar;
    }


    public int getAvatarId() {
        return avatarId;
    }
    public void setAvatarId(int avatarId) {
        this.avatarId = avatarId;
    }
}
