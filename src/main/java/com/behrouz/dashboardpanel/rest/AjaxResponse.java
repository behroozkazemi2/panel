package com.behrouz.dashboardpanel.rest;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;

public class AjaxResponse {

    private boolean result;

    private String data;


    public AjaxResponse() {
    }

    public AjaxResponse(boolean result, String data) {
        this.result = result;
        this.data = data;
    }


    public AjaxResponse(boolean result, Object data) {
        this.result = result;
        try {
            this.data = new ObjectMapper().writeValueAsString(data);
        } catch (JsonProcessingException e) {
            e.printStackTrace();
        }
    }



    public boolean isResult() {
        return result;
    }
    public void setResult(boolean result) {
        this.result = result;
    }



    public String getData() {
        return data;
    }
    public void setData(String data) {
        this.data = data;
    }
}
