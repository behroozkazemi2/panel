package com.behrouz.dashboardpanel.okhttp.base;

import com.behrouz.dashboardpanel.okhttp.model.response.*;
import com.behrouz.dashboardpanel.rest.response.*;
import com.behrouz.dashboardpanel.rest.response.*;
import com.fasterxml.jackson.databind.JavaType;
import com.fasterxml.jackson.databind.type.TypeFactory;
import com.behrouz.dashboardpanel.okhttp.model.UnitListDigestResponse;
import com.behrouz.dashboardpanel.okhttp.model.request.BannerRestRequest;
import com.behrouz.dashboardpanel.okhttp.model.request.ImageRequest;
import com.behrouz.dashboardpanel.okhttp.model.response.*;

import java.util.HashMap;
import java.util.List;

/**
 * created by Hapi.
 */

public enum XimaEndPoint {

//    TypeFactory.defaultInstance().constructCollectionType(List.class, IdName.class)


    //<editor-fold desc="Authentication">

    LOGIN( "app.provider.auth.login", ProviderLoginResponse.class ) ,


    //<editor-fold desc="Provider">
    IMAGE_UPLOAD( "app.image.upload",  IdName.class) ,
    IMAGE_GET( "app.provider.image.get", ImageRequest.class) ,

    // </editor-fold >


    //<editor-fold desc="Provider">
    PROVIDER_LIST(               "app.provider.provider.list"    ,    ListResponse.class) ,
    PROVIDER_ADD(                "app.provider.provider.add"     ,    ProviderResponse.class) ,
    PROVIDER_EDIT(                "app.provider.provider.edit"   ,    ProviderResponse.class) ,
    PROVIDER_DETAIL(             "app.provider.provider.detail"  ,    ProviderResponse.class) ,
    PROVIDER_CATEGORY(           "app.provider.provider.category",    TypeFactory.defaultInstance().constructCollectionLikeType(List.class, IdName.class)) ,
    PROVIDER_DELETE(             "app.provider.provider.delete") ,
    PROVIDER_ACTIVE_DEACTIVATED( "app.provider.provider.status") ,
    PROVIDER_ALL( "app.provider.provider.all", TypeFactory.defaultInstance().constructCollectionLikeType(List.class , IdName.class)) ,
    PRODUCT_ALL( "app.provider.product.all", TypeFactory.defaultInstance().constructCollectionLikeType(List.class , IdName.class)) ,

    // </editor-fold >
    // </editor-fold >



    // <editor-fold desc="Product">
    ORDER_LIST(               "app.provider.order.list"    ,    TypeFactory.defaultInstance().constructCollectionType(List.class, ProviderOrderDigestResponse.class)) ,
    ORDER_DETAIL(               "app.provider.order.detail"    ,    FactorDetailResponse.class) ,
//    ORDER_DETAIL(               "app.customer.factor.detail"    ,    FactorDetailResponse.class) ,
    ORDER_STATUS(               "app.provider.order.status"    ) ,
    ORDER_DATA(               "app.provider.order.data"  , OrderDataResponse.class  ) ,

    // </editor-fold >

    // <editor-fold desc="Product">
    PRODUCT_LIST(               "app.provider.product.list"    ,    ListResponse.class) ,
    BEST_SELLS_PRODUCT_LIST(               "app.provider.best.sell.product.list"    ,    ListResponse.class) ,

    ORDER_CHART(               "app.provider.order.chart"    ,   TypeFactory.defaultInstance().constructCollectionType(List.class, OrderChartRestResponse.class) ) ,
    CATEGORY_ORDER_CHART(               "app.provider.order.category.chart"    ,   TypeFactory.defaultInstance().constructCollectionType(List.class, OrderChartRestResponse.class) ) ,
    PRODUCT_DETAIL(               "app.provider.product.detail"    ,   ProductResponse.class) ,
    PRODUCT_ADD_OR_EDIT(               "app.provider.product.add"    ,  IdName.class  ) ,
    PRODUCT_DELETE(               "app.provider.product.delete"    ,  Void.class  ) ,

    INFORMATION_CATEGORY_LIST(               "app.provider.information.category.list"    ,    ListResponse.class) ,

    PRODUCT_INFORMATION_CATEGORY_LIST(               "app.provider.product.information.category.list"    ,    ListResponse.class) ,

    // TODO_FIX
    SAVE_PRODUCT_INFORMATION_CATEGORY(               "app.provider.save.product.information.category", Void.class   ) ,
    DELETE_PRODUCT_INFORMATION_CATEGORY(               "app.provider.delete.product.information.category", Void.class   ) ,
    PRODUCT_INFORMATION_CATEGORY_DETAIL(               "app.provider.detail.product.information.category", InformationRestResponse.class   ) ,

    // </editor-fold >


    BANNER_LIST(               "app.banner.list" , TypeFactory.defaultInstance().constructCollectionType(List.class, IdName.class)) ,
    BANNER_DETAIL(               "app.banner.detail" , BannerRestRequest.class) ,
    BANNER_ADD_OR_EDIT(               "app.banner.add"    ,  IdName.class  ) ,


//    // <editor-fold desc="ProductProvider">
    PRODUCT_PROVIDER_LIST(               "app.provider.product.provider.list"    ,    ListResponse.class) ,
    PRODUCT_PROVIDER_DETAIL(               "app.provider.product.provider.detail"    ,   ProviderProductResponse.class) ,
    PRODUCT_PROVIDER_ADD_OR_EDIT(               "app.provider.product.provider.add"    ,  IdName.class  ) ,
    PRODUCT_PROVIDER_EXIST(               "app.provider.product.provider.exist"    ,  Void.class  ) ,
    PRODUCT_PROVIDER_DELETE(               "app.provider.product.provider.delete"    ,  Void.class  ) ,

//

//    // <editor-fold desc="promoteProduct">
    PROMOTE_PRODUCT_LIST(               "app.provider.promote.product.list"    ,    ListResponse.class) ,
    PROMOTE_DETAIL(                     "app.provider.promote.detail"    ,   PromoteDigestResponse.class) ,
    PROMOTE_PRODUCT_ADD_OR_EDIT(               "app.provider.promote.product.add"    ,  IdName.class  ) ,
    PROMOTE_PRODUCT_DELETE(               "app.provider.promote.product.delete"    ,  Void.class  ) ,


//
//    // </editor-fold >



    // <editor-fold desc="Special-Product">
    SPECIAL_LIST(               "app.provider.special.list"    ,    ListResponse.class) ,
    SPECIAL_DETAIL(               "app.provider.special.detail"    ,    SpecialProductDetailResponse.class) ,
    SPECIAL_ADD_SUGGESTION(               "app.provider.special.suggestion.add") ,

    // </editor-fold >



    // <editor-fold desc="Product Feature">

    // </editor-fold >

    // <editor-fold desc="Brands">
    ALL_BRANDS(               "app.provider.brand.list"    ,    TypeFactory.defaultInstance().constructCollectionType(List.class, IdName.class)) ,
    BRAND_ADD( "app.provider.constant.brand.add") ,
    DELETE_BRAND( "app.provider.constant.brand.delete") ,

    // </editor-fold >


    //<editor-fold desc="Constant">
    CATEGORY( "app.provider.constant.category",  TypeFactory.defaultInstance().constructCollectionType(List.class, CategoryRestResponse.class)) ,
    CATEGORY_DETAIL( "app.provider.constant.category.detail",  CategorySaveRestResponse.class) ,
    CATEGORY_ADD( "app.provider.constant.category.add") ,
    CATEGORY_DELETE( "app.provider.constant.category.delete") ,
    REGION  ( "app.universal.constant.region",  TypeFactory.defaultInstance().constructCollectionType(List.class, RegionResponse.class)) ,
    GROUP_CATEGORY  ( "app.universal.constant.gCategory",  TypeFactory.defaultInstance().constructMapLikeType(HashMap.class, TypeFactory.defaultInstance().constructType(Integer.class), TypeFactory.defaultInstance().constructCollectionLikeType(List.class , IdName.class))) ,
    GROUP_PROVIDER  ( "app.universal.constant.gProvider",  TypeFactory.defaultInstance().constructMapLikeType(HashMap.class, TypeFactory.defaultInstance().constructType(Integer.class),  TypeFactory.defaultInstance().constructMapLikeType(HashMap.class, TypeFactory.defaultInstance().constructType(Integer.class) , TypeFactory.defaultInstance().constructCollectionLikeType(List.class , IdName.class)) )) ,

    TAG(      "app.provider.constant.tag",  TypeFactory.defaultInstance().constructCollectionType(List.class, TagResponse.class)) ,
    TAG_ADD(      "app.provider.constant.tag.add") ,
    TAG_DELETE(      "app.provider.constant.tag.delete") ,

    UNIT(      "app.provider.constant.unit",  TypeFactory.defaultInstance().constructCollectionType(List.class, UnitListDigestResponse.class)) ,
    UNIT_ADD(      "app.provider.constant.unit.add") ,
    UNIT_EDIT(      "app.provider.constant.unit.edit") ,
    UNIT_DELETE(      "app.provider.constant.unit.delete") ,



    // </editor-fold >

    //<editor-fold desc="TICKET">
    GET_USER_TICKET( "app.provider.ticket.list" ,  ListResponse.class),
    GET_USER_TICKET_DETAIL( "app.provider.ticket.detail" ,  TicketDetailRestResponse.class),
    GET_USER_TICKET_MESSAGES( "app.provider.ticket.messages" ,  TypeFactory.defaultInstance().constructCollectionType(List.class, TicketMessageRestResponse.class) ),
    ADD_USER_TICKET( "app.provider.ticket.add" , String.class),
    ADD_USER_TICKET_MESSAGE( "app.provider.ticket.add.message" , Void.class),
    CLOSE_USER_TICKET( "app.provider.ticket.close" , Void.class),
    //</editor-fold>

    UNKNOWN( "" ),

    COMMENT_LIST( "app.provider.comment.list" ,ListResponse.class),
    COMMENT_CHANGE_STATUS( "app.provider.comment.changeStatus", Void.class );



    private final String apiAction;


    private final JavaType responseType;


    XimaEndPoint(String API_ACTION, JavaType RESPONSE_CLASS) {
        this.apiAction = API_ACTION;
        this.responseType = RESPONSE_CLASS;
    }

    XimaEndPoint(String API_ACTION) {
        this(API_ACTION , TypeFactory.defaultInstance().constructType(Void.class));
    }


    XimaEndPoint(String API_ACTION, Class RESPONSE_CLASS) {
        this(API_ACTION , TypeFactory.defaultInstance().constructType(RESPONSE_CLASS));
    }




    public String getApiAction() {
        return apiAction;
    }


    public JavaType getResponseType() {
        return responseType;
    }
}
