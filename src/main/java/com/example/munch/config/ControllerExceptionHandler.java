package com.example.munch.config;

import io.jsonwebtoken.ExpiredJwtException;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.servlet.mvc.method.annotation.ResponseEntityExceptionHandler;

@ControllerAdvice
public class ControllerExceptionHandler extends ResponseEntityExceptionHandler {

    @ExceptionHandler({ExpiredJwtException.class})
    public ResponseEntity<Object> handleTokenExpired(Exception ex, HttpServletRequest request) {
        return new ResponseEntity<>("Token dupdaudpadupada", HttpStatus.UNAUTHORIZED);
    }

}
