package com.behrouz.dashboardpanel.okhttp.exception;


import com.behrouz.dashboardpanel.okhttp.api.HttpCode;

/**
 * created by: Hapi
 * 18 March 2018
 **/


public class ApiActionFailureException extends ApiActionException{

    public ApiActionFailureException() {
        super( HttpCode.INTERNAL_SERVER_ERROR , "internal server error");
    }

    public ApiActionFailureException(String description) {
        super( HttpCode.INTERNAL_SERVER_ERROR , description);
    }
}
