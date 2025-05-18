package com.behrouz.dashboardpanel;

import com.behrouz.dashboardpanel.okhttp.base.Links;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class DashboardPanelApplication {

    public static void main(String[] args) {
        SpringApplication.run(DashboardPanelApplication.class, args);


        System.out.printf(
                "\n\n\t\t******************************************************************\n" +
                        "\t\t*** Server:    %30s    *****************\n" +
                        "\t\t******************************************************************\n\n\n",
                Links.XIMA_SERVER
        );
    }


    //<editor-fold desc="Links">
    @Value("${api.link.behta-server}")
    public void setUserAccountLink(String value){
        Links.XIMA_SERVER = value;
    }


    //</editor-fold>


}
