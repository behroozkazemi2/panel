package com.behrouz.dashboardpanel.option;

import io.netty.util.internal.StringUtil;

import java.util.ArrayList;
import java.util.List;

public enum TicketImportanceOption {
    VERY_IMPORTANT (1,"خیلی فوری"),
    IMPORTANT (2,"فوری"),
    NORMAL (3,"عادی"),
    UN_NECESSARY(4,"پایین");

    private final int id;
    private final String name;


    public int getId () {
        return id;
    }
    public String getName () {
        return name;
    }

    TicketImportanceOption(int id, String name ) {
        this.id = id;
        this.name = name;
    }

    public static TicketImportanceOption getById(int id){
        for ( TicketImportanceOption option : TicketImportanceOption.values() ){
            if ( option.id == id ){
                return option;
            }
        }
        return UN_NECESSARY;
    }

    public static TicketImportanceOption getType(String name){
        if(StringUtil.isNullOrEmpty(name)){
            return UN_NECESSARY;
        }
        for ( TicketImportanceOption option : TicketImportanceOption.values() ){
            if (name.toLowerCase().contains(("."+option.name).toLowerCase()) ){
                return option;
            }
        }
        return UN_NECESSARY;
    }
    public static List<TicketImportanceOption> getAll(){

        List<TicketImportanceOption> list = new ArrayList<>();
        list.add(VERY_IMPORTANT);
        list.add(IMPORTANT);
        list.add(NORMAL);
        list.add(UN_NECESSARY);
        return list;
    }


}