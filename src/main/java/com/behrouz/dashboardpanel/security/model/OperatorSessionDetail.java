package com.behrouz.dashboardpanel.security.model;

import java.io.Serializable;
import java.time.LocalDateTime;

/**
 * created by: Hapi
 * 11 July 2018
 **/

public class OperatorSessionDetail implements Serializable {

    private static final long serialVersionUID = -664955797751228728L;


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

    private LocalDateTime loginDate;

    private String username;

    //master operator
    private boolean master;


    private int providerId;




    public int getId () {
        return id;
    }
    public void setId ( int id ) {
        this.id = id;
    }


    public String getFirstName () {
        return firstName;
    }
    public void setFirstName ( String firstName ) {
        this.firstName = firstName;
    }


    public String getLastName () {
        return lastName;
    }
    public void setLastName ( String lastName ) {
        this.lastName = lastName;
    }


    public static long getSerialVersionUID() {
        return serialVersionUID;
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

    public int getAvatar () {
        return avatar;
    }
    public void setAvatar ( int avatar ) {
        this.avatar = avatar;
    }


    public String getToken () {
        return token;
    }
    public void setToken ( String token ) {
        this.token = token;
    }


    public LocalDateTime getLoginDate () {
        return loginDate;
    }
    public void setLoginDate ( LocalDateTime loginDate ) {
        this.loginDate = loginDate;
    }


    public String getUsername () {
        return username;
    }
    public void setUsername ( String username ) {
        this.username = username;
    }




    public boolean isMaster() {
        return master;
    }
    public void setMaster(boolean master) {
        this.master = master;
    }



    public OperatorSessionDetail(int id, String firstName, String lastName, int avatar, String token, LocalDateTime loginDate, String username, boolean master, int providerId) {
        this.id = id;
        this.firstName = firstName;
        this.lastName = lastName;
        this.avatar = avatar;
        this.token = token;
        this.loginDate = loginDate;
        this.username = username;
        this.master = master;
        this.providerId = providerId;
    }

    public OperatorSessionDetail(int id, String firstName, String lastName, String address, String phone, String emergencyPhone, String instagramId, String telegramId, int avatar, String token, LocalDateTime loginDate, String username, boolean master, int providerId) {
        this.id = id;
        this.firstName = firstName;
        this.lastName = lastName;
        this.address = address;
        this.phone = phone;
        this.emergencyPhone = emergencyPhone;
        this.instagramId = instagramId;
        this.telegramId = telegramId;
        this.avatar = avatar;
        this.token = token;
        this.loginDate = loginDate;
        this.username = username;
        this.master = master;
        this.providerId = providerId;
    }

    public boolean isSuperVisor(){
        return isMaster();
    }



    public int getProviderId() {
        return providerId;
    }
    public void setProviderId(int providerId) {
        this.providerId = providerId;
    }
}
