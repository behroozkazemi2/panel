package com.behrouz.dashboardpanel.option;

import io.netty.util.internal.StringUtil;

import java.util.ArrayList;
import java.util.List;

public enum CommentStatusOption {
    CREATE(1,"ثبت شده"),
    SUBMITED(2,"تایید شده"),
    REJECT(3,"عدم تایید"),
    DELETE(4,"حذف شده"),
    UNKNOWN(0,"-");

    private final int id;
    private final String name;


    public int getId () {
        return id;
    }
    public String getName () {
        return name;
    }

    CommentStatusOption(int id, String name ) {
        this.id = id;
        this.name = name;
    }

    public static CommentStatusOption getById(int id){
        for ( CommentStatusOption option : CommentStatusOption.values() ){
            if ( option.id == id ){
                return option;
            }
        }
        return UNKNOWN;
    }

    public static CommentStatusOption getType(String name){
        if(StringUtil.isNullOrEmpty(name)){
            return UNKNOWN;
        }
        for ( CommentStatusOption option : CommentStatusOption.values() ){
            if (name.toLowerCase().contains(("."+option.name).toLowerCase()) ){
                return option;
            }
        }
        return UNKNOWN;
    }
    public static List<CommentStatusOption> getAll(){

        List<CommentStatusOption> list = new ArrayList<>();
        list.add(CREATE);
        list.add(SUBMITED);
        list.add(REJECT);
        list.add(UNKNOWN);
        return list;
    }


}