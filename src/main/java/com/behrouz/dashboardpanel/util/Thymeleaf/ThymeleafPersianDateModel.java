package com.behrouz.dashboardpanel.util.Thymeleaf;



import com.behrouz.dashboardpanel.util.date.PersianDate;
import com.behrouz.dashboardpanel.util.date.PersianDateUtil;

import java.util.Date;

/**
 * Created by Hapi
 * 09 September 2018 13:19
 **/
public interface ThymeleafPersianDateModel {

    default String dateToPersianString(Date date){
        return PersianDateUtil.getPersianDateString(date);
    }

    default String dateToPersianDate(Date date){
        return String.valueOf(PersianDateUtil.getPersianDate(date));
    }

    default PersianDate getPersianDate(Date date){
        return PersianDateUtil.getPersianDate(date);
    }

    default String getPersianDateAndHour(Date date){
        return PersianDateUtil.getPersianDateAndHour(date.getTime());
    }

}

