package com.behrouz.dashboardpanel.controller;

import com.behrouz.dashboardpanel.okhttp.OkHttpHelper;
import com.behrouz.dashboardpanel.okhttp.model.request.BannerRestRequest;
import com.behrouz.dashboardpanel.okhttp.model.request.IdRequest;
import com.behrouz.dashboardpanel.okhttp.model.request.ImageRequest;
import com.behrouz.dashboardpanel.util.ImageUtilBase64;
import com.behrouz.dashboardpanel.util.StringUtil;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.type.TypeFactory;
import com.behrouz.dashboardpanel.okhttp.api.ApiResponseBody;
import com.behrouz.dashboardpanel.okhttp.model.request.*;
import com.behrouz.dashboardpanel.okhttp.model.response.IdName;
import com.behrouz.dashboardpanel.rest.AjaxResponse;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;

import java.util.ArrayList;
import java.util.List;


@Controller
@RequestMapping(value = "/admin/banner")
public class BannerController {

    @RequestMapping(value = {"/add/{id}",})
    public String banner(
            Model model,
            @PathVariable(name = "id", required = false) long type) {

        ApiResponseBody<BannerRestRequest> bannerImages =
                OkHttpHelper.bannerGetDetail(new IdRequest((int) type));
        model.addAttribute("banners" , bannerImages.getData());
        model.addAttribute("typeId" , type);
        model.addAttribute("view", "/view/banner/bannerDetail.html");
        return "index.html";
    }



    @RequestMapping(value = {"/save"})
    public ResponseEntity<AjaxResponse> productAdd(
            @RequestParam(name = "stringItem", defaultValue = "") String  rq,
            @RequestParam(name = "type", defaultValue = "-") long  type
    ) {


        AjaxResponse ajaxResponse;

        BannerRestRequest request = new BannerRestRequest(new ArrayList<>(), type);

        try {
            request.setImages(new ObjectMapper().readValue(rq, TypeFactory.defaultInstance().constructCollectionType(List.class, IdName.class)));
        } catch (JsonProcessingException e) {
            e.printStackTrace();
            return ResponseEntity.ok(new AjaxResponse(
                    false,
                    "خطا در برقراری ارتباط با سرور"
            ));
        }

        ApiResponseBody<IdName> response
                = OkHttpHelper.bannerAddOrEdit(request);

        if (!response.successful()) {
            return ResponseEntity.ok(new AjaxResponse(
                    false,
                    "خطا در برقراری ارتباط با سرور"
            ));
        }
        ajaxResponse = new AjaxResponse(
                true,
                "با موفقیت ثبت شد "
        );
        return ResponseEntity.ok(ajaxResponse);
    }


    @RequestMapping("/uploadImage")
    public ResponseEntity imageUpload(
            @RequestParam("myImage") String[] image) {
//            ImageRequest request = new ImageRequest(file.getBytes());
        ArrayList<ImageRequest> list = new ArrayList<>();
        for (String s : image) {
            if (StringUtil.isNullOrEmpty(s)) {
                continue;
            }
            byte[] byteImage = ImageUtilBase64.getByteArrayToByte64(s);
            ImageRequest imageRequest = new ImageRequest(byteImage);

            list.add(imageRequest);
        }
        ArrayList<IdName> req = new ArrayList<>();
        for (ImageRequest s : list) {
            ApiResponseBody<IdName> response = OkHttpHelper.imageUpload(s);
                if (response.successful()) {
                req.add(response.getData());
            }
        }
        return new ResponseEntity(req, HttpStatus.OK);
    }


}
