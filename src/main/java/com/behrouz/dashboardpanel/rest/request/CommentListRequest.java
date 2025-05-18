package com.behrouz.dashboardpanel.rest.request;

/**
 * Created by: HapiKZM
 **/
public class CommentListRequest {

    private int page;

    private int size;

    private int productId;
    private int status;

    private int providerId;



    public CommentListRequest() {
    }

    public CommentListRequest(int page, int size, int productId, int providerId, int status) {
        this.page = page;
        this.size = size;
        this.productId = productId;
        this.status = status;
        this.providerId = providerId;
    }




    public int getPage() {
        return page;
    }
    public void setPage(int page) {
        this.page = page;
    }


    public int getSize() {
        return size;
    }
    public void setSize(int size) {
        this.size = size;
    }


    public int getProductId() {
        return productId;
    }
    public void setProductId(int productId) {
        this.productId = productId;
    }


    public int getProviderId() {
        return providerId;
    }
    public void setProviderId(int providerId) {
        this.providerId = providerId;
    }

    public int getStatus() {
        return status;
    }
    public void setStatus(int status) {
        this.status = status;
    }
}
