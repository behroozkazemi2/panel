package com.behrouz.dashboardpanel.okhttp.exception;


/**
 * created by: Hapi
 * 18 March 2018
 **/


import com.behrouz.dashboardpanel.okhttp.api.HttpCode;

/**
 * received bad request
 * param not found or
 * param format is not in api action param format
 */
public class ApiActionBadRequestException extends ApiActionException {

    public ApiActionBadRequestException(){
        super( HttpCode.REQUEST_REJECT , "‌bad parameter");
    }


}
