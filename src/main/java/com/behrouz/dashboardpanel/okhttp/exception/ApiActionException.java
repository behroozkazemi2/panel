package com.behrouz.dashboardpanel.okhttp.exception;


/**
 * created by: Hapi
 * 18 March 2018
 **/


import com.behrouz.dashboardpanel.okhttp.api.HttpCode;

/**
 * parent of api action exception
 * has e http code
 *
 */
public class ApiActionException extends Exception{

    protected HttpCode httpCode;

    protected String description;

    public HttpCode getHttpCode() {
        return httpCode;
    }

    public String getDescription() {
        return description;
    }

    public ApiActionException(){

    }




    public void setHttpCode(HttpCode httpCode) {
        this.httpCode = httpCode;
    }

    public ApiActionException(HttpCode code){
        this.httpCode = code;
    }

    public ApiActionException(HttpCode code, String description){
        this.httpCode = code;
        this.description = description;
    }

    public ApiActionException(int code){
        this(HttpCode.getByValue( code ));
    }

    public ApiActionException(int code , String description){
        this(HttpCode.getByValue( code ) , description);
    }
}
