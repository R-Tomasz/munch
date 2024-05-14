package com.example.munch.payload.request;

import jakarta.validation.constraints.NotBlank;
import lombok.Getter;

public class LoginRequest {

    @NotBlank
    @Getter
    private String username;

    @NotBlank
    @Getter
    private String password;
}