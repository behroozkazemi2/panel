package com.behrouz.dashboardpanel.controller;

import com.behrouz.dashboardpanel.component.ProviderProductComponent;
import com.behrouz.dashboardpanel.exception.KrecException;
import com.behrouz.dashboardpanel.okhttp.OkHttpHelper;
import com.behrouz.dashboardpanel.okhttp.model.response.IdName;
import com.behrouz.dashboardpanel.okhttp.model.response.ListResponse;
import com.behrouz.dashboardpanel.okhttp.model.response.ProductProviderDigestResponse;
import com.behrouz.dashboardpanel.okhttp.model.response.PromoteDigestResponse;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.behrouz.dashboardpanel.okhttp.api.ApiResponseBody;
import com.behrouz.dashboardpanel.okhttp.model.request.IdRequest;
import com.behrouz.dashboardpanel.okhttp.model.request.PromoteSaveRequest;
import com.behrouz.dashboardpanel.okhttp.model.request.ProviderSearchRequest;
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
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.server.ResponseStatusException;


@Controller
@RequestMapping(value = "/admin/promoteProduct")
public class PromoteProductController {

    @Autowired
    private ProviderProductComponent providerProductComponent;

    @RequestMapping(value = {"/add", "/edit/{id}"})
    public String promoteProduct(
            Model model,
            @PathVariable(name = "id", required = false) Integer edtId) {
        PromoteDigestResponse promoteProduct = new PromoteDigestResponse();

        String products = "";
        if (edtId != null && edtId != 0) {

            IdName request = new IdName(edtId);
            ApiResponseBody<PromoteDigestResponse> response = OkHttpHelper.promoteDetail(new IdRequest(edtId));

            if (!response.successful() || response.getData() == null) {
                throw new ResponseStatusException(HttpStatus.NOT_FOUND);
            }
            promoteProduct = response.getData();
            try {
                products = new ObjectMapper().writeValueAsString(response.getData().getProductProviderIds());
            } catch (JsonProcessingException e) {
                e.printStackTrace();
            }

        }


        model.addAttribute("promoteProduct", promoteProduct);
        model.addAttribute("products", products);
        model.addAttribute("view", "/view/promoteProduct/addPromoteProduct.html");
        return "index.html";
    }



    @RequestMapping(value = {"/allProductProvider"})
    public ResponseEntity<AjaxResponse> productProvider(Model model,
                                                        @RequestParam(name = "search", required = false) String search
                                                        ) {
        ProviderSearchRequest request =
                new ProviderSearchRequest(
                        0,
                        0,
                        search
                );
        ApiResponseBody<ListResponse<ProductProviderDigestResponse>> response = OkHttpHelper.productProviderList(request);
            return new ResponseEntity<>(new AjaxResponse(true, response.getData()), HttpStatus.OK);
    }

    @RequestMapping(value = {"/save"})
    public ResponseEntity<AjaxResponse> promoteProductAdd(
            @ModelAttribute(name = "product") PromoteSaveRequest request
    ) {
        AjaxResponse ajaxResponse;

        try {
            providerProductComponent.savePromoteProduct(request);
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
    public ResponseEntity promoteProductDelete(
            @PathVariable(name = "deleteId", required = false) Integer deleteId
    ){
        AjaxResponse ajaxResponse;

        IdRequest request = new IdRequest(deleteId);

        ApiResponseBody<Void> response =
                OkHttpHelper.promoteProductDelete(request);
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

}
