package com.behrouz.dashboardpanel.okhttp.listener;


/**
 * created by Hapi.
 */

public interface OkHttpCallback<T> {

    void onResponse(T response);

    void onRequestReject(int rejectCode, String message);

    void onFailure(String errorMessage);


}