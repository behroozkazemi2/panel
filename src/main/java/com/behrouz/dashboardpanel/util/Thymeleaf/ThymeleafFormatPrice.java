package com.behrouz.dashboardpanel.util.Thymeleaf;

public interface ThymeleafFormatPrice {
    default String moneyFormat(long len) {
        String changeMoney = String.valueOf(len);
        int length = changeMoney.length();
        String text = changeMoney;
        int counter=0;
        for (int i =length-1; 0 <= i; i--) {
            counter++;
            if (counter %3 == 0 && counter!=length) {
                text= text.substring(0, i) + "," + text.substring(i);
            }
        }
        return text+" ریال ";

    }
}
