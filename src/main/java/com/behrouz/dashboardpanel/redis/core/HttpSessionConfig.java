package com.behrouz.dashboardpanel.redis.core;

import io.lettuce.core.RedisClient;
import io.lettuce.core.api.StatefulRedisConnection;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.redis.connection.lettuce.LettuceConnectionFactory;
import org.springframework.session.data.redis.config.annotation.web.http.EnableRedisHttpSession;

/**
 * created by: Hapi
 * 13 July 2018
 **/

@Configuration
@EnableRedisHttpSession(redisNamespace = "behta-panel")
public class HttpSessionConfig {

    @Bean
    public LettuceConnectionFactory connectionFactory() {
        return new LettuceConnectionFactory();
    }

    @Bean
    public StatefulRedisConnection<String, String> redisConnection() {
        return  RedisClient.create("redis://localhost").connect();
    }
}
