package com.behrouz.dashboardpanel.util.Thymeleaf;

import org.apache.tomcat.util.codec.binary.Base64;

/**
 * Created by Hapi
 * 09 September 2018 13:18
 **/
public interface ThymeleafBase64Model {

    default String base64Convert(byte[] image){
        return Base64.encodeBase64String(image);
    }
}
