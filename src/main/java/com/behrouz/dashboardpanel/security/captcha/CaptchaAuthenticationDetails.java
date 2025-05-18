package com.behrouz.dashboardpanel.security.captcha;

import org.springframework.web.util.WebUtils;

import javax.servlet.http.HttpServletRequest;
import java.io.Serializable;

/**
 * Created by Hapi
 * 09 September 2018 13:33
 **/
public class CaptchaAuthenticationDetails implements Serializable {

    public static final String CAPTCHA_PARAMETER_NAME = "captcha xima panel";

    private String answer = "answer";
    private String captcha = "captcha";

    CaptchaAuthenticationDetails(HttpServletRequest request) {
        this.answer = request.getParameter("captcha");
        this.captcha = (String) WebUtils.getSessionAttribute(request, CAPTCHA_PARAMETER_NAME);
    }

    CaptchaAuthenticationDetails(boolean isAutoLogin) {
        if(isAutoLogin)
            answer = captcha = "auto_login";
    }

    public boolean isCorrect() {
        return answer != null && captcha != null && answer.toLowerCase().equals(captcha.toLowerCase());
    }
}
