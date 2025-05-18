package com.behrouz.dashboardpanel.controller;

import com.behrouz.dashboardpanel.component.SpecialProductComponent;
import com.behrouz.dashboardpanel.exception.KrecException;
import com.behrouz.dashboardpanel.okhttp.OkHttpHelper;
import com.behrouz.dashboardpanel.rest.request.SpecialProductOfferRequest;
import com.behrouz.dashboardpanel.okhttp.api.ApiResponseBody;
import com.behrouz.dashboardpanel.okhttp.model.request.IdRequest;
import com.behrouz.dashboardpanel.rest.AjaxResponse;
import com.behrouz.dashboardpanel.rest.response.SpecialProductDetailResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.servlet.ModelAndView;

/**
 * Created by: Hapi
 * 13 September 2020
 **/

@Controller
@RequestMapping(value = "admin/special/product")

public class SpecialProductController {

    @Autowired
    private SpecialProductComponent specialProductComponent;



    @RequestMapping(value = {"/detail/{id}"})
    @ResponseBody
    public ModelAndView idNameModal(@PathVariable(name = "id", required = false) Integer id) {
        IdRequest request = new IdRequest(id);
        ApiResponseBody<SpecialProductDetailResponse> response = OkHttpHelper.specialDetail(request);
        if (response.successful()){
            long time = response.getData().getInsertDate().getTime();
            ModelAndView modelAndView = new ModelAndView();
            modelAndView.addObject("specialProductSuggestionData", response.getData());
            modelAndView.addObject("time", time);
            modelAndView.setViewName("fragment/specialOrderModalContent::modal");
            return modelAndView;
        }
        return null;

    }


    @RequestMapping(value = {"/save"})
    public ResponseEntity<AjaxResponse> providerSpecialSuggestion(
            @ModelAttribute(name = "specialProductSuggestionData") SpecialProductOfferRequest request
            ) {

        AjaxResponse ajaxResponse;
        try {
            specialProductComponent.saveSpecialProduct(request);
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


}
