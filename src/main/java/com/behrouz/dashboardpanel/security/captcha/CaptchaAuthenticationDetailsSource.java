package com.behrouz.dashboardpanel.security.captcha;

import org.springframework.security.authentication.AuthenticationDetailsSource;

import javax.servlet.http.HttpServletRequest;

/**
 * Created by Hapi
 * 09 September 2018 13:35
 **/
public class CaptchaAuthenticationDetailsSource implements AuthenticationDetailsSource<HttpServletRequest, CaptchaAuthenticationDetails> {

    @Override
    public CaptchaAuthenticationDetails buildDetails(HttpServletRequest context) {
        return new CaptchaAuthenticationDetails(context);
    }
}
