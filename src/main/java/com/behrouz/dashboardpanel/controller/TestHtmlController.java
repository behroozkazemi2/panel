package com.behrouz.dashboardpanel.controller;


import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
@RequestMapping("/test/html/")
public class TestHtmlController {

    @RequestMapping("/image")
    public String image(){

        return "test_image_upload";
    }





}
