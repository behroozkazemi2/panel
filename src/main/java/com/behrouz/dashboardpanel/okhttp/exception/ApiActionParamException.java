package com.behrouz.dashboardpanel.okhttp.exception;


/**
 * created by: Hapi
 * 18 March 2018
 **/


import com.behrouz.dashboardpanel.okhttp.api.HttpCode;

/**
 * null point param send to action
 * ApiActionParam when nullable = false and send null param to method
 * this exception throw
 */
public class ApiActionParamException extends ApiActionException {

    public ApiActionParamException(){
        super( HttpCode.REQUEST_REJECT , "bad parameter");
    }


}
