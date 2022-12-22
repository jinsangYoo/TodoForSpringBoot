package com.example.demo.security;

import java.time.Instant;
import java.time.temporal.ChronoUnit;
import java.util.Date;

import org.springframework.stereotype.Service;

import com.example.demo.model.UserEntity;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@Service
public class TokenProvider {
  private static final String SECRET_KEY = "Flrsdfergeqrgqergwesdfagregergergergaergergergrewd3rgq4thrtgerfq3g4thgq45erg";

  public String create(UserEntity userEntity) {
    Date expireDate = Date.from(Instant.now().plus(1, ChronoUnit.DAYS));
    return Jwts.builder()
        .signWith(SignatureAlgorithm.HS256, SECRET_KEY)
        .setSubject(userEntity.getId())
        .setIssuer("demo app")
        .setIssuedAt(new Date())
        .setExpiration(expireDate)
        .compact();
  }
  
  public String validateAndGetuserId(String token) {
    Claims claims = Jwts.parser()
        .setSigningKey(SECRET_KEY)
        .parseClaimsJws(token)
        .getBody();
    
    return claims.getSubject();
  }
}
