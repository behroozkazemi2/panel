package com.behrouz.dashboardpanel.okhttp.model.request;

public class ProviderLoginRequest {

    private String username;

    private String password;

    public ProviderLoginRequest(String username, String password) {
        this.username = username;
        this.password = password;
    }


    public String getUsername() {
        return username;
    }
    public void setUsername(String username) {
        this.username = username;
    }



    public String getPassword() {
        return password;
    }
    public void setPassword(String password) {
        this.password = password;
    }
}
