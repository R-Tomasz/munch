package com.example.munch.controller;

import com.example.munch.enums.ERole;
import com.example.munch.model.Role;
import com.example.munch.model.User;
import com.example.munch.payload.request.LoginRequest;
import com.example.munch.payload.request.RegisterRequest;
import com.example.munch.payload.response.CheckResponse;
import com.example.munch.payload.response.JwtResponse;
import com.example.munch.payload.response.MessageResponse;
import com.example.munch.payload.response.RefreshTokenResponse;
import com.example.munch.repository.RoleRepository;
import com.example.munch.repository.UserRepository;
import com.example.munch.config.security.jwt.JwtService;
import com.example.munch.config.security.service.AuthenticationService;
import com.example.munch.config.security.service.UserDetailsImpl;
import io.jsonwebtoken.ExpiredJwtException;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.Collections;

@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
public class AuthController {

    private final AuthenticationManager authenticationManager;
    private final UserRepository userRepository;
    private final JwtService jwtService;
    private final PasswordEncoder encoder;
    private final RoleRepository roleRepository;
    private final AuthenticationService authenticationService;

    @PostMapping("/perform_login")
    public ResponseEntity<JwtResponse> authenticateUser(@Valid @RequestBody LoginRequest loginRequest) {

        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(loginRequest.getUsername(), loginRequest.getPassword()));

        SecurityContextHolder.getContext().setAuthentication(authentication);
        String token = jwtService.generateJwtToken(authentication);

        UserDetailsImpl userDetails = (UserDetailsImpl) authentication.getPrincipal();

        return ResponseEntity.ok(new JwtResponse(token, userDetails.getUsername()));
    }

    @GetMapping("/register")
    public ResponseEntity<?> registerUser(@Valid @RequestBody RegisterRequest registerRequest) {
        if (Boolean.TRUE.equals(userRepository.existsByUsername(registerRequest.getUsername()))) {
            return ResponseEntity
                    .badRequest()
                    .body(new MessageResponse("Error: Username is already taken!"));
        }

        if (Boolean.TRUE.equals(userRepository.existsByEmail(registerRequest.getEmail()))) {
            return ResponseEntity
                    .badRequest()
                    .body(new MessageResponse("Error: Email is already in use!"));
        }

        User user = new User(registerRequest.getUsername(),
                registerRequest.getEmail(),
                encoder.encode(registerRequest.getPassword()));

        Role userRole = roleRepository.findByName(ERole.USER.name())
                .orElseThrow(() -> new RuntimeException("Error: Role is not found."));

        user.setRoles(Collections.singletonList(userRole));
        userRepository.save(user);

        return ResponseEntity.ok(new MessageResponse("User registered successfully!"));
    }

    @GetMapping("/check")
    public ResponseEntity<CheckResponse> check(@RequestHeader(value = HttpHeaders.AUTHORIZATION) String token) {
        String parsedToken = jwtService.parseJwt(token);
        String username;
        try {
            jwtService.validateJwtToken(parsedToken);
            username = jwtService.extractUsername(parsedToken);
            return ResponseEntity.ok(new CheckResponse(parsedToken, username));
//        }  catch (ExpiredJwtException e) {
//            return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
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