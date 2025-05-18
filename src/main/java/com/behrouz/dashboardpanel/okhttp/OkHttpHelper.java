package com.behrouz.dashboardpanel.okhttp;

import com.behrouz.dashboardpanel.okhttp.model.request.*;
import com.behrouz.dashboardpanel.okhttp.model.response.*;
import com.behrouz.dashboardpanel.rest.request.*;
import com.behrouz.dashboardpanel.rest.response.*;
import com.behrouz.dashboardpanel.rest.request.*;
import com.behrouz.dashboardpanel.rest.response.*;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.behrouz.dashboardpanel.okhttp.api.ApiRequestBody;
import com.behrouz.dashboardpanel.okhttp.api.ApiResponseBody;
import com.behrouz.dashboardpanel.okhttp.base.OkHttpRequest;
import com.behrouz.dashboardpanel.okhttp.base.XimaEndPoint;
import com.behrouz.dashboardpanel.okhttp.model.UnitListDigestResponse;
import com.behrouz.dashboardpanel.okhttp.model.request.*;
import com.behrouz.dashboardpanel.okhttp.model.response.*;
import com.behrouz.dashboardpanel.security.model.SessionHolder;

import java.io.IOException;
import java.util.HashMap;
import java.util.List;

/**
 * created by Hapi.
 */

public class OkHttpHelper {

    // <editor-fold desc="Authentication">

    public static ApiResponseBody<ProviderLoginResponse> login(ProviderLoginRequest loginRequest) {
        ApiRequestBody request = new ApiRequestBody<>( getToken() , loginRequest );
        return postRequest( request , XimaEndPoint.LOGIN );
    }

    // </editor-fold >


    // <editor-fold desc="Provider">

    public static ApiResponseBody<ListResponse<ProviderResponse>> providerList(ProviderSearchRequest loginRequest) {
        ApiRequestBody request = new ApiRequestBody<>( getToken() , loginRequest );
        return postRequest( request , XimaEndPoint.PROVIDER_LIST );
    }

    public static ApiResponseBody<List<IdName>> providerAll() {
        ApiRequestBody request = new ApiRequestBody<>( getToken() );
        return postRequest( request , XimaEndPoint.PROVIDER_ALL );
    }

public static ApiResponseBody<List<IdName>> productAll() {
        ApiRequestBody request = new ApiRequestBody<>( getToken() );
        return postRequest( request , XimaEndPoint.PRODUCT_ALL );
    }

    public static ApiResponseBody<ProviderResponse> providerAdd(ProviderRequest providerRequest) {
        ApiRequestBody request = new ApiRequestBody<>( getToken() , providerRequest );
        return postRequest( request , XimaEndPoint.PROVIDER_ADD );
    }



    public static ApiResponseBody<List<IdName>> providerCategory(IdRequest provider) {
        ApiRequestBody request = new ApiRequestBody<>( getToken() , provider );
        return postRequest( request , XimaEndPoint.PROVIDER_CATEGORY );
    }

    public static ApiResponseBody<ProviderResponse> providerDetail(IdName idName) {
        ApiRequestBody request = new ApiRequestBody<>( getToken() , idName );
        return postRequest( request , XimaEndPoint.PROVIDER_DETAIL );
    }

    public static ApiResponseBody<ProviderResponse> providerDelete(IdName idName) {
        ApiRequestBody request = new ApiRequestBody<>( getToken() , idName );
        return postRequest( request , XimaEndPoint.PROVIDER_DELETE );
    }

    public static ApiResponseBody<ProviderResponse> providerActiveDeactivated(IdActiveRequest idName) {
        ApiRequestBody request = new ApiRequestBody<>( getToken() , idName );
        return postRequest( request , XimaEndPoint.PROVIDER_ACTIVE_DEACTIVATED );
    }

    // </editor-fold >


    // <editor-fold desc="Product">

    public static ApiResponseBody<ListResponse<ProductDigestResponse>> productList(ProviderSearchRequest loginRequest) {
        ApiRequestBody request = new ApiRequestBody<>( getToken() , loginRequest );
        return postRequest( request , XimaEndPoint.PRODUCT_LIST );
    }

    public static ApiResponseBody<ListResponse<ProductDigestResponse>> bestSellsProductList(ProviderSearchRequest loginRequest) {
        ApiRequestBody request = new ApiRequestBody<>( getToken() , loginRequest );
        return postRequest( request , XimaEndPoint.BEST_SELLS_PRODUCT_LIST );
    }

    public static ApiResponseBody<ProductResponse> productDetail(IdName idName) {
        ApiRequestBody request = new ApiRequestBody<>( getToken() , idName );
        return postRequest( request , XimaEndPoint.PRODUCT_DETAIL );
    }

    public static ApiResponseBody<IdName> productAddOrEdit(ProductRestRequest idName) {
        ApiRequestBody request = new ApiRequestBody<>( getToken() , idName );
        return postRequest( request , XimaEndPoint.PRODUCT_ADD_OR_EDIT );
    }


    public static ApiResponseBody<Void> productDelete(IdRequest idRequest) {
        ApiRequestBody request = new ApiRequestBody<>( getToken() , idRequest );
        return postRequest( request , XimaEndPoint.PRODUCT_DELETE );
    }


    public static ApiResponseBody<ListResponse<InformationCategoryRestResponse>> informationCategoryList(ProviderSearchRequest loginRequest) {
        ApiRequestBody request = new ApiRequestBody<>( getToken() , loginRequest );
        return postRequest( request , XimaEndPoint.INFORMATION_CATEGORY_LIST );
    }
    public static ApiResponseBody<ListResponse<InformationRestResponse>> productInformationList(ProductCategoryInfoRequest loginRequest) {
        ApiRequestBody request = new ApiRequestBody<>( getToken() , loginRequest );
        return postRequest( request , XimaEndPoint.PRODUCT_INFORMATION_CATEGORY_LIST );
    }

    public static ApiResponseBody<Void> saveProductInfoCategory(ProductInfoCategoryRestRequest idRequest) {
        ApiRequestBody request = new ApiRequestBody<>( getToken() , idRequest );
        return postRequest( request , XimaEndPoint.SAVE_PRODUCT_INFORMATION_CATEGORY );
    }


    public static ApiResponseBody<Void> deleteProductInfoCategory(IdRequest idRequest) {
        ApiRequestBody request = new ApiRequestBody<>( getToken() , idRequest );
        return postRequest( request , XimaEndPoint.DELETE_PRODUCT_INFORMATION_CATEGORY );
    }


    public static ApiResponseBody<InformationRestResponse> productInfoCategoryDetail(IdRequest idRequest) {
        ApiRequestBody request = new ApiRequestBody<>( getToken() , idRequest );
        return postRequest( request , XimaEndPoint.PRODUCT_INFORMATION_CATEGORY_DETAIL );
    }


    // </editor-fold >

    //    // <editor-fold desc="ProductProvider">

    public static ApiResponseBody<ListResponse<ProductProviderDigestResponse>> productProviderList(ProviderSearchRequest loginRequest) {
        ApiRequestBody request = new ApiRequestBody<>( getToken() , loginRequest );
        return postRequest( request , XimaEndPoint.PRODUCT_PROVIDER_LIST );
    }



    public static ApiResponseBody<IdName> productProviderExistance(IdActiveRequest idName) {
        ApiRequestBody request = new ApiRequestBody<>( getToken() , idName );
        return postRequest( request , XimaEndPoint.PRODUCT_PROVIDER_EXIST );
    }

    public static ApiResponseBody<ProviderProductResponse> productProviderDetail(IdName idName) {
        ApiRequestBody request = new ApiRequestBody<>( getToken() , idName );
        return postRequest( request , XimaEndPoint.PRODUCT_PROVIDER_DETAIL );
    }

    public static ApiResponseBody<IdName> productProviderAddOrEdit(ProviderProductRestRequest idName) {
        ApiRequestBody request = new ApiRequestBody<>( getToken() , idName );
        return postRequest( request , XimaEndPoint.PRODUCT_PROVIDER_ADD_OR_EDIT );
    }
    public static ApiResponseBody<Void> productProviderDelete(IdRequest idRequest) {
        ApiRequestBody request = new ApiRequestBody<>( getToken() , idRequest );
        return postRequest( request , XimaEndPoint.PRODUCT_PROVIDER_DELETE );
    }



    // </editor-fold >

    //    // <editor-fold desc="ProductProvider">



    // </editor-fold >

    //<editor-fold desc=" TICKET">

    public static ApiResponseBody<ListResponse<TicketDetailRestResponse>> getUserTicket(
            TicketListRestRequest search
    ) {
        ApiRequestBody request = new ApiRequestBody<>(getToken(), search);
        return postRequest(request, XimaEndPoint.GET_USER_TICKET);
    }

    public static ApiResponseBody<TicketDetailRestResponse> getUserTicketDetail(
            String trackingCode
    ) {
        ApiRequestBody request = new ApiRequestBody<>(getToken(), trackingCode);
        return postRequest(request, XimaEndPoint.GET_USER_TICKET_DETAIL);
    }


    public static ApiResponseBody<String> saveOrEditTicket(SaveTicketRestRequest rest) {
        ApiRequestBody request = new ApiRequestBody<>(getToken(), rest);
        return postRequest(request, XimaEndPoint.ADD_USER_TICKET);
    }


    public static ApiResponseBody<Void> closeTicket(IdRequest ticketId) {
        ApiRequestBody request = new ApiRequestBody<>(getToken(), ticketId);
        return postRequest(request, XimaEndPoint.CLOSE_USER_TICKET);
    }


    public static ApiResponseBody<List<TicketMessageRestResponse>> getTicketMessages(TicketMessageRequest requestDetail) {
        ApiRequestBody request = new ApiRequestBody<>(getToken(), requestDetail);
        return postRequest(request, XimaEndPoint.GET_USER_TICKET_MESSAGES);
    }


    public static ApiResponseBody<Void> addNewTicketMessage(SaveTicketMessageRestRequest restRequest) {
        ApiRequestBody request = new ApiRequestBody<>(getToken(), restRequest);
        return postRequest(request, XimaEndPoint.ADD_USER_TICKET_MESSAGE);
    }

    //</editor-fold>

    public static ApiResponseBody<ListResponse<PromoteDigestResponse>> promoteProductList(ProviderSearchRequest loginRequest) {
        ApiRequestBody request = new ApiRequestBody<>( getToken() , loginRequest );
        return postRequest( request , XimaEndPoint.PROMOTE_PRODUCT_LIST );
    }

    public static ApiResponseBody<PromoteDigestResponse> promoteDetail(IdRequest idRequest) {
        ApiRequestBody request = new ApiRequestBody<>( getToken() , idRequest );
        return postRequest( request , XimaEndPoint.PROMOTE_DETAIL );
    }

    public static ApiResponseBody<IdName> promoteProductAddOrEdit(PromoteSaveRequest idName) {
        ApiRequestBody request = new ApiRequestBody<>( getToken() , idName );
        return postRequest( request , XimaEndPoint.PROMOTE_PRODUCT_ADD_OR_EDIT );
    }

    public static ApiResponseBody<Void> promoteProductDelete(IdRequest idRequest) {
        ApiRequestBody request = new ApiRequestBody<>( getToken() , idRequest );
        return postRequest( request , XimaEndPoint.PROMOTE_PRODUCT_DELETE );
    }

    // <editor-fold desc="Special-Product">

    public static ApiResponseBody<ListResponse<SpecialOrderDigestResponse>> specialList(ProviderSearchRequest loginRequest) {
        ApiRequestBody request = new ApiRequestBody<>( getToken() , loginRequest );
        return postRequest( request , XimaEndPoint.SPECIAL_LIST );
    }

    public static ApiResponseBody<SpecialProductDetailResponse> specialDetail(IdRequest idRequest) {
        ApiRequestBody request = new ApiRequestBody<>( getToken() , idRequest );
        return postRequest( request , XimaEndPoint.SPECIAL_DETAIL );
    }

  public static ApiResponseBody<Void> specialAddSuggestion(SpecialProductOfferRequest idName) {
        ApiRequestBody request = new ApiRequestBody<>( getToken() , idName );
        return postRequest( request , XimaEndPoint.SPECIAL_ADD_SUGGESTION );
    }

    // </editor-fold >


    // <editor-fold desc="Brand">


    public static ApiResponseBody<List<IdName>> allBrands(IdRequest idRequest) {
        ApiRequestBody request = new ApiRequestBody<>( getToken() , idRequest );
        return postRequest( request , XimaEndPoint.ALL_BRANDS );
    }


    public static ApiResponseBody<Void> brandAdd( IdName idName) {
        ApiRequestBody request = new ApiRequestBody<>( getToken(), idName );
        return postRequest( request , XimaEndPoint.BRAND_ADD );
    }

    public static ApiResponseBody<Void> deleteBrand( IdRequest idRequest) {
        ApiRequestBody request = new ApiRequestBody<>( getToken(), idRequest );
        return postRequest( request , XimaEndPoint.DELETE_BRAND );
    }


    // </editor-fold >

    // <editor-fold desc="Image">

    public static ApiResponseBody<IdName> imageUpload(ImageRequest imageRequest) {
        ApiRequestBody request = new ApiRequestBody<>( getToken() , imageRequest );
        return postRequest( request , XimaEndPoint.IMAGE_UPLOAD );
    }

    public static ApiResponseBody<ImageRequest> imageGet(ImageTypeRequest imageTypeRequest) {
        ApiRequestBody request = new ApiRequestBody<>( getToken() , imageTypeRequest );
        return postRequest( request , XimaEndPoint.IMAGE_GET );
    }


    // </editor-fold >


    // <editor-fold desc="Constant">

    // <editor-fold desc="Tag">

    public static ApiResponseBody<List<TagResponse>> tag(IdRequest idRequest) {
        ApiRequestBody request = new ApiRequestBody<>( getToken() , idRequest );
        return postRequest( request , XimaEndPoint.TAG );
    }

    public static ApiResponseBody<IdName> tagAdd(TagAddRequest idName) {
        ApiRequestBody request = new ApiRequestBody<>( getToken() , idName );
        return postRequest( request , XimaEndPoint.TAG_ADD );
    }

    public static ApiResponseBody<IdName> tagDelete(IdRequest idRequest) {
        ApiRequestBody request = new ApiRequestBody<>( getToken() , idRequest );
        return postRequest( request , XimaEndPoint.TAG_DELETE );
    }

    // </editor-fold >


    // <editor-fold desc="Order">
    public static ApiResponseBody<List<ProviderOrderDigestResponse>> orderList(ProviderSearchRequest searchRequest) {
        ApiRequestBody request = new ApiRequestBody<>( getToken() , searchRequest );
        return postRequest( request , XimaEndPoint.ORDER_LIST );
    }

    public static ApiResponseBody<FactorDetailResponse> orderDetail(IdRequest idRequest) {
        ApiRequestBody request = new ApiRequestBody<>( getToken() , idRequest );
        return postRequest( request , XimaEndPoint.ORDER_DETAIL );
    }

    public static ApiResponseBody<ProviderOrderResponse> orderStatus(ChangeStatusRequest idRequest) {
        ApiRequestBody request = new ApiRequestBody<>( getToken() , idRequest );
        return postRequest( request , XimaEndPoint.ORDER_STATUS );
    }


    // </editor-fold >

    // <editor-fold desc="Tag">

    public static ApiResponseBody<List<UnitListDigestResponse>> unit(IdRequest idRequest) {
        ApiRequestBody request = new ApiRequestBody<>( getToken() , idRequest );
        return postRequest( request , XimaEndPoint.UNIT );
    }

    public static ApiResponseBody<IdName> unitAdd(IdName idName) {
        ApiRequestBody request = new ApiRequestBody<>( getToken() , idName );
        return postRequest( request , XimaEndPoint.UNIT_ADD );
    }

    public static ApiResponseBody<IdName> unitDelete(IdRequest idRequest) {
        ApiRequestBody request = new ApiRequestBody<>( getToken() , idRequest );
        return postRequest( request , XimaEndPoint.TAG_DELETE );
    }

    // </editor-fold >


    public static ApiResponseBody<List<CategoryRestResponse>> category() {
        ApiRequestBody request = new ApiRequestBody<>( getToken() );
        return postRequest( request , XimaEndPoint.CATEGORY );
    }

    public static ApiResponseBody<CategorySaveRestResponse> categoryDetail(IdRequest idRequest) {
        ApiRequestBody request = new ApiRequestBody<>( getToken() , idRequest);
        return postRequest( request , XimaEndPoint.CATEGORY_DETAIL );
    }

    public static ApiResponseBody<Void> categoryAdd( CategorySaveRestRequest idName) {
        ApiRequestBody request = new ApiRequestBody<>( getToken(), idName );
        return postRequest( request , XimaEndPoint.CATEGORY_ADD );
    }
    public static ApiResponseBody<Void> categoryDelete( IdRequest idRequest) {
        ApiRequestBody request = new ApiRequestBody<>( getToken(), idRequest );
        return postRequest( request , XimaEndPoint.CATEGORY_DELETE );
    }


    public static ApiResponseBody<List<RegionResponse>> region() {
        ApiRequestBody request = new ApiRequestBody<>( getToken() );
        return postRequest( request , XimaEndPoint.REGION );
    }


    public static ApiResponseBody<HashMap<Integer, List<IdName>>> groupCategory() {
        ApiRequestBody request = new ApiRequestBody<>( getToken() );
        return postRequest( request , XimaEndPoint.GROUP_CATEGORY);
    }

    public static ApiResponseBody<HashMap<Integer, HashMap<Integer,  List<IdName>>>> groupProvider() {
        ApiRequestBody request = new ApiRequestBody<>( getToken() );
        return postRequest( request , XimaEndPoint.GROUP_PROVIDER);
    }

    // </editor-fold >




    public static ApiResponseBody<List<IdName>> bannerList() {
        ApiRequestBody request = new ApiRequestBody<>( getToken());
        return postRequest( request , XimaEndPoint.BANNER_LIST);
    }

    public static ApiResponseBody<BannerRestRequest> bannerGetDetail(IdRequest idRequest) {
        ApiRequestBody request = new ApiRequestBody<>( getToken(), idRequest);
        return postRequest( request , XimaEndPoint.BANNER_DETAIL);
    }

    public static ApiResponseBody<IdName> bannerAddOrEdit(BannerRestRequest bannerRestRequest) {
        ApiRequestBody request = new ApiRequestBody<>( getToken() , bannerRestRequest );
        return postRequest( request , XimaEndPoint.BANNER_ADD_OR_EDIT );
    }
    public static ApiResponseBody<ListResponse<CommentResponseRequest>> getCommentList(CommentListRequest commentListRequest) {
        ApiRequestBody request = new ApiRequestBody<>(getToken(), commentListRequest);
        return postRequest(request, XimaEndPoint.COMMENT_LIST);
    }
   public static ApiResponseBody<Void> changeCommentStatus(CommentStatusRequest commentStatusRequest) {
       ApiRequestBody request = new ApiRequestBody<>(getToken(), commentStatusRequest);
       return postRequest(request, XimaEndPoint.COMMENT_CHANGE_STATUS);
    }




    private static String getToken() {
        return SessionHolder.getToken();
    }

    private static ApiResponseBody postRequest(
            final ApiRequestBody requestBody,
            final XimaEndPoint endPoint ) {

        requestBody.setAction(endPoint.getApiAction());

        ApiResponseBody apiResponse = OkHttpRequest.postRequest(requestBody);

        if(apiResponse != null && apiResponse.successful() && apiResponse.getData() != null){
            ObjectMapper mapper = new ObjectMapper();
            try {
                apiResponse.setData(mapper.readValue(mapper.writeValueAsString(apiResponse.getData()) , endPoint.getResponseType()));
            } catch (IOException e) {
                e.printStackTrace();
            }
        }

        return apiResponse;
    }

    public static ApiResponseBody<OrderDataResponse> getAllOrderData(ProviderSearchRequest loginRequest) {
        ApiRequestBody request = new ApiRequestBody<>( getToken() , loginRequest );
        return postRequest( request , XimaEndPoint.ORDER_DATA);
    }


    public static ApiResponseBody<List<OrderChartRestResponse>> getOrderChartResponse( YearMonthFilterRequest req) {
        ApiRequestBody request = new ApiRequestBody<>( getToken() , req);
        return postRequest( request , XimaEndPoint.ORDER_CHART);
    }

    public static ApiResponseBody<List<OrderChartRestResponse>> getCategoryOrderChartResponse( YearMonthFilterRequest req) {
        ApiRequestBody request = new ApiRequestBody<>( getToken() , req);
        return postRequest( request , XimaEndPoint.CATEGORY_ORDER_CHART);
    }

}