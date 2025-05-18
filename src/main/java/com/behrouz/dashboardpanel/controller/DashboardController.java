package com.behrouz.dashboardpanel.controller;

import com.behrouz.dashboardpanel.security.model.SessionHolder;
import com.behrouz.dashboardpanel.util.date.PersianDateUtil;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;

import javax.servlet.http.HttpServletRequest;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;

/**
 * Created by Hapi
 * 09 September 2018 13:23
 **/
@Controller
@RequestMapping(value = "/admin")
public class DashboardController {


    @RequestMapping(value = {"/", ""})
    public String index(Model model, HttpServletRequest request) {

        Map<String, String> dates = new HashMap<>();

        dates.put("date", PersianDateUtil.getPersianDate(new Date().getTime()));
        dates.put("stringDate", PersianDateUtil.getPersianDateStringWithoutYear(new Date()));

        model.addAttribute("date", dates);
        model.addAttribute("proId", SessionHolder.getOperatorSessionDetail().getProviderId());
        model.addAttribute("view", "view/dashboard");
        return "index";
    }

    @RequestMapping(value = {"/provider"})
    public String provider(Model model, HttpServletRequest request) {

        model.addAttribute("view", "/view/provider/provider.html");
        return "index.html";
    }

    @RequestMapping(value = {"/test"})
    public String test(Model model, HttpServletRequest request) {

        model.addAttribute("view", "/view/testTable");
        return "index.html";
    }

    @RequestMapping(value = {"/product/{proId}"})
    public String product(
            @PathVariable(name = "proId")int proId,
            Model model) {
        model.addAttribute("proId", proId);
        model.addAttribute("view", "/view/product/product.html");
        return "index.html";
    }


    @RequestMapping(value = {"/specialProduct"})
    public String specialProduct(Model model, HttpServletRequest request) {

        model.addAttribute("view", "/view/specialProduct/specialOrder.html");
        return "index.html";
    }

    @RequestMapping(value = {"/userList"})
    public String user(Model model, HttpServletRequest request) {

        model.addAttribute("view", "/view/user/userList.html");
        return "index.html";
    }

    @RequestMapping(value = {"/region"})
    public String area(Model model, HttpServletRequest request) {

        model.addAttribute("view", "/view/region/region.html");
        return "index.html";
    }

    @RequestMapping(value = {"/banner"})
    public String banner(Model model, HttpServletRequest request) {
        model.addAttribute("view", "/view/banner/banner.html");
        return "index.html";
    }

    @RequestMapping(value = {"/tag"})
    public String tag(Model model, HttpServletRequest request) {

        model.addAttribute("view", "/view/tag/tag.html");
        return "index.html";
    }

    @RequestMapping(value = {"/brand"})
    public String brand(Model model, HttpServletRequest request) {

        model.addAttribute("view", "/view/brand/brand.html");
        return "index.html";
    }

    @RequestMapping(value = {"/category"})
    public String category(Model model, HttpServletRequest request) {

        model.addAttribute("view", "/view/category/category.html");
        return "index.html";
    }

    @RequestMapping(value = {"/promoteProduct"})
    public String promoteProduct(Model model, HttpServletRequest request) {

        model.addAttribute("view", "/view/promoteProduct/promoteProduct.html");
        return "index.html";
    }

    @RequestMapping(value = {"/productProvider/{proId}"})
    public String productProvider(
            @PathVariable(name = "proId")int proId,
            Model model) {
        model.addAttribute("proId", proId);
        model.addAttribute("view", "/view/productProvider/productProvider.html");
        return "index.html";
    }


    @RequestMapping(value = {"/order", })
    public String order(Model model, HttpServletRequest request) {

        model.addAttribute("view", "/view/order/order.html");
        return "index.html";
    }


}
