package com.behrouz.dashboardpanel.okhttp.model.response;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;

/**
 * Created by: HapiKzm
 * 30 September 2020
 **/
public interface ThymeleafUtil {

    default String writeValueAsString(Object o) {
        try {
            return new ObjectMapper().writeValueAsString(o);
        } catch (JsonProcessingException e) {
            e.printStackTrace();
        }
        return null;
    }

}
