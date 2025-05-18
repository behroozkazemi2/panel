package com.behrouz.dashboardpanel.configuration;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class ImageConfiguration {

    @Value("${api.link.behta-thumbnail-url}")
    public String thumbnailUrl;

    @Bean("thumbnailUrl")
    public String image(){
        return thumbnailUrl;
    }


}
