package com.example.munch.payload.response;

import lombok.Getter;

public record CheckResponse(@Getter String token, @Getter String username) {

}
