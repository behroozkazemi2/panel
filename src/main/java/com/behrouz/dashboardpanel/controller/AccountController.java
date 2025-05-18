package com.behrouz.dashboardpanel.controller;

import com.behrouz.dashboardpanel.security.model.SessionHolder;
import com.behrouz.dashboardpanel.security.captcha.CaptchaUtil;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.web.authentication.logout.SecurityContextLogoutHandler;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import javax.servlet.ServletOutputStream;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import java.io.IOException;

/**
 * Created by Hapi
 * 23 September 2018 10:10
 **/
@Controller
public class AccountController {

    @RequestMapping( value = { "/login" } )
    public String preLogin ( Model model, HttpSession session, HttpServletRequest request ) {
        if(!SessionHolder.isLogin()){

            return "login";
        } else{
            return "redirect:/";
        }
    }

    @RequestMapping( value = { "/captcha" } )
    public void captcha ( HttpServletResponse response, HttpServletRequest request ) throws IOException {

        try {
            byte[] imgByte =
                    CaptchaUtil.createImage( request );

            writeResponseImage( response, imgByte );

        } catch ( IOException e ) {

            response.sendError( HttpServletResponse.SC_NOT_FOUND );

        }
    }


    private void writeResponseImage ( final HttpServletResponse response, byte[] imgByte ) throws IOException {

        long time = System.currentTimeMillis();
        response.setContentType( "image/jpeg" );
        response.setHeader( "Cache-Control", "no-cache, no-store" );
        response.setHeader( "Pragma", "no-cache" );
        response.setDateHeader( "Last-Modified", time );
        response.setDateHeader( "Date", time );
        response.setDateHeader( "Expires", time );
        ServletOutputStream responseOutputStream = response.getOutputStream();
        responseOutputStream.write( imgByte );
        responseOutputStream.flush();
        responseOutputStream.close();

    }


    @RequestMapping( value = "/logout" )
    public String logoutPage ( HttpServletRequest request, HttpServletResponse response ) {

        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        if ( auth != null ) {
            new SecurityContextLogoutHandler().logout( request, response, auth );
        }
        return "redirect:/login?logout";//You can redirect wherever you want, but generally it's a good practice to show login screen again.
    }


    private boolean isCorrectCaptcha ( HttpServletRequest httpRequest, String captcha ) {

        String captchaCode = CaptchaUtil.getSavedCaptcha( httpRequest );

        return captchaCode != null && captchaCode.equalsIgnoreCase( captcha );

    }


}