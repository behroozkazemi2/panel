package com.behrouz.dashboardpanel.api;


import com.behrouz.dashboardpanel.okhttp.OkHttpHelper;
import com.behrouz.dashboardpanel.okhttp.api.ApiResponseBody;
import com.behrouz.dashboardpanel.okhttp.model.request.IdRequest;
import com.behrouz.dashboardpanel.okhttp.model.request.ProductCategoryInfoRequest;
import com.behrouz.dashboardpanel.okhttp.model.request.ProviderSearchRequest;
import com.behrouz.dashboardpanel.okhttp.model.request.YearMonthFilterRequest;
import com.behrouz.dashboardpanel.okhttp.model.response.*;
import com.behrouz.dashboardpanel.rest.request.CommentListRequest;
import com.behrouz.dashboardpanel.rest.response.CommentResponseRequest;
import com.behrouz.dashboardpanel.rest.response.DataTableResponse;
import com.behrouz.dashboardpanel.security.model.SessionHolder;
import com.behrouz.dashboardpanel.okhttp.model.response.*;
import com.behrouz.dashboardpanel.util.ArraysUtil;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.server.ResponseStatusException;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/dashboard")
public class DashboardApi {

    @RequestMapping("/provider")
    public DataTableResponse<ProviderResponse> provider(
            @RequestParam(name = "query[generalSearch]", required = false) String searchString,
            @RequestParam(name = "pagination[page]") int page,
            @RequestParam(name = "pagination[perpage]") int perpage,
            @RequestParam(name = "sort[sort]", required = false) String sort,
            @RequestParam(name = "sort[field]", required = false) String sortField

    ) {
        ProviderSearchRequest request =
                new ProviderSearchRequest(
                        page-1,
                        perpage,
                        searchString
                );
        ApiResponseBody<ListResponse<ProviderResponse>> response =
                OkHttpHelper.providerList(request);
        if (!response.successful()){
            throw new ResponseStatusException(HttpStatus.NOT_FOUND);
        }
        DataTableResponse dataTable = new DataTableResponse(response.getData().getData(),page,perpage,response.getData().getCount());
        return dataTable;
    }


    @RequestMapping("/product/list/{proId}")
    public DataTableResponse<ProductDigestResponse> product(
            @RequestParam(name = "query[generalSearch]", required = false) String searchString,
            @RequestParam(name = "pagination[page]") int page,
            @RequestParam(name = "pagination[perpage]") int perpage,
            @RequestParam(name = "sort[sort]", required = false) String sort,
            @RequestParam(name = "sort[field]", required = false) String sortField,
            @RequestParam(name = "query[category]", required = false,defaultValue = "0") long category,
            @RequestParam(name = "query[brand]", required = false,defaultValue = "0") long brand,
            @PathVariable(name = "proId", required = false) int proId
    ) {

        if(proId == 0){
            proId = SessionHolder.getOperatorSessionDetail().getProviderId();
        }
        ProviderSearchRequest request =
                new ProviderSearchRequest(
                        page-1,
                        perpage,
                        searchString,
                        proId,
                        brand,
                        category
                );
        ApiResponseBody<ListResponse<ProductDigestResponse>> response =
                OkHttpHelper.productList(request);
        if (!response.successful()){
            throw new ResponseStatusException(HttpStatus.NOT_FOUND);
        }
        DataTableResponse dataTable = new DataTableResponse(response.getData().getData(),page,perpage,response.getData().getCount());
        return dataTable;
    }


    @RequestMapping("/product/bestSell/list/{proId}")
    public DataTableResponse<ProductDigestResponse> getBestSellProduct(
            @RequestParam(name = "query[generalSearch]", required = false) String searchString,
            @RequestParam(name = "pagination[page]") int page,
            @RequestParam(name = "pagination[perpage]") int perpage,
            @RequestParam(name = "sort[sort]", required = false) String sort,
            @RequestParam(name = "sort[field]", required = false) String sortField,
            @RequestParam(name = "query[category]", required = false,defaultValue = "0") long category,
            @RequestParam(name = "query[brand]", required = false,defaultValue = "0") long brand,
            @PathVariable(name = "proId", required = false) int proId
    ) {

        if(proId == 0){
            proId = SessionHolder.getOperatorSessionDetail().getProviderId();
        }
        ProviderSearchRequest request =
                new ProviderSearchRequest(
                        page-1,
                        perpage,
                        searchString,
                        proId,
                        brand,
                        category
                );
        ApiResponseBody<ListResponse<ProductDigestResponse>> response =
                OkHttpHelper.bestSellsProductList(request);
        if (!response.successful()){
            throw new ResponseStatusException(HttpStatus.NOT_FOUND);
        }
        DataTableResponse dataTable = new DataTableResponse(response.getData().getData(),page,perpage,response.getData().getCount());
        return dataTable;
    }

    @RequestMapping(value = {"/getAllOrderCartData/{proId}"})
    public OrderDataResponse dashboardTopCartData(
            @PathVariable(name = "proId", required = false) int proId
    ) {
        if(proId == 0){
            proId = SessionHolder.getOperatorSessionDetail().getProviderId();
        }
        ProviderSearchRequest request =
                new ProviderSearchRequest(
                        0,
                        0,
                        "",
                        proId
                );
        ApiResponseBody<OrderDataResponse> response =
                OkHttpHelper.getAllOrderData(request);
        if (!response.successful()){
            throw new ResponseStatusException(HttpStatus.NOT_FOUND);
        }
        return response.getData();
    }


    @RequestMapping("/productProvider/list/{proId}")
    public DataTableResponse<ProductDigestResponse> productProvider(
            @RequestParam(name = "query[generalSearch]", required = false) String searchString,
            @RequestParam(name = "pagination[page]") int page,
            @RequestParam(name = "pagination[perpage]") int perpage,
            @RequestParam(name = "sort[sort]", required = false) String sort,
            @RequestParam(name = "sort[field]", required = false) String sortField,
            @RequestParam(name = "query[category]", required = false,defaultValue = "0") long category,
            @RequestParam(name = "query[brand]", required = false,defaultValue = "0") long brand,
            @PathVariable(name = "proId", required = false) int proId
    ) {

        if(proId == 0){
            proId = SessionHolder.getOperatorSessionDetail().getProviderId();
        }
        ProviderSearchRequest request =
                new ProviderSearchRequest(
                        page-1,
                        perpage,
                        searchString,
                        proId,
                        brand,
                        category
                );
        ApiResponseBody<ListResponse<ProductProviderDigestResponse>> response =
                OkHttpHelper.productProviderList(request);
        if (!response.successful()){
            throw new ResponseStatusException(HttpStatus.NOT_FOUND);
        }
        DataTableResponse dataTable = new DataTableResponse(response.getData().getData(),page,perpage,response.getData().getCount());
        return dataTable;
    }

    @RequestMapping("/promoteProduct/list")
    public DataTableResponse<PromoteDigestResponse> promoteProduct(
            @RequestParam(name = "query[generalSearch]", required = false) String searchString,
            @RequestParam(name = "pagination[page]") int page,
            @RequestParam(name = "pagination[perpage]") int perpage,
            @RequestParam(name = "sort[sort]", required = false) String sort,
            @RequestParam(name = "sort[field]", required = false) String sortField
    ) {

        ProviderSearchRequest request =
                new ProviderSearchRequest(
                        page-1,
                        perpage,
                        searchString
                );
        ApiResponseBody<ListResponse<PromoteDigestResponse>> response =
                OkHttpHelper.promoteProductList(request);
        if (!response.successful()){
            throw new ResponseStatusException(HttpStatus.NOT_FOUND);
        }
        DataTableResponse dataTable = new DataTableResponse(response.getData().getData(),page,perpage,response.getData().getCount());
        return dataTable;
    }


    @RequestMapping("/region")
    public List<RegionResponse> region() {
        ApiResponseBody<List<RegionResponse>> response =
                OkHttpHelper.region();
        if (!response.successful()){
            throw new ResponseStatusException(HttpStatus.NOT_FOUND);
        }
        return response.getData();
    }


    @RequestMapping("/category")
    public DataTableResponse<IdName> category(
            @RequestParam(name = "query[generalSearch]", required = false) String searchString,
            @RequestParam(name = "pagination[page]") int page,
            @RequestParam(name = "pagination[perpage]") int perpage,
            @RequestParam(name = "sort[sort]", required = false) String sort,
            @RequestParam(name = "sort[field]", required = false) String sortField
    ) {
        ApiResponseBody<List<CategoryRestResponse>> response = OkHttpHelper.category();
        if (!response.successful()){
            throw new ResponseStatusException(HttpStatus.NOT_FOUND);
        }
        DataTableResponse dataTable = new DataTableResponse(response.getData(),page,perpage,response.getTotal());
        return dataTable;
    }


    @RequestMapping("/brand")
    public DataTableResponse<IdName> brand(
            @RequestParam(name = "query[generalSearch]", required = false) String searchString,
            @RequestParam(name = "pagination[page]") int page,
            @RequestParam(name = "pagination[perpage]") int perpage,
            @RequestParam(name = "sort[sort]", required = false) String sort,
            @RequestParam(name = "sort[field]", required = false) String sortField
    ) {
        ApiResponseBody<List<IdName>> response = OkHttpHelper.allBrands(new IdRequest(0));
        if (!response.successful()){
            throw new ResponseStatusException(HttpStatus.NOT_FOUND);
        }
        DataTableResponse dataTable = new DataTableResponse(response.getData(),page,perpage,response.getTotal());
        return dataTable;    }

    @RequestMapping("/banner/list")
    public DataTableResponse<IdName> bannerList(
            @RequestParam(name = "query[generalSearch]", required = false) String searchString,
            @RequestParam(name = "pagination[page]") int page,
            @RequestParam(name = "pagination[perpage]") int perpage,
            @RequestParam(name = "sort[sort]", required = false) String sort,
            @RequestParam(name = "sort[field]", required = false) String sortField
    ) {
        ApiResponseBody<List<IdName>> response = OkHttpHelper.bannerList();

        if (!response.successful()){
            throw new ResponseStatusException(HttpStatus.NOT_FOUND);
        }

        DataTableResponse dataTable = new DataTableResponse(response.getData(),page,perpage,response.getTotal());

        return dataTable;    }

   @RequestMapping("/order")
    public DataTableResponse<ProviderOrderDigestResponse> orderList(
            @RequestParam(name = "query[generalSearch]", required = false) String searchString,
            @RequestParam(name = "query[status]", required = false, defaultValue = "0") long status,
            @RequestParam(name = "query[customerName]", required = false) String customerName,
            @RequestParam(name = "query[trackingCode]", required = false) String trackingCode,
            @RequestParam(name = "query[customerMobile]", required = false) String customerMobile,
            @RequestParam(name = "query[orderDate]", required = false,defaultValue = "0") long orderDate,
            @RequestParam(name = "query[deliverDate]", required = false, defaultValue = "0") long deliverDate,
            @RequestParam(name = "pagination[page]") int page,
            @RequestParam(name = "pagination[perpage]") int perpage,
            @RequestParam(name = "sort[sort]", required = false) String sort,
            @RequestParam(name = "sort[field]", required = false) String sortFiel
    ){
    int providerId = SessionHolder.getOperatorSessionDetail().getProviderId();

        ProviderSearchRequest request =
                new ProviderSearchRequest(
                        page,
                        perpage,
                        searchString,
                        providerId,
                        status,
                        customerName,
                        trackingCode,
                        customerMobile,
                        orderDate,
                        deliverDate
                );

        ApiResponseBody<List<ProviderOrderDigestResponse>> response =
                OkHttpHelper.orderList(request);
        if (!response.successful()){
            throw new ResponseStatusException(HttpStatus.NOT_FOUND);
        }

        DataTableResponse dataTable = new DataTableResponse(response.getData(),page,perpage,response.getTotal());
        return dataTable;
    }
   @RequestMapping("/lastOrders")
    public DataTableResponse<ProviderOrderDigestResponse> getLastTenOrderList(
            @RequestParam(name = "query[generalSearch]", required = false) String searchString,
            @RequestParam(name = "query[status]", required = false, defaultValue = "0") long status,
            @RequestParam(name = "query[customerName]", required = false) String customerName,
            @RequestParam(name = "query[trackingCode]", required = false) String trackingCode,
            @RequestParam(name = "query[customerMobile]", required = false) String customerMobile,
            @RequestParam(name = "query[orderDate]", required = false,defaultValue = "0") long orderDate,
            @RequestParam(name = "query[deliverDate]", required = false, defaultValue = "0") long deliverDate,
            @RequestParam(name = "pagination[page]") int page,
            @RequestParam(name = "pagination[perpage]") int perpage,
            @RequestParam(name = "sort[sort]", required = false) String sort,
            @RequestParam(name = "sort[field]", required = false) String sortFiel
    ){
    int providerId = SessionHolder.getOperatorSessionDetail().getProviderId();

        ProviderSearchRequest request =
                new ProviderSearchRequest(
                        page,
                        perpage,
                        searchString,
                        providerId,
                        status,
                        customerName,
                        trackingCode,
                        customerMobile,
                        orderDate,
                        deliverDate

                );

        ApiResponseBody<List<ProviderOrderDigestResponse>> response =
                OkHttpHelper.orderList(request);
        if (!response.successful()){
            throw new ResponseStatusException(HttpStatus.NOT_FOUND);
        }


        List<ProviderOrderDigestResponse> dataList = new ArrayList();

       int count =
               ArraysUtil.isNullOrEmpty(response.getData()) ? 0 : Math.min(response.getData().size(), 10);

        if (!ArraysUtil.isNullOrEmpty(response.getData())) {
            List<ProviderOrderDigestResponse> listLimit =
                    response.getData().stream().limit(count).collect(Collectors.toList());
            dataList.addAll(listLimit);
        }

        return new DataTableResponse(dataList,1,10, count);
    }



    @RequestMapping("/informationCategory/list")
    public DataTableResponse<ProductDigestResponse> infoCategory(
            @RequestParam(name = "query[generalSearch]", required = false) String searchString,
            @RequestParam(name = "pagination[page]") int page,
            @RequestParam(name = "pagination[perpage]") int perpage,
            @RequestParam(name = "sort[sort]", required = false) String sort,
            @RequestParam(name = "sort[field]", required = false) String sortField
    ) {

        ProviderSearchRequest request =
                new ProviderSearchRequest(
                        page - 1,
                        perpage,
                        searchString
                );
        ApiResponseBody<ListResponse<InformationCategoryRestResponse>> response =
                OkHttpHelper.informationCategoryList(request);

        if (!response.successful()){
            throw new ResponseStatusException(HttpStatus.NOT_FOUND);
        }

        DataTableResponse dataTable =
                new DataTableResponse(response.getData().getData(),page,perpage,response.getData().getCount());

        return dataTable;
    }


    @RequestMapping("/product/informationCategory/list/{productId}/{infoCatId}")
    public DataTableResponse<ProductDigestResponse> productInfoCategory(
            @RequestParam(name = "query[generalSearch]", required = false) String searchString,
            @RequestParam(name = "pagination[page]") int page,
            @RequestParam(name = "pagination[perpage]") int perpage,
            @PathVariable(name = "infoCatId") long infoCatId,
            @PathVariable(name = "productId") long productId,
            @RequestParam(name = "sort[sort]", required = false) String sort,
            @RequestParam(name = "sort[field]", required = false) String sortField
    ) {

        ProductCategoryInfoRequest request =
                new ProductCategoryInfoRequest(
                        page - 1,
                        perpage,
                        productId,
                        infoCatId
                );

        ApiResponseBody<ListResponse<InformationRestResponse>> response =
                OkHttpHelper.productInformationList(request);

        if (!response.successful()){
            throw new ResponseStatusException(HttpStatus.NOT_FOUND);
        }

        DataTableResponse dataTable =
                new DataTableResponse(response.getData().getData(),page,perpage,response.getData().getCount());

        return dataTable;
    }




    @RequestMapping("/order/chart")
    public List<OrderChartRestResponse> orderChart(
            @RequestParam (name = "year", required = false, defaultValue = "0") long year,
            @RequestParam (name = "month", required = false, defaultValue = "0") long month,
            @RequestParam (name = "groupByMonth", required = false, defaultValue = "true") boolean groupByMonth
    ) {
        ApiResponseBody<List<OrderChartRestResponse>> response =
                OkHttpHelper.getOrderChartResponse(
                        new YearMonthFilterRequest(
                                year,
                                month,
                                groupByMonth
                        )
                );
        if (!response.successful()){
            throw new ResponseStatusException(HttpStatus.NOT_FOUND);
        }
        return response.getData();
    }


    @RequestMapping("/category/order/chart")
    public List<OrderChartRestResponse> categoryOrderChart(
            @RequestParam (name = "year", required = false, defaultValue = "0") long year,
            @RequestParam (name = "month", required = false, defaultValue = "0") long month,
            @RequestParam (name = "groupByMonth", required = false, defaultValue = "true") boolean groupByMonth
    ) {
        ApiResponseBody<List<OrderChartRestResponse>> response =
                OkHttpHelper.getCategoryOrderChartResponse(
                        new YearMonthFilterRequest(
                                year,
                                month,
                                groupByMonth
                        )
                );
        if (!response.successful()){
            throw new ResponseStatusException(HttpStatus.NOT_FOUND);
        }
        return response.getData();
    }


    @RequestMapping("/panel/product/list/{proId}")
    public DataTableResponse<ProductDigestResponse> dashboardProductList(
            @RequestParam(name = "query[generalSearch]", required = false) String searchString,
            @RequestParam(name = "pagination[page]") int page,
            @RequestParam(name = "pagination[perpage]") int perpage,
            @RequestParam(name = "sort[sort]", required = false) String sort,
            @RequestParam(name = "sort[field]", required = false) String sortField,
            @RequestParam(name = "query[category]", required = false,defaultValue = "0") long category,
            @RequestParam(name = "query[brand]", required = false,defaultValue = "0") long brand,
            @PathVariable(name = "proId", required = false) int proId
    ) {

        if(proId == 0){
            proId = SessionHolder.getOperatorSessionDetail().getProviderId();
        }
        ProviderSearchRequest request =
                new ProviderSearchRequest(
                        0,
                        10,
                        searchString,
                        proId,
                        brand,
                        category
                );
        ApiResponseBody<ListResponse<ProductDigestResponse>> response =
                OkHttpHelper.productList(request);
        if (!response.successful()){
            throw new ResponseStatusException(HttpStatus.NOT_FOUND);
        }
        DataTableResponse dataTable = new DataTableResponse(response.getData().getData(),1,10,response.getData().getCount());
        return dataTable;
    }



    @RequestMapping(value = "/comment/list/{productId}/{status}")
    public DataTableResponse<CommentResponseRequest> commentProductList(
            @RequestParam(name = "query[generalSearch]", required = false) String searchString,
            @RequestParam(name = "pagination[page]") int page,
            @RequestParam(name = "pagination[perpage]") int perpage,
            @RequestParam(name = "sort[sort]", required = false) String sort,
            @RequestParam(name = "sort[field]", required = false) String sortField,
            @PathVariable(name = "productId") int productId,
            @PathVariable(name = "status") int status
    ) {
        ApiResponseBody<ListResponse<CommentResponseRequest>> listReq =
                OkHttpHelper.getCommentList(new CommentListRequest(1, 10, productId, 0, status));

        if (!listReq.successful()){
            throw new ResponseStatusException(HttpStatus.NOT_FOUND);
        }

        return new DataTableResponse(listReq.getData().getData(), page,perpage,listReq.getData().getCount());
    }
}
