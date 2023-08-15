package com.example.munch.config.security.service;

import com.example.munch.repository.TokenRepository;
import com.example.munch.config.security.jwt.JwtService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class AuthenticationService {

    private final TokenRepository tokenRepository;
    private final JwtService jwtService;

    public String refreshToken(String refreshToken) {
        String refreshedToken = null;
//        Token token = tokenRepository.findByToken(refreshToken)
//                .orElse(null);

//        if (token != null) {
        String parsed = jwtService.parseJwt(refreshToken);
            String username = jwtService.extractUsername(parsed);
            refreshedToken = jwtService.refreshJwtToken(username);
//        }

        return refreshedToken;
    }
}
