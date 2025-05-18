package com.behrouz.dashboardpanel.rest.response;

import com.behrouz.dashboardpanel.controller.DataTable;

import java.util.Date;
import java.util.List;

/**
 * Created by: Hapi
 * 13 September 2020
 **/
public class DataTableResponse<T> {

    private DataTable meta;

    private List<T> data;

    private Date nowDate = new Date(  );

    public DataTableResponse() {
    }

    public DataTableResponse(List<T> result, long total) {

    }

    public DataTableResponse(List<T> result, int pageNumber, int pageSize, long total) {
        this.data = result;
        this.meta = new DataTable( pageNumber, pageSize, total );
        this.nowDate = new Date();
    }


    public DataTable getMeta() {
        return meta;
    }
    public void setMeta(DataTable meta) {
        this.meta = meta;
    }



    public List<T> getData() {
        return data;
    }
    public void setData(List<T> data) {
        this.data = data;
    }



    public Date getNowDate() {
        return nowDate;
    }
    public void setNowDate(Date nowDate) {
        this.nowDate = nowDate;
    }
}
