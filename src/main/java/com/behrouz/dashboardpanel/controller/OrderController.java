package com.behrouz.dashboardpanel.controller;

import com.behrouz.dashboardpanel.okhttp.OkHttpHelper;
import com.behrouz.dashboardpanel.okhttp.api.ApiResponseBody;
import com.behrouz.dashboardpanel.okhttp.model.request.ChangeStatusRequest;
import com.behrouz.dashboardpanel.okhttp.model.request.IdRequest;
import com.behrouz.dashboardpanel.okhttp.model.response.ProviderOrderResponse;
import com.behrouz.dashboardpanel.rest.AjaxResponse;
import com.behrouz.dashboardpanel.rest.response.FactorDetailResponse;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.server.ResponseStatusException;

/**
 * Created by: Hapi
 * 12 September 2020
 **/
@Controller
@RequestMapping(value = "/admin/order")
public class OrderController {

    @RequestMapping("/detail/{orderId}")
    public String orderDetail(
            Model model,
            @PathVariable(name = "orderId",required = false)int orderId
    ){

        IdRequest request =
                new IdRequest(orderId);

        ApiResponseBody<FactorDetailResponse> response =
                OkHttpHelper.orderDetail(request);
        if (!response.successful()){

            throw new ResponseStatusException(HttpStatus.NOT_FOUND);

        }
        model.addAttribute("orderDetail", response.getData());

        model.addAttribute("view", "/view/order/orderDetail.html");
        return "index.html";
    }

    @RequestMapping("/status/{orderId}/{statusId}")
    public ResponseEntity<AjaxResponse> orderStatus(
            @PathVariable(name = "orderId",required = false)int orderId,
            @PathVariable(name = "statusId",required = false)int statusId

    ){
        AjaxResponse ajaxResponse;

        ChangeStatusRequest request =
                new ChangeStatusRequest(orderId , statusId);

        ApiResponseBody<ProviderOrderResponse> response =
                OkHttpHelper.orderStatus(request);
        if(!response.successful()){
            ajaxResponse = new AjaxResponse(
                    false,
                    response.getDescription()
            );
        }else {
            ajaxResponse = new AjaxResponse(
                    true,
                    response.getData()
            );
        }

        return ResponseEntity.ok(ajaxResponse);
    }
//    @RequestMapping(value = {"/statusModal/{id}"})
//    public ModelAndView unitNew(@PathVariable(name = "id", required = false) int id,
//                                Model model,
//                                HttpServletRequest request) {
//
//
//        // TODO: 10/1/20 pass current status
//
//        ModelAndView modelAndView = new ModelAndView();
////        modelAndView.addObject("data",data);
//        modelAndView.setViewName("fragment/orderStatusModal::modal");
//
//        return modelAndView;
//    }
//
//    @RequestMapping(value = {"/orderStatus/save/{id}/{statusId}"})
//    public ModelAndView unitNew(@PathVariable(name = "id", required = false) int orderId,
//                                @PathVariable(name = "statusId", required = false) int statusId,
//                                Model model,
//                                HttpServletRequest request) {
//
//
//        // TODO: 10/1/20 pass current status
//
//        ModelAndView modelAndView = new ModelAndView();
//        modelAndView.addObject("orderId", orderId);
//        modelAndView.setViewName("fragment/orderStatusModal::modal");
//
//        return modelAndView;
//    }
//
//
//    @PostMapping(value = "/list")
//    public ResponseEntity listOperator(
//            @RequestParam(name = "pagination[page]") int page,
//            @RequestParam(name = "pagination[perpage]") int perpage,
//            @RequestParam(name = "sort[sort]", required = false) String sort,
//            @RequestParam(name = "sort[field]", required = false) String sortField,
//            @RequestParam(name = "query[Status]", required = false) String Status,
//            @RequestParam(name = "query[customerName]", required = false) String customerName,
//            @RequestParam(name = "query[trackingCode]", required = false) String trackingCode,
//            @RequestParam(name = "query[customerMobile]", required = false) String customerMobile,
//            @RequestParam(name = "query[generalSearch]", required = false) String searchString) {
//
//
//        DataTableResponse<CustomerOrderRestResponse> response = new DataTableResponse<>(getFakeList(), page, perpage, 100);
//
//        return ResponseEntity.ok(response);
//
//    }
//
//    private List<CustomerOrderRestResponse> getFakeList() {
//        List<CustomerOrderRestResponse> list = new ArrayList<>();
//        list.add(new CustomerOrderRestResponse(1, 1, new IdName(1, "ثبت شده"), new IdName(1, "سید امید رضایی"), "09391661479", "200016659", "13 مهر 1399", 560000));
//        list.add(new CustomerOrderRestResponse(2, 2, new IdName(1, "ثبت شده"), new IdName(2, "سید  رضایی"), "09123465987", "514984565", "12 مهر 1399", 1200000));
//        list.add(new CustomerOrderRestResponse(3, 3, new IdName(2, "درحال اماده سازی"), new IdName(3, "حاج میتن"), "09354648184", "468", "15 مهر 1399", 360000));
//        list.add(new CustomerOrderRestResponse(4, 4, new IdName(3, "ارسال شده"), new IdName(4, "مجتبی جلمبادانی"), "09362874123", "465844854", "15 مهر 1399", 230000));
//
//
//        return list;
//    }
//
//    @RequestMapping(value = "/detail/{orderID}")
//    public String orderDetail(
//            @PathVariable(name = "orderID") int orderID,
//            Model model) {
//        Object orderDetail = null;
//
//        model.addAttribute("orderDetail", orderDetail);
//        model.addAttribute("view", "/view/order/orderDetail.html");
//        return "index.html";
//    }

//
//    private List<CustomeOrderDetailRestResponse> getFakeOrderDetailList(id) {
//        List<CustomeOrderDetailRestResponse> list = new ArrayList<>();
//        list.add(new CustomeOrderDetailRestResponse(0,0,new IdName(1, "ثبت شده"),new IdName(1, "سید امید رضایی"),"30303030303","111111","۱۳مهر","مشهد - وکیل اباد",2500000,15));
//        list.add(new CustomeOrderDetailRestResponse(1, 1, new IdName(1, "ثبت شده"), new IdName(2, "مرد خسته"), "09090909090", "222222", "۱۴ مهر 1399","تهران - ونک", 1200000,30));
//        list.add(new CustomeOrderDetailRestResponse(2,2,new IdName(1, "ثبت شده"),new IdName(3, "مرد زنده "),"10101010101","333333","۱۵مهر","اهواز",500000,10));
//        list.add(new CustomeOrderDetailRestResponse(3,3,new IdName(1, "ثبت شده"),new IdName(4, "مرد"),"20202020202","444444","۱۶مهر","رشت",90000000,3));
//        return list.get(id);
//    }
}
