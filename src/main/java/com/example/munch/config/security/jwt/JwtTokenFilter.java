package com.example.munch.config.security.jwt;

import com.example.munch.config.security.service.UserDetailsServiceImpl;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;
import java.util.Set;

@Component
@RequiredArgsConstructor
public class JwtTokenFilter extends OncePerRequestFilter {

    private static final Set<String> IGNORE_FILTER_PATHS = Set.of("/api/auth/check", "/api/auth/refresh-token", "/ws/info"); //todo ten ws to najlepiej tymczasowy
    private static final Set<String> URI_LOGIN_REGISTER = Set.of("/api/auth/register", "/api/auth/perform_login");
    private final JwtService jwtService;
    private final UserDetailsServiceImpl userDetailsService;

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain) throws ServletException, IOException {
//        try {
            String jwt = jwtService.parseJwt(request);
            if (!URI_LOGIN_REGISTER.contains(request.getRequestURI()) && jwtService.validateJwtToken(jwt)) {

//        jwtService.validateJwtToken(jwt);
//            if (jwt != null && !"null".equals(jwt) && jwtService.validateJwtToken(jwt)) {
                String username = jwtService.getUserNameFromJwtToken(jwt);

                UserDetails userDetails = userDetailsService.loadUserByUsername(username);
                UsernamePasswordAuthenticationToken authentication = new UsernamePasswordAuthenticationToken(userDetails, null,
                        userDetails.getAuthorities());
                authentication.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));

                SecurityContextHolder.getContext().setAuthentication(authentication);
            }

//        } catch (ExpiredJwtException e) {
//            throw e;
//        } catch (Exception e) {
//            logger.error("Cannot set user authentication: {}", e);
//        }

        filterChain.doFilter(request, response);
    }

    @Override
    protected boolean shouldNotFilter(HttpServletRequest request) {
        return IGNORE_FILTER_PATHS.contains(request.getRequestURI());
    }
}
