package com.behrouz.dashboardpanel.controller;

import com.behrouz.dashboardpanel.component.ProviderProductComponent;
import com.behrouz.dashboardpanel.exception.KrecException;
import com.behrouz.dashboardpanel.okhttp.OkHttpHelper;
import com.behrouz.dashboardpanel.okhttp.model.request.IdRequest;
import com.behrouz.dashboardpanel.okhttp.model.request.ImageRequest;
import com.behrouz.dashboardpanel.okhttp.model.request.ProductInfoCategoryRestRequest;
import com.behrouz.dashboardpanel.okhttp.model.request.ProductRestRequest;
import com.behrouz.dashboardpanel.okhttp.model.response.IdName;
import com.behrouz.dashboardpanel.okhttp.model.response.InformationRestResponse;
import com.behrouz.dashboardpanel.okhttp.model.response.ProductResponse;
import com.behrouz.dashboardpanel.okhttp.model.response.TagResponse;
import com.behrouz.dashboardpanel.util.ImageUtilBase64;
import com.behrouz.dashboardpanel.util.StringUtil;
import com.behrouz.dashboardpanel.okhttp.api.ApiResponseBody;
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
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.server.ResponseStatusException;
import org.springframework.web.servlet.ModelAndView;

import java.util.ArrayList;
import java.util.List;


@Controller
@RequestMapping(value = "/admin/product")
public class ProdcutController {

    @Autowired
    private ProviderProductComponent providerProductComponent;


    @RequestMapping(value = {"/add", "/edit/{id}"})
    public String prodcut(
            Model model,
            @PathVariable(name = "id", required = false) Integer edtId) {
        ProductResponse productDetail = new ProductResponse();

        if (edtId != null && edtId != 0) {

            IdName request = new IdName(edtId);
            ApiResponseBody<ProductResponse> response = OkHttpHelper.productDetail(request);


            if (!response.successful() || response.getData() == null) {
                throw new ResponseStatusException(HttpStatus.NOT_FOUND);
            }
            productDetail = response.getData();

        }
        model.addAttribute("productDetail", productDetail);
        model.addAttribute("view", "/view/product/addProduct.html");
        return "index.html";
    }


    @RequestMapping(value = {"/save"})
    public ResponseEntity<AjaxResponse> productAdd(
            @ModelAttribute(name = "product") ProductRestRequest request
    ) {
        AjaxResponse ajaxResponse;
        long id = 0 ;
        try {
            id =
                    providerProductComponent.saveProduct(request);
        } catch (KrecException e) {
            return ResponseEntity.ok(new AjaxResponse(
                    false,
                    e.getDescription()
            ));
        }
        ajaxResponse = new AjaxResponse(
                true,
                id
        );
        return ResponseEntity.ok(ajaxResponse);
    }

    @RequestMapping("/delete/{deleteId}")
    public ResponseEntity productDelete(
            @PathVariable(name = "deleteId", required = false) Integer deleteId
    ){
        AjaxResponse ajaxResponse;

        IdRequest request = new IdRequest(deleteId);

        ApiResponseBody<Void> response =
                OkHttpHelper.productDelete(request);
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

    @RequestMapping(value = {"/getTags/{catId}"})
    public ResponseEntity<AjaxResponse> getTag(
            @PathVariable(name = "catId", required = false) Integer catId) {
        AjaxResponse ajaxResponse;

        IdRequest request = new IdRequest(catId);
        ApiResponseBody<List<TagResponse>> response = OkHttpHelper.tag(request);
        if (!response.successful()) {
            ajaxResponse = new AjaxResponse(false, response.getMessage());
        } else {
            ajaxResponse = new AjaxResponse(true, response.getData());
        }
        return ResponseEntity.ok(ajaxResponse);
    }



    @RequestMapping(value = {"/productInfo/detail/{id}/{productId}/{infoCatId}"})
    public ModelAndView infoProductDetail(
            @PathVariable(name = "id") int id,
            @PathVariable(name = "productId") long productId,
            @PathVariable(name = "infoCatId") long infoCatId
    ) {
        InformationRestResponse productDetail = new InformationRestResponse();
        ApiResponseBody<InformationRestResponse> response =
                OkHttpHelper.productInfoCategoryDetail(new IdRequest(id));
        if (!response.successful() || response.getData() == null) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND);
        }
        productDetail = response.getData();
        productDetail.setProductId(productId);
        productDetail.setInformationCategoryId(infoCatId);

        ModelAndView modelAndView = new ModelAndView();
        modelAndView.addObject("detail", productDetail);
        modelAndView.setViewName("fragment/productInformationCategory::modal");
        return modelAndView;
    }
    @RequestMapping(value = {"/productInfo/save"})
    public ResponseEntity<AjaxResponse> infoProductAdd(
            @ModelAttribute(name = "product") ProductInfoCategoryRestRequest request
    ) {
        AjaxResponse ajaxResponse;

        try {
            providerProductComponent.saveProductInfoCategory(request);
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

    @RequestMapping(value = {"/productInfo/delete/{id}"})
    public ResponseEntity<AjaxResponse> infoProductDelete(
            @PathVariable(name = "id") int id
    ) {
        AjaxResponse ajaxResponse;
        try {
            providerProductComponent.deleteProductInfoCategory(new IdRequest(id));
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
