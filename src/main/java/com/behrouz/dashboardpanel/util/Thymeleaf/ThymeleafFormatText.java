package com.behrouz.dashboardpanel.util.Thymeleaf;


import com.behrouz.dashboardpanel.util.StringUtil;

public interface ThymeleafFormatText {

    default String moreFormat(String str, int len) {
        if(!StringUtil.isNullOrEmpty(str) && str.length() > len){
            String text = "";
            text = str.substring(0, len);
            text = "..." + text;
            return text;
        }
        return str;
    }
}
