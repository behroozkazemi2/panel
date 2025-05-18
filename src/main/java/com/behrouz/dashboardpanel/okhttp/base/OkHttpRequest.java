package com.behrouz.dashboardpanel.okhttp.base;

import com.behrouz.dashboardpanel.okhttp.api.ApiRequestBody;
import com.behrouz.dashboardpanel.okhttp.api.ApiResponseBody;
import com.behrouz.dashboardpanel.util.StringUtil;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import okhttp3.*;

import java.io.IOException;
import java.security.NoSuchAlgorithmException;
import java.util.concurrent.TimeUnit;


/**
 * Created by thunderbolt on 6/21/17.
 */

public class OkHttpRequest {


    private static final MediaType MEDIA_TYPE           = MediaType.parse("text/html; charset=utf-8");


    private static final int CONNECTION_TIME_OUT_SECOND = 30;


    private static final int READ_TIME_OUT_SECOND       = 60;

    private static final boolean DEBUG_MODE = true;

    private static final String TAG = OkHttpRequest.class.getSimpleName();


    private static OkHttpClient client                  = null;


    private static OkHttpClient getOkHttpClient() {

        if(client == null){

            client = new OkHttpClient.Builder()
                    .connectTimeout(CONNECTION_TIME_OUT_SECOND, TimeUnit.SECONDS)
                    .readTimeout(READ_TIME_OUT_SECOND , TimeUnit.SECONDS)
                    .build();
        }

        return client;
    }





    public static ApiResponseBody postRequest(
            final ApiRequestBody requestBody) {

        try {

            showRequestLog(requestBody);

            Request request =
                    new Request.Builder()
                            .url(Links.XIMA_SERVER)
                            .post(createRequestBody(requestBody))
                            .build();

            Response response = getOkHttpClient().newCall(request).execute();
            return createResponseBody(response);
        } catch (Exception e) {
            e.printStackTrace();
        }
        return new ApiResponseBody().failure();
    }


    private static ApiResponseBody createResponseBody(Response response) throws Exception {
        if(response == null || response.body() == null ){
            throw new IOException("received response from server has null body(call to Hapi)");
        }

        if(!response.isSuccessful()){
            throw new IOException("server response code is not ok, response code: " + response.code() + "\n (call to Hapi)\n");
        }

        String body = response.body().string();
        if(StringUtil.isNullOrEmpty(body)){
            throw new IOException("received body is empty (call to Hapi)");
        }

        String decryptedBody = new Encryption().decrypt(body);

        ApiResponseBody result = new ObjectMapper().readValue(decryptedBody, ApiResponseBody.class);
        showResponseLog(result);

        return result;
    }


    private static RequestBody createRequestBody(ApiRequestBody requestBody) throws JsonProcessingException, NoSuchAlgorithmException {
        return RequestBody.create(
                        MEDIA_TYPE,
                        new Encryption().encrypt(new ObjectMapper().writeValueAsString(requestBody))
                );

    }

    private static void showRequestLog(ApiRequestBody requestBody) throws JsonProcessingException {
        if(DEBUG_MODE) {
            System.out.println(TAG +  "\trun: " + "send request: " + (new ObjectMapper()).writeValueAsString(requestBody));
        }
    }

    private static void showResponseLog(ApiResponseBody responseBody) throws JsonProcessingException {
        if(DEBUG_MODE) {
           System.out.println(TAG +  "\trun: " + "received response: " + (new ObjectMapper()).writeValueAsString(responseBody));
        }
    }




}