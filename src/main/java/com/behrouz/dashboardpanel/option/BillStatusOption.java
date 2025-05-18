package com.behrouz.dashboardpanel.option;


/**
 * Created by Hapi
 * 10 October 2018 13:08
 **/


public enum BillStatusOption {

    CREATED(1),//'ثبت شد'
    ACCEPTED(2),// پرداخت شد
    GETTING_READY(3),//'درحال آماده سازی'
    SENDING(4),//'ارسال شد'
    FINISHED(5),//'تحویل داده شد'
    DELETE(6);//'لغو شد'


    private final int id;

    BillStatusOption(int id ) {
        this.id = id;
    }

    public int getId() {
        return id;
    }

    public static BillStatusOption getById( int id){
        for(BillStatusOption option : BillStatusOption.values()){
            if(option.getId() == id){
                return option;
            }
        }

        return CREATED;
    }

}
