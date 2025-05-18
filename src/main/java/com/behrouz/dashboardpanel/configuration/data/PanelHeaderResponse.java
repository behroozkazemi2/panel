package com.behrouz.dashboardpanel.configuration.data;


import com.behrouz.dashboardpanel.security.model.OperatorSessionDetail;

import java.time.ZoneId;
import java.util.Date;

public class PanelHeaderResponse {

    private int id;

    private String firstName;

    private String lastName;

    private String username;

    private int avatar;

    private Date loginDate;


    public PanelHeaderResponse() {
    }


    public PanelHeaderResponse(OperatorSessionDetail detail) {
        this.id = detail.getId();
        this.firstName = detail.getFirstName();
        this.lastName = detail.getLastName();
        this.username = detail.getUsername();

        this.avatar = detail.getAvatar();
        this.loginDate = new Date(detail.getLoginDate().atZone(ZoneId.systemDefault()).toInstant().toEpochMilli());
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


    public String getUsername() {
        return username;
    }
    public void setUsername(String username) {
        this.username = username;
    }


    public int getAvatar() {
        return avatar;
    }
    public void setAvatar(int avatar) {
        this.avatar = avatar;
    }


    public Date getLoginDate() {
        return loginDate;
    }
    public void setLoginDate(Date loginDate) {
        this.loginDate = loginDate;
    }
}
