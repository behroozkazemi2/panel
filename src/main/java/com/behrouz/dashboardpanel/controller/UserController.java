package com.behrouz.dashboardpanel.controller;

import com.behrouz.dashboardpanel.okhttp.model.request.ProviderRequest;
import com.behrouz.dashboardpanel.okhttp.model.response.IdName;
import com.behrouz.dashboardpanel.okhttp.model.response.UserResponse;
import com.behrouz.dashboardpanel.rest.AjaxResponse;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.multipart.MultipartFile;


@Controller
@RequestMapping(value = "/admin/user")
public class UserController {

    @RequestMapping(value = {"/add", "/edit/{id}"})
    public String prodcut(
            Model model,
            @PathVariable(name = "id", required = false) Integer edtId) {

        UserResponse user = new UserResponse();

        if (edtId != null && edtId != 0) {
            IdName request = new IdName(edtId);
//            ApiResponseBody<UserResponse> response = OkHttpHelper.productDetail(request);
//
//            if (!response.successful() || response.getData() == null) {
//                throw new ResponseStatusException(HttpStatus.NOT_FOUND);
//            }
//            user = response.getData();

        }

        model.addAttribute("productDetail", user);
        model.addAttribute("view", "/view/user/addUser.html");
        return "index.html";
    }

    @RequestMapping(value = {"/save"})
    public ResponseEntity<AjaxResponse> providerAdd(
            @ModelAttribute(name = "user") ProviderRequest request,
            @RequestParam(name = "avatarFile", required = false) MultipartFile avatarFile) {

        AjaxResponse ajaxResponse;

        ajaxResponse = new AjaxResponse(
                false,
                "عدم وجود سروریس"
        );

        return ResponseEntity.ok(ajaxResponse);
    }


}
