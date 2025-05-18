package com.behrouz.dashboardpanel.controller;

import com.behrouz.dashboardpanel.component.ProviderProductComponent;
import com.behrouz.dashboardpanel.exception.KrecException;
import com.behrouz.dashboardpanel.okhttp.OkHttpHelper;
import com.behrouz.dashboardpanel.okhttp.api.ApiResponseBody;
import com.behrouz.dashboardpanel.okhttp.model.request.IdActiveRequest;
import com.behrouz.dashboardpanel.okhttp.model.request.IdRequest;
import com.behrouz.dashboardpanel.okhttp.model.request.ProviderProductRestRequest;
import com.behrouz.dashboardpanel.okhttp.model.response.IdName;
import com.behrouz.dashboardpanel.okhttp.model.response.ProviderProductResponse;
import com.behrouz.dashboardpanel.okhttp.model.request.*;
import com.behrouz.dashboardpanel.okhttp.model.response.*;
import com.behrouz.dashboardpanel.rest.AjaxResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.server.ResponseStatusException;


@Controller
@RequestMapping(value = "/admin/productProvider")
public class ProductProviderController {

    @Autowired
    private ProviderProductComponent providerProductComponent;

    @RequestMapping(value = {"/add", "/edit/{id}"})
    public String productProvider(
            Model model,
            @PathVariable(name = "id", required = false) Integer edtId) {
        ProviderProductResponse productProviderDetail = new ProviderProductResponse();

        if (edtId != null && edtId != 0) {

            IdName request = new IdName(edtId);
            ApiResponseBody<ProviderProductResponse> response = OkHttpHelper.productProviderDetail(request);


            if (!response.successful() || response.getData() == null) {
                throw new ResponseStatusException(HttpStatus.NOT_FOUND);
            }
            productProviderDetail = response.getData();

        }
        model.addAttribute("productDetail", productProviderDetail);
        model.addAttribute("view", "/view/productProvider/addProductProvider.html");
        return "index.html";
    }


    @RequestMapping(value = {"/save"})
    public ResponseEntity<AjaxResponse> productProviderAdd(
            @ModelAttribute(name = "product") ProviderProductRestRequest request
    ) {
        AjaxResponse ajaxResponse;

        try {
            providerProductComponent.saveProductProvider(request);
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


    @RequestMapping("/delete/{deleteId}")
    public ResponseEntity productProviderDelete(
            @PathVariable(name = "deleteId", required = false) Integer deleteId
    ){
        AjaxResponse ajaxResponse;

        IdRequest request = new IdRequest(deleteId);

        ApiResponseBody<Void> response =
                OkHttpHelper.productProviderDelete(request);
        if (response.successful()) {
            ajaxResponse = new AjaxResponse(
                    true,
                    response.getData()
            );        }
        else {
            ajaxResponse = new AjaxResponse(
                    true,
                    response.getDescription()
            );
        }
        return  ResponseEntity.ok(ajaxResponse);

    }

    @RequestMapping(value = {"/exist/{id}/{active}"})
    public ResponseEntity<AjaxResponse> exist(
            @PathVariable(name = "id") int productId,
            @PathVariable(name = "active") boolean active) {
        AjaxResponse ajaxResponse;

        IdActiveRequest request = new IdActiveRequest(productId, active);
        ApiResponseBody<IdName> response =
                OkHttpHelper.productProviderExistance(request);

        if (!response.successful()) {
            ajaxResponse = new AjaxResponse(false, response.getMessage());
        } else {
            ajaxResponse = new AjaxResponse(true, "موفق");
        }
        return ResponseEntity.ok(ajaxResponse);
    }
}
