package com.behrouz.dashboardpanel.controller;

import com.behrouz.dashboardpanel.component.ProviderProductComponent;
import com.behrouz.dashboardpanel.exception.KrecException;
import com.behrouz.dashboardpanel.okhttp.OkHttpHelper;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.type.TypeFactory;
import com.behrouz.dashboardpanel.okhttp.model.request.IdActiveRequest;
import com.behrouz.dashboardpanel.okhttp.api.ApiResponseBody;
import com.behrouz.dashboardpanel.okhttp.model.request.ImageRequest;
import com.behrouz.dashboardpanel.okhttp.model.request.LatLngData;
import com.behrouz.dashboardpanel.okhttp.model.request.ProviderRequest;
import com.behrouz.dashboardpanel.okhttp.model.response.IdName;
import com.behrouz.dashboardpanel.okhttp.model.response.ProviderResponse;
import com.behrouz.dashboardpanel.okhttp.model.response.RegionResponse;
import com.behrouz.dashboardpanel.rest.AjaxResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.server.ResponseStatusException;

import java.io.IOException;
import java.util.HashMap;
import java.util.List;

@Controller
@RequestMapping(value = "/admin/provider")
public class ProviderController {

    @Autowired
    private ProviderProductComponent providerProductComponent;


    @RequestMapping(value = {"/add", "/edit/{id}"})
    public String provider(
            Model model,
            @PathVariable(name = "id", required = false) Integer edtId
    ) {

        ProviderRequest provider = new ProviderRequest();


        if (edtId != null && edtId != 0) {
            ApiResponseBody<ProviderResponse> providerDetail = OkHttpHelper.providerDetail(new IdName(edtId));

            if (!providerDetail.successful()) {
                throw new ResponseStatusException(HttpStatus.NOT_FOUND);
            }
            provider = new ProviderRequest(providerDetail.getData());

        }

        model.addAttribute("provider", provider);
        try {
            model.addAttribute("locationString", new ObjectMapper().writeValueAsString(provider.getLocation()));
        } catch (JsonProcessingException e) {
            e.printStackTrace();
        }
        try {
            model.addAttribute("locationString", new ObjectMapper().writeValueAsString(provider.getLocation()));
        } catch (JsonProcessingException e) {
            e.printStackTrace();
        }

        model.addAttribute("view", "/view/provider/addProvider.html");
        return "index.html";
    }


    @RequestMapping(value = {"/save"})
    public ResponseEntity<AjaxResponse> providerAdd(
            @ModelAttribute(name = "provider") ProviderRequest request,
            @RequestParam(name = "avatarFile", required = false) MultipartFile avatarFile) {

        AjaxResponse ajaxResponse;

        try {
            request.setLocation(
                    new ObjectMapper().readValue(request.getLocationString(), TypeFactory.defaultInstance().constructCollectionType(List.class, LatLngData.class))
            );
        } catch (JsonProcessingException e) {
            e.printStackTrace();
        }
        try {
            providerProductComponent.saveProvider(request, avatarFile);
        } catch (KrecException e) {
            return ResponseEntity.ok(new AjaxResponse(
                    false,
                    e.getDescription()
            ));
        }
        ajaxResponse = new AjaxResponse(
                true,
                "با موفقیت ثبت شد "
        );

        return ResponseEntity.ok(ajaxResponse);
    }

    @RequestMapping("/image/upload")
    public IdName imageUpload(
            @RequestParam("file") MultipartFile file) {
        try {
            ImageRequest request = new ImageRequest(file.getBytes());

            ApiResponseBody<IdName> response =
                    OkHttpHelper.imageUpload(request);

            return response.getData();

        } catch (IOException e) {
            e.printStackTrace();
        }

        return null;
    }



    @RequestMapping("/filter")
    public ResponseEntity<AjaxResponse> getSpecialFilter() {

        SpecialFilterResponse response = new SpecialFilterResponse();
        ApiResponseBody<List<RegionResponse>> regionsReq = OkHttpHelper.region();
        ApiResponseBody<HashMap<Integer, List<IdName>>> categoriesReq = OkHttpHelper.groupCategory();
        ApiResponseBody<HashMap<Integer, HashMap<Integer, List<IdName>>>> providersReq = OkHttpHelper.groupProvider();
        if (!regionsReq.successful() || !categoriesReq.successful() || !providersReq.successful()) {

            return new ResponseEntity(response, HttpStatus.BAD_REQUEST);
        }

        response.setCategories(categoriesReq.getData());
        response.setRegions(regionsReq.getData());
        response.setProviders(providersReq.getData());

        return new ResponseEntity(response, HttpStatus.OK);
    }

    @RequestMapping("/delete")
    public ResponseEntity<AjaxResponse> providerDelete(
            @RequestParam(value = "id") int id
    ) {

        AjaxResponse ajaxResponse;

        IdName request = new IdName(id);

        ApiResponseBody<ProviderResponse> response =
                OkHttpHelper.providerDelete(request);

        if (!response.successful()) {
            ajaxResponse = new AjaxResponse(
                    false,
                    response.getMessage()
            );
        } else {
            ajaxResponse = new AjaxResponse(
                    true,
                    response.getData());
        }

        return ResponseEntity.ok(ajaxResponse);
    }

    @RequestMapping("/activeDeactivate//{id}/{state}")
    public ResponseEntity<AjaxResponse> providerActiveDeactivate(
            @PathVariable(name = "id") int id,
            @PathVariable(name = "state") boolean state) {

        AjaxResponse ajaxResponse;
        IdActiveRequest request = new IdActiveRequest(id, state);

        ApiResponseBody<ProviderResponse> response =
                OkHttpHelper.providerActiveDeactivated(request);

        if (!response.successful()) {
            ajaxResponse = new AjaxResponse(
                    false,
                    response.getMessage()
            );
        } else {
            ajaxResponse = new AjaxResponse(
                    true,
                    response.getData());
        }

        return ResponseEntity.ok(ajaxResponse);

    }


}

