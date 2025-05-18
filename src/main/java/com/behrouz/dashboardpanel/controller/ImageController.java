package com.behrouz.dashboardpanel.controller;


import com.behrouz.dashboardpanel.okhttp.OkHttpHelper;
import com.behrouz.dashboardpanel.okhttp.api.ApiResponseBody;
import com.behrouz.dashboardpanel.okhttp.model.request.ImageRequest;
import com.behrouz.dashboardpanel.okhttp.model.request.ImageTypeRequest;
import org.springframework.http.CacheControl;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.client.HttpServerErrorException;
import org.springframework.web.server.ResponseStatusException;

import javax.servlet.http.HttpServletResponse;
import java.util.concurrent.TimeUnit;
import java.util.logging.Logger;

/**
 * Created by: Hapi
 * Company: Hapi
 * 03 January 2019
 **/


@RestController
@RequestMapping(value = "/thumbnail")
public class ImageController {

    @RequestMapping(
            value = "/files/{type}/{id}",
            method = RequestMethod.GET
    )
    public ResponseEntity images (@PathVariable(name = "type") String type,
                        @PathVariable("id") int id,
                        HttpServletResponse servletResponse){

        if(!"original".equalsIgnoreCase(type) && !"thumbnail".equalsIgnoreCase(type)){
            type = "thumbnail";
        }

        ApiResponseBody<ImageRequest> response = id == 0 ? null :
                OkHttpHelper.imageGet(
                        new ImageTypeRequest(
                                id,
                                "original".equalsIgnoreCase(type) ? 4 : 0
                        )
                );


        if(response == null || !response.successful()){
            throw new ResponseStatusException(
                    HttpStatus.NOT_FOUND,
                    "عکس پیدا نشد."
            );
        }

        try {
            return ResponseEntity.ok()
                    .cacheControl(CacheControl.maxAge(60, TimeUnit.SECONDS))
                    .contentType(MediaType.parseMediaType("image/jpg"))
                    .body(response.getData().getImage());
        } catch (Exception e) {
            Logger.getLogger("ImageController" ).warning("Image Error for Token: " + id);
        }

        throw new HttpServerErrorException(HttpStatus.NOT_FOUND);




    }

}