package com.behrouz.dashboardpanel.okhttp.exception;


/**
 * created by: Hapi
 * 18 March 2018
 **/


import com.behrouz.dashboardpanel.okhttp.api.HttpCode;

/**
 * unknown action received
 */
public class ApiActionUnknownActionException extends ApiActionException {

    public ApiActionUnknownActionException(){
        super( HttpCode.REQUEST_REJECT , "action not found");
    }


}
