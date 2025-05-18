package com.behrouz.dashboardpanel.controller;





import com.behrouz.dashboardpanel.okhttp.OkHttpHelper;
import com.behrouz.dashboardpanel.okhttp.model.request.*;
import com.behrouz.dashboardpanel.okhttp.model.response.*;
import com.behrouz.dashboardpanel.option.BillStatusOption;
import com.behrouz.dashboardpanel.okhttp.api.ApiResponseBody;
import com.behrouz.dashboardpanel.okhttp.model.request.*;
import com.behrouz.dashboardpanel.okhttp.model.response.*;
import com.behrouz.dashboardpanel.rest.response.FactorDetailResponse;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.Arrays;
import java.util.HashMap;
import java.util.List;

@RestController
@RequestMapping("/test")
public class TestController {

    //<editor-fold desc="Provider">

    @RequestMapping("/provider/list")
    public ListResponse<ProviderResponse> provider(){

        ProviderSearchRequest request =
                new ProviderSearchRequest(
                        0,
                        10,
                        null
                );

        ApiResponseBody<ListResponse<ProviderResponse>> response =
                OkHttpHelper.providerList(request);


        return response.getData();
    }
    @RequestMapping("/testlist")
    public ListResponse<ProductDigestResponse> test(
            @RequestParam(name = "query[generalSearch]", required = false) String searchString,
            @RequestParam(name = "pagination[page]") int page,
            @RequestParam(name = "pagination[perpage]") int perpage,
            @RequestParam(name = "sort[sort]", required = false) String sort,
            @RequestParam(name = "sort[field]", required = false) String sortField
    ){

        ProviderSearchRequest request =
                new ProviderSearchRequest(
                        page-1,
                        perpage,
                        searchString,
                        0
                );

        ApiResponseBody<ListResponse<ProductDigestResponse>> response =
                OkHttpHelper.productList(request);


        return response.getData();
    }

    @RequestMapping("/provider/all")
    public List<IdName> providerAll(){

        ApiResponseBody<List<IdName>> response =
                OkHttpHelper.providerAll();


        return response.getData();
    }

    @RequestMapping("/provider/add")
    public ProviderResponse providerAdd(){


        List<Integer> categories = Arrays.asList(6);

        int logo = 2;


        ProviderRequest request =
                new ProviderRequest(
                );

        ApiResponseBody<ProviderResponse> response
                = OkHttpHelper.providerAdd(request);


        return response.getData();
    }

    @RequestMapping("/provider/category")
    public List<IdName> providerCategory(){


        IdRequest request = new IdRequest(3);
        ApiResponseBody<List<IdName>> response =
                OkHttpHelper.providerCategory(request);


        return response.getData();
    }

    @RequestMapping("/provider/detail")
    public ProviderResponse providerDetail(){


        IdName request = new IdName(12);

        ApiResponseBody<ProviderResponse> response
                = OkHttpHelper.providerDetail(request);

        return response.getData();
    }

    @RequestMapping("/provider/delete")
    public ProviderResponse providerDelete(){

        IdName request = new IdName(12);

        ApiResponseBody<ProviderResponse> response =
                OkHttpHelper.providerDelete(request);

        return response.getData();
    }

    @RequestMapping("/provider/activeDeactivate")
    public ProviderResponse providerActiveDeactivate(){

        IdActiveRequest request = new IdActiveRequest(12 , true);

        ApiResponseBody<ProviderResponse> response =
                OkHttpHelper.providerActiveDeactivated(request);

        return response.getData();
    }

    //</editor-fold desc="Provider">



    //<editor-fold desc="Product">

    @RequestMapping("/product/list")
    public ListResponse<ProductDigestResponse> product(){

        ProviderSearchRequest request =
                new ProviderSearchRequest(
                        0,
                        10,
                        null,
                        8
                );

        ApiResponseBody<ListResponse<ProductDigestResponse>> response =
                OkHttpHelper.productList(request);


        return response.getData();
    }

    @RequestMapping("/product/detail")
    public ProductResponse productDetail(){

        IdName request = new IdName(614);

        ApiResponseBody<ProductResponse> response =
                OkHttpHelper.productDetail(request);

        return response.getData();
    }

    @RequestMapping("/product/delete")
    public String productDelete(){

        IdRequest request = new IdRequest(614);

        ApiResponseBody<Void> response =
                OkHttpHelper.productDelete(request);

        return response.successful() ? "Success" : "Failed";
    }



    //</editor-fold desc="Product">



    //<editor-fold desc="Special-Product">

    @RequestMapping("/special/list")
    public ListResponse<SpecialOrderDigestResponse> specialProduct(){

        ProviderSearchRequest request =
                new ProviderSearchRequest(
                        0,
                        10,
                        null,
                        0
                );

        ApiResponseBody<ListResponse<SpecialOrderDigestResponse>> response =
                OkHttpHelper.specialList(request);


        return response.getData();
    }



    //</editor-fold desc="Product">

    //<editor-fold desc="Order">

    @RequestMapping("/order/list")
    public List<ProviderOrderDigestResponse> orderList(){

        ProviderSearchRequest request =
                new ProviderSearchRequest(
                        0,
                        10,
                        null,
                        0
                );

        ApiResponseBody<List<ProviderOrderDigestResponse>> response =
                OkHttpHelper.orderList(request);


        return response.getData();
    }


    @RequestMapping("/order/detail")
    public FactorDetailResponse orderDetail(){

        IdRequest request =
                new IdRequest(4);

        ApiResponseBody<FactorDetailResponse> response =
                OkHttpHelper.orderDetail(request);


        return response.getData();
    }



    @RequestMapping("/order/status")
    public ProviderOrderResponse orderStatus(){

        ChangeStatusRequest request =
                new ChangeStatusRequest(10 , BillStatusOption.SENDING.getId());

        ApiResponseBody<ProviderOrderResponse> response =
                OkHttpHelper.orderStatus(request);


        return response.getData();
    }



    //</editor-fold desc="Product">




    //<editor-fold desc="Constant">

    @RequestMapping("/tag")
    public List<TagResponse> tag(){


        // categoryId  = 0  -> all ,
        // categoryId != 0  -> tag of category-id
        int categoryId = 0;

        IdRequest request = new IdRequest(categoryId);
        ApiResponseBody<List<TagResponse>> response = OkHttpHelper.tag(request);


        return response.getData();
    }

    @RequestMapping("/category")
    public List<CategoryRestResponse> category(){


        ApiResponseBody<List<CategoryRestResponse>> response =
                OkHttpHelper.category();


        return response.getData();
    }


    @RequestMapping("/region")
    public List<RegionResponse> region(){


        ApiResponseBody<List<RegionResponse>> response =
                OkHttpHelper.region();


        return response.getData();
    }

    @RequestMapping("/groupCategory")
    public HashMap<Integer, List<IdName>> groupCategory(){


        ApiResponseBody<HashMap<Integer, List<IdName>>> response =
                OkHttpHelper.groupCategory();


        return response.getData();
    }

    @RequestMapping("/groupProvider")
    public HashMap<Integer, HashMap<Integer, List<IdName>>> groupProvider(){


        ApiResponseBody<HashMap<Integer, HashMap<Integer, List<IdName>>>> response = OkHttpHelper.groupProvider();


        return response.getData();
    }





    //</editor-fold desc="Constant">



    @RequestMapping("/image/upload")
    public IdName imageUpload(@RequestParam("file") MultipartFile file){

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

}

