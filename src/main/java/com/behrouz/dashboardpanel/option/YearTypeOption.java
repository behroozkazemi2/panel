package com.behrouz.dashboardpanel.option;


import com.behrouz.dashboardpanel.okhttp.model.response.IdName;
import com.behrouz.dashboardpanel.util.PersianNumberText;
import com.behrouz.dashboardpanel.util.date.PersianDateUtil;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

public enum YearTypeOption {

//    YEAR1398(1398, PersianNumberText.toPersianNumber("1398")),
//    YEAR1399(1399, PersianNumberText.toPersianNumber("1399")),
    YEAR1403(1403,PersianNumberText.toPersianNumber("1403")),
    YEAR1404(1404,PersianNumberText.toPersianNumber("1404"));


    private final int id;
    private final String name;

    public int getId () {
        return id;
    }
    public String getName () {
        return name;
    }

    YearTypeOption(int id, String name ) {
        this.id = id;
        this.name = name;
    }

    public static YearTypeOption getById(int id){
        for ( YearTypeOption option : YearTypeOption.values() ){
            if ( option.id == id ){
                return option;
            }
        }
        return YEAR1403;
    }

    public static List<IdName> getAll(){
        int endYear = PersianDateUtil.getPersianDate(new Date()).getYear();

        List<IdName> allMonth = new ArrayList<>();

        int startYear = 1402;
        while ( endYear >= startYear){

            allMonth.add(
                    new IdName(
                            startYear,
                            startYear + ""
                    )
            );
            startYear++;
        }
        return allMonth;
    }


}
