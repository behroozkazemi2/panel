package com.behrouz.dashboardpanel.okhttp.model.response;

import java.util.Date;
import java.util.List;

public class OrderChartRestResponse {
    private Date insertDate;
    private String persianDate;
    private double price;
    private long count;
    private long productCount;
    private long categoryId;
    private String categoryName;
    private String productName;
    private long productId;
    private List<OrderChartRestResponse> subDetail;

    public OrderChartRestResponse() {
    }

    public OrderChartRestResponse(Date insertDate, double price, long count, long productCount) {
        this.insertDate = insertDate;
        this.price = price;
        this.count = count;
        this.productCount = productCount;
    }
    public OrderChartRestResponse(Date insertDate, double price, long count, long productCount, String persianDate) {
        this.insertDate = insertDate;
        this.persianDate = persianDate;
        this.price = price;
        this.count = count;
        this.productCount = productCount;
    }

    public OrderChartRestResponse(double price, long categoryId, String categoryName, long productId, String productName) {
        this.price = price;
        this.categoryId = categoryId;
        this.categoryName = categoryName;
        this.productName = productName;
        this.productId = productId;
    }

    public OrderChartRestResponse(double price, long categoryId, String categoryName, long productId, String productName, int count) {
        this.price = price;
        this.categoryId = categoryId;
        this.categoryName = categoryName;
        this.productName = productName;
        this.productId = productId;
        this.count = count;
    }

    public Date getInsertDate() {
        return insertDate;
    }
    public void setInsertDate(Date insertDate) {
        this.insertDate = insertDate;
    }
    public String getPersianDate() {
        return persianDate;
    }
    public void setPersianDate(String persianDate) {
        this.persianDate = persianDate;
    }

    public double getPrice() {
        return price;
    }
    public void setPrice(double price) {
        this.price = price;
    }

    public long getCount() {
        return count;
    }
    public void setCount(long count) {
        this.count = count;
    }

    public long getProductCount() {
        return productCount;
    }
    public void setProductCount(long productCount) {
        this.productCount = productCount;
    }

    public long getCategoryId() {
        return categoryId;
    }
    public void setCategoryId(long categoryId) {
        this.categoryId = categoryId;
    }

    public String getCategoryName() {
        return categoryName;
    }
    public void setCategoryName(String categoryName) {
        this.categoryName = categoryName;
    }

    public String getProductName() {
        return productName;
    }
    public void setProductName(String productName) {
        this.productName = productName;
    }

    public List<OrderChartRestResponse> getSubDetail() {
        return subDetail;
    }
    public void setSubDetail(List<OrderChartRestResponse> subDetail) {
        this.subDetail = subDetail;
    }

    public long getProductId() {
        return productId;
    }
    public void setProductId(long productId) {
        this.productId = productId;
    }
}
