package com.behrouz.dashboardpanel.util;

import com.behrouz.dashboardpanel.util.date.PersianDate;
import com.behrouz.dashboardpanel.util.date.PersianDateUtil;

import java.util.Date;

/**
 * Created by Hapi
 * 23 October 2019 16:05
 **/
public class CurrentPersianDate {
    private int day;
    private int month;
    private int years;

    public CurrentPersianDate() {
        PersianDate persianDate = PersianDateUtil.getPersianDate(new Date());
        this.day = persianDate.getDayOfMonth();
        this.month = persianDate.getMonth() ;
        this.years= persianDate.getYear();
    }

    public int getDay() {
        return day;
    }

    public int getMonth() {
        return month;
    }

    public int getYears() {
        return years;
    }
}
