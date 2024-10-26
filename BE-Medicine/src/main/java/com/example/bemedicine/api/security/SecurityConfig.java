package com.example.bemedicine.api.security;

//import org.springframework.context.annotation.Bean;
//import org.springframework.context.annotation.Configuration;
//import org.springframework.security.config.annotation.web.builders.HttpSecurity;
//import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
//import org.springframework.security.config.annotation.web.configurers.FormLoginConfigurer;
//import org.springframework.security.web.SecurityFilterChain;
//import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
//import org.springframework.security.crypto.password.PasswordEncoder;


import com.fasterxml.jackson.databind.DeserializationFeature;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.SerializationFeature;
import org.springframework.context.annotation.Bean;

public class SecurityConfig {

//    @Bean
//    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
//        FormLoginConfigurer<HttpSecurity> httpSecurityFormLoginConfigurer = http
//                .csrf().disable() // Vô hiệu hóa CSRF nếu không cần
//                .authorizeRequests()
//                .requestMatchers("/api/users/**").permitAll() // Cho phép truy cập không cần xác thực cho tất cả các API người dùng
//                .anyRequest().authenticated() // Tất cả các yêu cầu khác cần xác thực
//                .and()
//                .formLogin() // Cấu hình trang đăng nhập
//                .loginPage("/login")
//                .permitAll();// Cho phép tất cả người dùng truy cập trang đăng nhập
//        return http.build();
//    }
//
//    @Bean
//    public PasswordEncoder passwordEncoder() {
//        return new BCryptPasswordEncoder(); // Đăng ký PasswordEncoder
//    }
    @Bean
    public ObjectMapper objectMapper() {
        ObjectMapper objectMapper = new ObjectMapper();
        objectMapper.configure(SerializationFeature.FAIL_ON_EMPTY_BEANS, false);
        objectMapper.configure(DeserializationFeature.FAIL_ON_UNKNOWN_PROPERTIES, false);
        objectMapper.enable(SerializationFeature.INDENT_OUTPUT);
        return objectMapper;
    }
}

