package com.behrouz.dashboardpanel.okhttp.exception;


import com.behrouz.dashboardpanel.okhttp.api.HttpCode;

/**
 * created by: Hapi
 * 19 March 2018
 **/


public class ApiActionNotFoundException extends ApiActionException {


    public ApiActionNotFoundException() {
        super(HttpCode.REQUEST_REJECT);
    }

    public ApiActionNotFoundException(String description) {
        super(HttpCode.REQUEST_REJECT , description);
    }

}
