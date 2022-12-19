package com.example.demo.security;

import java.io.IOException;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpFilter;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.util.StringUtils;

public class ExampleServletFilter extends HttpFilter {

  private TokenProvider tokenProvider;

  @Override
  protected void doFilter(HttpServletRequest request,
      HttpServletResponse response,
      FilterChain filterChain) throws IOException, ServletException {
    try {
      final String token = parseBearerToken(request);

      if (token != null && !token.equalsIgnoreCase("null")) {
        String userId = tokenProvider.validateAndGetuserId(token);
        filterChain.doFilter(request, response);
      }

    } catch (Exception e) {
      // TODO: handle exception
      response.setStatus(HttpServletResponse.SC_FORBIDDEN);
    }

  }

  private String parseBearerToken(HttpServletRequest request) {
    String bearerToken = request.getHeader("Authorization");
    if (StringUtils.hasText(bearerToken) && bearerToken.startsWith("Bearer")) {
      return bearerToken.substring(7);
    }
    return null;
  }
}
