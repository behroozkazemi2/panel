package com.behrouz.dashboardpanel.controller;


import com.behrouz.dashboardpanel.okhttp.OkHttpHelper;
import com.behrouz.dashboardpanel.okhttp.api.ApiResponseBody;
import com.behrouz.dashboardpanel.okhttp.model.response.ListResponse;
import com.behrouz.dashboardpanel.rest.AjaxResponse;
import com.behrouz.dashboardpanel.rest.request.CommentListRequest;
import com.behrouz.dashboardpanel.rest.request.CommentStatusRequest;
import com.behrouz.dashboardpanel.rest.response.CommentResponseRequest;
import com.behrouz.dashboardpanel.rest.response.DataTableResponse;
import com.behrouz.dashboardpanel.rest.request.*;
import com.behrouz.dashboardpanel.rest.response.*;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.server.ResponseStatusException;
import javax.servlet.http.HttpServletRequest;

@Controller
@RequestMapping(value = "/admin/comment")
public class CommentController {

    @RequestMapping(value = {"/", "", "/{productId}"})
    public String index(
            @PathVariable(name = "productId" , required = false) Long productId,
            Model model,
            HttpServletRequest request) {
        model.addAttribute("productId", productId == null ? 0 : productId);
        model.addAttribute("view", "view/comment/comment.html");
        return "index.html";
    }


    @RequestMapping(value = "/product/list/{productId}/{status}")
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
                OkHttpHelper.getCommentList(new CommentListRequest(page, perpage, productId, 0, status));

        if (!listReq.successful()){
            throw new ResponseStatusException(HttpStatus.NOT_FOUND);
        }

        return new DataTableResponse(listReq.getData().getData(), page,perpage,listReq.getData().getCount());
    }

    @RequestMapping(value = "/product/send/{commentId}/{statusId}")
    public AjaxResponse productCommentAdd(
            @PathVariable(value = "commentId") int commentId,
            @PathVariable(value = "statusId") int statusId,
            @RequestParam(value = "text", required = true) String text) {

        ApiResponseBody saveState = OkHttpHelper.changeCommentStatus(
                new CommentStatusRequest(
                        commentId,
                        statusId,
                        text
                )
        );

        if(!saveState.successful()){
            return new AjaxResponse(false, saveState.getMessage());
        }
        return new AjaxResponse(true, "ثبت با موفقیت انجام شد");
    }
}