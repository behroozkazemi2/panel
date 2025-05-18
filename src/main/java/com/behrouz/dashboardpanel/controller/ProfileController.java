package com.behrouz.dashboardpanel.controller;

import com.behrouz.dashboardpanel.rest.request.ProfileInformationRequest;
import com.behrouz.dashboardpanel.okhttp.model.request.ProviderSearchRequest;
import com.behrouz.dashboardpanel.rest.AjaxResponse;
import com.behrouz.dashboardpanel.security.model.OperatorSessionDetail;
import com.behrouz.dashboardpanel.security.model.SessionHolder;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.multipart.MultipartFile;

import javax.servlet.http.HttpServletRequest;

/**
 * Created by: Hapi
 * 12 September 2020
 **/
@Controller
@RequestMapping(value = "/admin/profile")
public class ProfileController {

    @RequestMapping(value = {"/", ""})
    public String myInformation(Model model, HttpServletRequest request) {
        OperatorSessionDetail detail = SessionHolder.getOperatorSessionDetail();
        if (detail != null) {
            model.addAttribute("operator", new ProfileInformationRequest(detail));
        }else {
            model.addAttribute("operator", new ProfileInformationRequest());
        }
        model.addAttribute("view", "/view/myInformation/myInformation.html");
        return "index.html";
    }


    @PreAuthorize("@KrecSecurityComponent.isRoleEdit('operator')" )
    @RequestMapping(value = "/information/save")
    public ResponseEntity saveOperator(@ModelAttribute(name = "operator") ProviderSearchRequest operatorRequest,
                                       @RequestParam(name = "avatarFile", required = false) MultipartFile avatarFile,
                                       HttpServletRequest request){

        AjaxResponse responseAjax;

        try {

//            OperatorEntity operator = operatorComponent.save(
//                    operatorRequest.getFirstName(),
//                    operatorRequest.getLastName(),
//                    operatorRequest.getEmail(),
//                    operatorRequest.getNationalCode(),
//                    operatorRequest.getMobile(),
//                    operatorRequest.getActiveDirectoryUser(),
//                    operatorRequest.getPassword(),
//                    operatorRequest.getUnitId(),
//                    operatorRequest.getGender(),
//                    avatarFile,
//                    operatorRequest.getUserId(),
//                    operatorRequest.getAvatarId(),
//                    operatorRequest.getRoles(),
//                    operatorRequest.isSuperAdmin()
//            );

//            RabbitLog.webActivity(
//                    request,
//                    String.format( "ذخیره/ویرایش اپراتور: %s", operator.getUsername()),
//                    RabbitLog.SAVE_OR_EDIT
//            );

            responseAjax =
                    new AjaxResponse(true, "ثبت با موفقیت انجام شد.");
        } catch ( Exception e ){
            responseAjax =
                    new AjaxResponse(false, e.getMessage());
        }


        return new ResponseEntity<>(responseAjax, HttpStatus.OK);
    }




}
