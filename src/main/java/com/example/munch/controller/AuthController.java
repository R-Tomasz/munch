package com.example.munch.controller;

import com.example.munch.config.security.jwt.JwtService;
import com.example.munch.config.security.service.AuthenticationService;
import com.example.munch.config.security.service.UserDetailsImpl;
import com.example.munch.payload.request.LoginRequest;
import com.example.munch.payload.response.CheckResponse;
import com.example.munch.payload.response.JwtResponse;
import com.example.munch.payload.response.RefreshTokenResponse;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
public class AuthController {

    private final AuthenticationManager authenticationManager;
    private final JwtService jwtService;
    private final AuthenticationService authenticationService;

    @PostMapping("/perform_login")
    public ResponseEntity<JwtResponse> authenticateUser(@Valid @RequestBody LoginRequest loginRequest) {

        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(loginRequest.getUsername(), loginRequest.getPassword()));

        String token = jwtService.generateJwtToken(authentication);

        UserDetailsImpl userDetails = (UserDetailsImpl) authentication.getPrincipal();

        return ResponseEntity.ok(new JwtResponse(token, userDetails.getUsername()));
    }

    @GetMapping("/check")
    public ResponseEntity<CheckResponse> check(@RequestHeader(value = HttpHeaders.AUTHORIZATION) String token) {
        String parsedToken = jwtService.parseJwt(token);
        String username;
        try {
            jwtService.validateJwtToken(parsedToken);
            username = jwtService.extractUsername(parsedToken);
            return ResponseEntity.ok(new CheckResponse(parsedToken, username));
        } catch (IllegalArgumentException e) {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
    }

    @GetMapping("/refresh-token")
    public ResponseEntity<RefreshTokenResponse> refreshToken(@RequestHeader(value = HttpHeaders.AUTHORIZATION) String token) {
        String refreshedToken = authenticationService.refreshToken(token);
        return ResponseEntity.ok(new RefreshTokenResponse(refreshedToken));
    }
}