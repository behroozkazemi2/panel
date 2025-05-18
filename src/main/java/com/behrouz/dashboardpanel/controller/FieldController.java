package com.behrouz.dashboardpanel.controller;


import com.behrouz.dashboardpanel.okhttp.OkHttpHelper;
import com.behrouz.dashboardpanel.okhttp.api.ApiResponseBody;
import com.behrouz.dashboardpanel.okhttp.model.request.IdRequest;
import com.behrouz.dashboardpanel.okhttp.model.request.TagAddRequest;
import com.behrouz.dashboardpanel.okhttp.model.response.IdName;
import com.behrouz.dashboardpanel.rest.AjaxResponse;
import com.behrouz.dashboardpanel.rest.request.CategorySaveRestRequest;
import com.behrouz.dashboardpanel.rest.response.CategorySaveRestResponse;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;

@Controller
@RequestMapping(value = "/admin")

public class FieldController {


    @RequestMapping(value = {"/brand/add", "/brand/edit/{id}/{name}"})
    public String brand(
            @PathVariable(name = "id",required = false) Long id,
            @PathVariable(name = "name",required = false) String name,
            Model model) {
        model.addAttribute("id", id == null ? 0 : id);
        model.addAttribute("name", name);
        model.addAttribute("view", "/view/brand/addBrand.html");
        return "index.html";
    }

    @RequestMapping(value = {"/brand/save"})
    public ResponseEntity<AjaxResponse> saveBrand(
            @ModelAttribute(name = "brand") IdName request
    ) {

        AjaxResponse ajaxResponse;
        ApiResponseBody<Void> addBrand = OkHttpHelper.brandAdd(request);

        if (addBrand.successful()) {
            ajaxResponse = new AjaxResponse(
                    true,
                    addBrand.getData()
            );
        } else {
            ajaxResponse = new AjaxResponse(
                    false,
                    addBrand.getMessage()
            );
        }

        return ResponseEntity.ok(ajaxResponse);
    }

    @RequestMapping(value = {"/brand/delete/{id}"})
    public ResponseEntity<AjaxResponse> deleteBrand(
            @PathVariable(name = "id") long id
    ) {

        AjaxResponse ajaxResponse;
        ApiResponseBody<Void> deleteBrand = OkHttpHelper.deleteBrand(new IdRequest((int) id));

        if (deleteBrand.successful()) {
            ajaxResponse = new AjaxResponse(
                    true,
                    deleteBrand.getData()
            );
        } else {
            ajaxResponse = new AjaxResponse(
                    false,
                    deleteBrand.getMessage()
            );
        }

        return ResponseEntity.ok(ajaxResponse);
    }

    @RequestMapping(value = {"category/add/{id}"})
    public String category(
            @PathVariable(name = "id" ) long id,

            Model model) {
        ApiResponseBody<CategorySaveRestResponse> categoryDetail =
                OkHttpHelper.categoryDetail(new IdRequest((int) id));
//        if (categoryDetail.successful()) {
//
//        } else {
//        }

        model.addAttribute("category", categoryDetail.getData());
        model.addAttribute("view", "/view/category/addCategory.html");
        return "index.html";
    }

    @RequestMapping(value = {"category/save"})
    public ResponseEntity<AjaxResponse> categorySave(
            @ModelAttribute(name = "category") CategorySaveRestRequest request
    ) {

        AjaxResponse ajaxResponse;
        ApiResponseBody<Void> addCategory = OkHttpHelper.categoryAdd(request);

        if (addCategory.successful()) {
            ajaxResponse = new AjaxResponse(
                    true,
                    addCategory.getData()
            );
        } else {
            ajaxResponse = new AjaxResponse(
                    false,
                    addCategory.getMessage()
            );
        }

        return ResponseEntity.ok(ajaxResponse);
    }

    @RequestMapping(value = {"category/delete/{id}"})
    public ResponseEntity<AjaxResponse> categoryDelete(
            @PathVariable(name = "id") long id
    ) {

        AjaxResponse ajaxResponse;
        ApiResponseBody<Void> addCategory = OkHttpHelper.categoryDelete(new IdRequest((int) id));
        if (addCategory.successful()) {
            ajaxResponse = new AjaxResponse(
                    true,
                    addCategory.getData()
            );
        } else {
            ajaxResponse = new AjaxResponse(
                    false,
                    addCategory.getMessage()
            );
        }

        return ResponseEntity.ok(ajaxResponse);
    }


    @RequestMapping(value = {"region/addRegion"})
    public String region(
            Model model,
            @RequestParam(name = "cc", defaultValue = "0") int cc
    ) {
//            model.addAttribute("category", new IdName());
        model.addAttribute("createC", cc);
        model.addAttribute("view", "/view/region/addRegion.html");
        return "index.html";
    }

//    @RequestMapping(value = {"region/save"})
//    public ResponseEntity<AjaxResponse> regionSave() {
//
//        AjaxResponse ajaxResponse;
//        ApiResponseBody<Void> addCategory = OkHttpHelper.categoryAdd();
//        if (addCategory.successful()) {
//            ajaxResponse = new AjaxResponse(
//                    true,
//                    "با موفقیت ثبت شد "
//            );
//        }else {
//            ajaxResponse = new AjaxResponse(
//                    false,
//                    " خطا  "
//            );
//        }
//
//        return ResponseEntity.ok(ajaxResponse);
//    }


    @RequestMapping(value = {"tag/add" ,"tag/edit/{tagId}/{name}"})
    public String tag(
            Model model,
    @PathVariable(name = "tagId",required = false) Integer tagId,
    @PathVariable(name = "name",required = false) String name
    ) {
        if (tagId ==null){
            model.addAttribute("tagId", 0);
            model.addAttribute("name", "");
            model.addAttribute("view", "/view/tag/addTag.html");
        }else {
            model.addAttribute("tagId", tagId);
            model.addAttribute("name", name);
            model.addAttribute("view", "/view/tag/addTag.html");
        }

        return "index.html";
    }

    @RequestMapping(value = {"tag/save"})
    public ResponseEntity<AjaxResponse> tagSave(
            @ModelAttribute(name = "tag") TagAddRequest req
    ) {

        AjaxResponse ajaxResponse;
        ApiResponseBody<IdName> addTag = OkHttpHelper.tagAdd(req);
        if (addTag.successful()) {
            ajaxResponse = new AjaxResponse(
                    true,
                    addTag.getData()
            );
        } else {
            ajaxResponse = new AjaxResponse(
                    false,
                    addTag.getMessage()
            );
        }

        return ResponseEntity.ok(ajaxResponse);
    }

    @RequestMapping(value = {"tag/delete"})
    public ResponseEntity<AjaxResponse> tagDelete(
            @ModelAttribute(name = "id") int id
    ) {
        AjaxResponse ajaxResponse;
        IdRequest req = new IdRequest(id);
        ApiResponseBody<IdName> addTag = OkHttpHelper.tagDelete(req);
        if (addTag.successful()) {
            ajaxResponse = new AjaxResponse(
                    true,
                    addTag.getData()
            );
        } else {
            ajaxResponse = new AjaxResponse(
                    false,
                    addTag.getMessage()
            );
        }

        return ResponseEntity.ok(ajaxResponse);
    }
}



