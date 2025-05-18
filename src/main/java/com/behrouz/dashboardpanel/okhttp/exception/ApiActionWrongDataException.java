package com.behrouz.dashboardpanel.okhttp.exception;


import com.behrouz.dashboardpanel.okhttp.api.HttpCode;

/**
 * Created by Hapi
 * 12 July 2018 11:53
 **/


public class ApiActionWrongDataException extends ApiActionException {

    public ApiActionWrongDataException() {
        super(HttpCode.REQUEST_REJECT , "data wrong");
    }

    public ApiActionWrongDataException(String description) {
        super(HttpCode.REQUEST_REJECT , description);
    }
}
