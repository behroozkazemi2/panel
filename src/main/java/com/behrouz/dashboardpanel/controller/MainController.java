package com.behrouz.dashboardpanel.controller;

import com.behrouz.dashboardpanel.security.model.SessionHolder;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;

import javax.servlet.http.HttpServletRequest;
import java.util.Enumeration;
import java.util.LinkedHashMap;
import java.util.Map;

/**
 * Created by Hapi
 * 10 October 2019 10:25
 **/
@Controller
public class MainController {

    @RequestMapping(value = {"", "/"})
    public String main(Model model, HttpServletRequest request) {
        if(!SessionHolder.isLogin()){
            return "login";
        }

        showHeader(request);

        return "redirect:/admin";
    }


    private void showHeader ( HttpServletRequest request ) {
        Map<String, String> map = new LinkedHashMap<>();

        Enumeration headerNames = request.getHeaderNames();
        while (headerNames.hasMoreElements()) {
            String key = (String) headerNames.nextElement();
            String value = request.getHeader(key);
            map.put(key, value);
        }

        System.out.println( "\n\n\nREQUEST HEADER -> " + map.toString() + "\n\n\n" );
    }

}
