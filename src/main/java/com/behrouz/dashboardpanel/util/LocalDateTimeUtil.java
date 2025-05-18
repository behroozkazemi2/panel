package com.behrouz.dashboardpanel.util;

import java.time.DayOfWeek;
import java.time.LocalDate;
import java.time.LocalDateTime;

public class LocalDateTimeUtil {

    public static boolean isShanbeTa4Shanbe(LocalDate dateTime){
        return isShanbeTa4Shanbe(dateTime.atStartOfDay());
    }

    public static boolean isShanbeTa4Shanbe(LocalDateTime dateTime){

        DayOfWeek dayOfWeek = dateTime.toLocalDate().getDayOfWeek();

        return
                dayOfWeek ==  DayOfWeek.SATURDAY ||
                        dayOfWeek ==  DayOfWeek.SUNDAY ||
                        dayOfWeek ==  DayOfWeek.MONDAY ||
                        dayOfWeek ==  DayOfWeek.TUESDAY ||
                        dayOfWeek ==  DayOfWeek.WEDNESDAY;
    }


    public static boolean is5Shanbe(LocalDate dateTime){
        return is5Shanbe(dateTime.atStartOfDay());
    }

    public static boolean is5Shanbe(LocalDateTime dateTime){

        DayOfWeek dayOfWeek = dateTime.toLocalDate().getDayOfWeek();

        return
                dayOfWeek ==  DayOfWeek.THURSDAY;
    }




}
