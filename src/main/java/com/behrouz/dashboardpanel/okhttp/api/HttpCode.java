package com.behrouz.dashboardpanel.okhttp.api;

/**
 * created by: Hapi
 * 18 March 2018
 **/


public enum HttpCode {
    OK(200   , "OK"),
    NOT_ALLOW(504   , "Not Allowed"),
    REQUEST_REJECT( 400  , "Request Rejected" ),
    INTERNAL_SERVER_ERROR(500 , "Internal Server Error");

    private int value;
    private String reasonPhrase;

    HttpCode(int numericValue, String reasonPhrase) {
        this.value = numericValue;
        this.reasonPhrase = reasonPhrase;
    }

    public int getValue() {
        return value;
    }

    public String getReasonPhrase() {
        return this.reasonPhrase;
    }





    public static HttpCode getByValue(int value) {
        for(HttpCode code : HttpCode.values()){
            if(code.getValue() == value){
                return code;
            }
        }

        return INTERNAL_SERVER_ERROR;
    }


    @Override
    public String toString() {
        return String.format( "code %d reason %s",this.getValue() , this.getReasonPhrase());
    }
}


