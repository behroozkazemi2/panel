package com.behrouz.dashboardpanel.okhttp.exception;


import com.behrouz.dashboardpanel.okhttp.api.HttpCode;

/**
 * created by: Hapi
 * 18 March 2018
 **/


public class ApiActionEncryptionException extends ApiActionException{

    public ApiActionEncryptionException() {
        super( HttpCode.REQUEST_REJECT , "‌bad encryption, check private and public key");
    }
}
