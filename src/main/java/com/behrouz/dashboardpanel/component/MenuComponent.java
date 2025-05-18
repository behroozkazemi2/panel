package com.behrouz.dashboardpanel.component;

import com.behrouz.dashboardpanel.component.model.MenuStructure;
import com.behrouz.dashboardpanel.security.model.SessionHolder;
import org.springframework.context.annotation.Bean;
import org.springframework.stereotype.Component;

import java.util.Arrays;
import java.util.Comparator;
import java.util.List;
import java.util.stream.Collectors;

/**
 * Created by Hapi
 * 31 October 2019 12:03
 **/
@Component
public class MenuComponent {



    @Bean(name = "menuService")
    protected MenuService getList() {
        return () -> getMenus(SessionHolder.isSuperVisor());
    }




    private List<MenuStructure> getMenus(boolean isSuperVisor) {

        List<MenuStructure> menus = loadAllMenu();

        menus =
                menus
                        .stream()
                        .filter(
                                f -> isSuperVisor || !f.isAccessSuperVisor()
                        ).sorted(
                                Comparator.comparingDouble(MenuStructure::getOrder)
                        ).collect(Collectors.toList());

        return menus;
    }

    private List<MenuStructure> loadAllMenu() {
        return Arrays.asList(
                new MenuStructure(
                        "تامین کننده ",
                        "/admin/provider",
                        0,
                        true,
                        "flaticon2-user-outline-symbol",
                        false
                )
                , new MenuStructure(
                        "محصولات",
                        "/admin/product/0",
                        1,
                        true,
                        "flaticon2-shopping-cart-1",
                        false
                )
                , new MenuStructure(
                        "سفارشات",
                        "/admin/order",
                        2,
                        true,
                        "flaticon-clipboard",
                        false
                )

                ,new MenuStructure(
                        "تگ ها",
                        "/admin/tag",
                        3,
                        true,
                        "flaticon-price-tag",
                        true
                )
                ,new MenuStructure(
                        "برندها",
                        "/admin/brand",
                        4,
                        true,
                        "flaticon-price-tag",
                        true
                )
                ,new MenuStructure(
                        "دسته بندی ها",
                        "/admin/category",
                        5,
                        true,
                        "flaticon-exclamation-2",
                        true

                )
                ,new MenuStructure(
                        " محصولات تامین کننده",
                        "/admin/productProvider/0",
                        6,
                        true,
                        "flaticon-exclamation-2",
                        true
                )   ,new MenuStructure(
                        "رویداد‌ها",
                        "/admin/promoteProduct",
                        7,
                        true,
                        "flaticon-exclamation-2",
                        true
                ) ,new MenuStructure(
                        "تیکت",
                        "/admin/ticket",
                        7,
                        true,
                        "flaticon-exclamation-2",
                        true
                ),new MenuStructure(
                        "کامنت",
                        "/admin/comment",
                        7.5f,
                        true,
                        "flaticon-exclamation-2",
                        true
                )
                ,new MenuStructure(
                        "کاربران",
                        "/admin/userList",
                        8,
                        true,
                        "flaticon-users-1",
                        true
                )

                ,new MenuStructure(
                        "اطلاعات من  ",
                        "/admin/profile",
                        9,
                        true,
                        "flaticon-profile-1",
                        false
                )
                ,new MenuStructure(
                        "محدوده",
                        "/admin/region",
                        10,
                        true,
                        "flaticon2-map",
                        true
                ),new MenuStructure(
                        "بنر",
                        "/admin/banner",
                        7,
                        true,
                        "flaticon2-map",
                        true
                )
        );
    }


    public interface MenuService {
        List<MenuStructure> getMenu();
    }
}
