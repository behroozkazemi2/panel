package com.behrouz.dashboardpanel.okhttp.api;

import com.fasterxml.jackson.annotation.JsonGetter;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.annotation.JsonSetter;

/**
 * created by Hapi.
 */


public class ApiResponseBody<T> {
    private T data;
    private HttpCode code;
    private String description;
    private long total;

    public ApiResponseBody ok(T data) {
        code = HttpCode.OK;
        this.data = data;
        return this;
    }

    public ApiResponseBody ok() {
        code = HttpCode.OK;
        return this;
    }



    public ApiResponseBody error(String description) {
        code = HttpCode.REQUEST_REJECT;
        this.description = description;
        return this;
    }



    public ApiResponseBody failure() {
        code = HttpCode.INTERNAL_SERVER_ERROR;
        return this;
    }

    public ApiResponseBody notAllowed() {
        code = HttpCode.NOT_ALLOW;
        return this;
    }




    @JsonIgnore
    public HttpCode getCode() {
        return code;
    }

    @JsonGetter("status")
    public int getStatus(){
        return code.getValue();
    }

    @JsonGetter("message")
    @JsonIgnore
    public String getMessage(){
        return code.getReasonPhrase();
    }

    @JsonSetter("status")
    public void setStatus(int status){
        this.code = HttpCode.getByValue( status );
    }

    @JsonSetter("message")
    public void setMessage(String msg){
    }


    @JsonProperty("description")
    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public T getData() {
        return data;
    }

    @JsonProperty("total")
    public long getTotal() {
        return total;
    }
    public void setTotal(long total) {
        this.total = total;
    }


    public ApiResponseBody<T> setData(T data) {
        this.data = data;
        return this;
    }



    @Override
    public String toString() {
        return "Http Code: " + code + ", description: " + description + ", data: " + data ;
    }


    public ApiResponseBody setResult(HttpCode httpCode) {

        this.code = httpCode;
        return this;
    }


    public static ApiResponseBody generateResponse(HttpCode c){
        return generateResponse(c , null);
    }

    public static ApiResponseBody generateResponse(HttpCode c , String description){
        ApiResponseBody responseBody = new ApiResponseBody();
        responseBody.setResult( c );
        responseBody.setDescription( description );
        return responseBody;
    }


    public boolean successful(){
        return this.code != null && this.code == HttpCode.OK;
    }





}
