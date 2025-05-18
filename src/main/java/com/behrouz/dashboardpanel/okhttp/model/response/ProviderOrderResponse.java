package com.behrouz.dashboardpanel.okhttp.model.response;


import com.behrouz.dashboardpanel.okhttp.model.data.LatLngData;

import java.util.Date;
import java.util.List;

public class ProviderOrderResponse extends ProviderOrderDigestResponse{

    private List<Integer> images;

    private Date insertDate;

    private String address;

    private LatLngData point;

    private long amount;



    public ProviderOrderResponse() {
    }


//    public ProviderOrderResponse(int id, String name, IdName provider, String code, String unit, double count, IdName status, Date deliverDate, List<Integer> images, Date insertDate, String address, LatLngData point, long amount) {
//        super(id, name, provider, code, unit, count, status, deliverDate);
//        this.images = images;
//        this.insertDate = insertDate;
//        this.address = address;
//        this.point = point;
//        this.amount = amount;
//    }

    public List<Integer> getImages() {
        return images;
    }
    public void setImages(List<Integer> images) {
        this.images = images;
    }




    public Date getInsertDate() {
        return insertDate;
    }
    public void setInsertDate(Date insertDate) {
        this.insertDate = insertDate;
    }


    public String getAddress() {
        return address;
    }
    public void setAddress(String address) {
        this.address = address;
    }



    public LatLngData getPoint() {
        return point;
    }
    public void setPoint(LatLngData point) {
        this.point = point;
    }



    public long getAmount() {
        return amount;
    }
    public void setAmount(long amount) {
        this.amount = amount;
    }



}
