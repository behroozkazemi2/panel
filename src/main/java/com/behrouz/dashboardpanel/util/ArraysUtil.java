package com.behrouz.dashboardpanel.util;

import com.behrouz.dashboardpanel.okhttp.model.response.ListResponse;

import java.util.ArrayList;
import java.util.Collection;
import java.util.List;

/**
 * created by: Hapi
 * company: mobin
 * 04 September 2018
 **/


public class ArraysUtil {

    public static boolean isNullOrEmpty(Collection< ? > array) {
        return array == null || array.isEmpty();
    }

    public static List< ? > convertResponseListToArrayList(ListResponse<?> data) {
        List<Object> list = new ArrayList<>();

        for ( Object item : data.getData()){
            list.add(item);
        }
        return list;
    }
}
