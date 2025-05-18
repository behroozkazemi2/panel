package com.behrouz.dashboardpanel.okhttp.api;

import com.behrouz.dashboardpanel.okhttp.base.XimaEndPoint;
import com.fasterxml.jackson.databind.ObjectMapper;

import java.io.IOException;


/**
 * created by Hapi.
 * company: Mobin Tabaran
 * create Date: 17 Sep 2018
 */

public class ApiRequestBody<T> {

    private String token;

    private String action;

    private int version;

    private T params;


    public ApiRequestBody(String token){
        this.token = token;
        this.version = 1;
    }


    public ApiRequestBody(String token, XimaEndPoint endPoint){
        this(token,endPoint , null);
    }


    public ApiRequestBody(String token, XimaEndPoint endPoint, T params) {
        this.token = token;
        this.action = endPoint.getApiAction();
        this.version = 1;
        this.params = params;
    }

    public ApiRequestBody(String token, T params) {
        this.token = token;
        this.version = 1;
        this.params = params;
    }

    public String getToken() {
        return token;
    }
    public void setToken(String token) {
        this.token = token;
    }



    public String getAction() {
        return action;
    }
    public void setAction(String action) {
        this.action = action;
    }


    public int getVersion() {
        return version;
    }
    public void setVersion(int version) {
        this.version = version;
    }


    public T getParams() {
        return params;
    }
    public void setParams(T params) {
        this.params = params;
    }
    public <T> T getParams(Class<T> request) {
        ObjectMapper mapper = new ObjectMapper();
        try {
            return mapper.readValue(mapper.writeValueAsString(params), request);
        } catch (IOException e) {
            e.printStackTrace();
        }
        return null;
    }

}
