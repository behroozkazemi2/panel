package com.behrouz.dashboardpanel.util;

/**
 * Created by Hapi
 * 09 September 2018 13:17
 **/

public class StringUtil {

    public static final boolean isNullOrEmpty(String str){
        return str == null || str.isEmpty();
    }

    public static final boolean isAllInteger(String str){
        if(isNullOrEmpty( str )){
            return false;
        }
        boolean allInteger = true;
        for ( int i = 0; i < str.length(); i++ ) {
            if( str .charAt( i ) < '0' || str.charAt( i ) > '9' ){
                allInteger = false;
            }
        }
        return allInteger;
    }

}
