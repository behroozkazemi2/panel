package com.behrouz.dashboardpanel.okhttp.exception;


import com.behrouz.dashboardpanel.okhttp.api.HttpCode;

/**
 * created by: Hapi
 * 03 June 2018
 **/


public class ApiActionSecurityException extends ApiActionException{


    public ApiActionSecurityException(){
        super( HttpCode.NOT_ALLOW , "not allowed" );
    }

}
