package com.behrouz.dashboardpanel.okhttp.exception;


/**
 * created by: Hapi
 * 18 March 2018
 **/


import com.behrouz.dashboardpanel.okhttp.api.HttpCode;

/**
 * extra param seen from api action method
 * when method has more than 2 params and param invalid
 */
public class ApiActionParamsException extends ApiActionException {

    public ApiActionParamsException(){
        super( HttpCode.REQUEST_REJECT , "invalid parameter" );
    }


}
