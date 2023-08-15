package com.example.munch.payload.request;

import lombok.Getter;

public record RefreshTokenRequest(@Getter String refreshToken) {
}
