package com.example.munch.config.security.jwt;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Component;

@Component
public class AuthEntryPointJwt  {
//public class AuthEntryPointJwt implements AuthenticationEntryPoint {

    private static final Logger logger = LoggerFactory.getLogger(AuthEntryPointJwt.class);

//    @Override
//    public void commence(HttpServletRequest request, HttpServletResponse response,
//                         AuthenticationException authException) throws IOException {
//        logger.error("Unauthorized error: {}", authException.getMessage());
//        response.sendError(HttpServletResponse.SC_UNAUTHORIZED, "Error: Unauthorized");
//    }


//    @Override
//    public void commence(HttpServletRequest request, HttpServletResponse response,
//                         AuthenticationException authException) throws IOException, ServletException {
//
//        response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
//        response.setContentType(MediaType.APPLICATION_JSON_VALUE);
//
//        Exception exception = (Exception) request.getAttribute("exception");
//
//        String message;
//
//        if (exception != null) {
//
//            byte[] body = new ObjectMapper().writeValueAsBytes(Collections.singletonMap("cause", exception.toString()));
//
//            response.getOutputStream().write(body);
//
//        } else {
//
//            if (authException.getCause() != null) {
//                message = authException.getCause().toString() + " " + authException.getMessage();
//            } else {
//                message = authException.getMessage();
//            }
//
//            byte[] body = new ObjectMapper().writeValueAsBytes(Collections.singletonMap("error", "duuuuuuuuuuuuuuuupppppppppppaaaa"));
////            byte[] body = new ObjectMapper().writeValueAsBytes(Collections.singletonMap("error", message));
//
//            response.getOutputStream().write(body);
//        }
//    }
}
