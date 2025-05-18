package com.behrouz.dashboardpanel.exception;

/**
 * Created by Hapi
 * 09 September 2018 16:49
 **/
public class KrecException extends Throwable {


    private final String description;


    public KrecException(String description) {
        this.description = description;
    }

    public String getDescription() {
        return description;
    }

    public static void make(String message) throws KrecException {
        throw new KrecException( message );
    }


}