package com.boaentrega.mic.security;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class CorsConfiguration implements WebMvcConfigurer {

    private static final String CORS_MAPPING = "/**";
    private static final String CORS_ORIGINS = "*";
    private static final String[] CORS_METHODS = new String[] { "POST", "PUT", "GET", "OPTIONS" };

    @Override
    public void addCorsMappings(CorsRegistry registry) {
        registry.addMapping(CORS_MAPPING).allowedOrigins(CORS_ORIGINS).allowedMethods(CORS_METHODS);
    }
}
