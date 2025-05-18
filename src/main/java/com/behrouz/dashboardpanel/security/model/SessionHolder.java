package com.behrouz.dashboardpanel.security.model;

import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;

/**
 * created by: Hapi
 * 11 July 2018
 **/

public class SessionHolder {

    public static boolean isLogin() {
        return getOperatorSessionDetail() != null;
    }

    public static int getUserId(){
        return getOperatorSessionDetail().getId();
    }



    public static String getFullName(){
        OperatorSessionDetail user = getOperatorSessionDetail();
        return String.format( "%s %s", user.getFirstName(),user.getLastName());
    }


    public static int getAvatar(){
        return getOperatorSessionDetail().getAvatar();
    }

    public static OperatorSessionDetail getOperatorSessionDetail() {
        Authentication token = SecurityContextHolder.getContext().getAuthentication();

        if(token == null || !token.isAuthenticated() || !(token.getDetails() instanceof OperatorSessionDetail ))
            return null;
            return ( (OperatorSessionDetail) token.getDetails() );
    }


    public static String getToken(){
        OperatorSessionDetail user = getOperatorSessionDetail();
        return user != null ? user.getToken() : null;
    }



    public static boolean isSuperVisor(){
        return isLogin() && getOperatorSessionDetail().isSuperVisor();
    }




}


