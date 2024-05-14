package com.example.munch.config.security.service;

import com.example.munch.config.security.jwt.JwtService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class AuthenticationService {

    private final JwtService jwtService;

    public String refreshToken(String refreshToken) {
        String refreshedToken;
        String parsed = jwtService.parseJwt(refreshToken);
        String username = jwtService.extractUsername(parsed);
        refreshedToken = jwtService.refreshJwtToken(username);

        return refreshedToken;
    }
}
