package com.behrouz.dashboardpanel.component;

import com.behrouz.dashboardpanel.okhttp.OkHttpHelper;
import com.behrouz.dashboardpanel.okhttp.model.UnitListDigestResponse;
import com.behrouz.dashboardpanel.okhttp.model.response.TagResponse;
import com.behrouz.dashboardpanel.okhttp.api.ApiResponseBody;
import com.behrouz.dashboardpanel.okhttp.model.request.IdRequest;
import com.behrouz.dashboardpanel.okhttp.model.response.IdName;
import com.behrouz.dashboardpanel.okhttp.model.response.RegionResponse;
import com.behrouz.dashboardpanel.security.model.SessionHolder;
import org.springframework.context.annotation.Bean;
import org.springframework.stereotype.Component;

import java.util.Arrays;
import java.util.List;

@Component
public class OptionsComponent {


    @Bean(name = "categoryList")
    protected categoryType categoryList() {
        return this::getMyCategory;
    }

    public interface categoryType {
        List<IdName> getMyCategory();
    }

    private List<IdName> getMyCategory() {
        int proId =0;
        if (!SessionHolder.isSuperVisor()){
            proId =  SessionHolder.getOperatorSessionDetail().getProviderId();
        }
        IdRequest request = new IdRequest(proId);
        ApiResponseBody<List<IdName>> response =
                OkHttpHelper.providerCategory(request);

        return response.getData();
    }

    @Bean(name = "provider")
    protected provider providrList() {
        return this::getMyProvider;
    }

    public interface provider {
        List<IdName> getMyProvider();
    }

    private List<IdName> getMyProvider() {
        ApiResponseBody<List<IdName>> response =
                OkHttpHelper.providerAll();

        return response.getData();
    }

    @Bean(name = "product")
    protected product productList() {
        return this::getMyProductList;
    }

    public interface product {
        List<IdName> getMyProductList();
    }

    private List<IdName> getMyProductList() {
        ApiResponseBody<List<IdName>> response =
                OkHttpHelper.productAll();

        return response.getData();
    }


    @Bean(name = "tag")
    protected tagType tagList() {
        return this::getMyTagType;
    }

    public interface tagType {
        List<TagResponse> getMyTagType();
    }

    private List<TagResponse> getMyTagType() {
        int categoryId = 0;
        IdRequest request = new IdRequest(categoryId);
        ApiResponseBody<List<TagResponse>> response =
                OkHttpHelper.tag(request);
        return response.getData();
    }

    @Bean(name = "region")
    protected Regions regionList() {

        return this::getMyRegion;
    }

    public interface Regions {
        List<RegionResponse> getMyRegion();
    }

    private List<RegionResponse> getMyRegion() {


        ApiResponseBody<List<RegionResponse>> response =
                OkHttpHelper.region();
        return response.getData();
    }

    @Bean(name = "unit")
    protected unit unitList() {

        return this::getMyUnit;
    }

    public interface unit {
        List<UnitListDigestResponse> getMyUnit();
    }

    private List<UnitListDigestResponse> getMyUnit() {

        IdRequest req = new IdRequest(0);
        ApiResponseBody<List<UnitListDigestResponse>> response = OkHttpHelper.unit(req);

        return response.getData();
    }

    @Bean(name = "orderStatus")
    protected orderStatus orderStatusList() {

        return this::getOrderStatus;
    }

    public interface orderStatus {
        List<IdName> getOrderStatus();
    }

    private List<IdName> getOrderStatus() {

       List<IdName> list = Arrays.asList(
               new IdName(1,"ثبت شده"),
               new IdName(2,"درحال آماده‌سازی"),
               new IdName(3,"ارسال‌شده"),
               new IdName(4,"تحویل داده شده"),
               new IdName(5,"لغو شده")
       );

        return list;
    }



    @Bean(name = "brand")
    protected brandList brandsList() {
        return this::getMyBrands;
    }

    public interface brandList {
        List<IdName> getMyBrands();
    }

    private List<IdName> getMyBrands() {
        int proId =0;
        if (!SessionHolder.isSuperVisor()){
            proId =  SessionHolder.getOperatorSessionDetail().getProviderId();
        }
        IdRequest request = new IdRequest(proId);
        ApiResponseBody<List<IdName>> brandList = OkHttpHelper.allBrands(request);
        return brandList.getData();
    }




}
