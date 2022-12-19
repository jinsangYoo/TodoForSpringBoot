package com.example.demo.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.dto.ResponseDTO;
import com.example.demo.dto.UserDTO;
import com.example.demo.model.UserEntity;
import com.example.demo.security.TokenProvider;
import com.example.demo.service.UserService;

import lombok.extern.slf4j.Slf4j;

@Slf4j
@RestController
@RequestMapping("/auth")
public class UserController {
  @Autowired
  private UserService userSerivce;
  
  @Autowired
  private TokenProvider tokenProvider;

  @PostMapping("/signup")
  public ResponseEntity<?> registerUser(@RequestBody UserDTO userDTO) {
    try {
      if (userDTO == null || userDTO.getPassword() == null) {
        throw new RuntimeException("Invalid Password value.");
      }
      UserEntity user = UserEntity.builder()
          .username(userDTO.getUsername())
          .password(userDTO.getPassword())
          .build();
      UserEntity registerUser = userSerivce.create(user);
      UserDTO responseUserDTO = UserDTO.builder()
          .id(registerUser.getId())
          .username(registerUser.getUsername())
          .build();

      return ResponseEntity.ok().body(responseUserDTO);
    } catch (Exception e) {
      // TODO: handle exception
      ResponseDTO responseDTO = ResponseDTO.builder().error(e.getMessage())
          .build();
      return ResponseEntity.badRequest().body(responseDTO);
    }
  }

  @PostMapping("/signin")
  public ResponseEntity<?> authenticate(@RequestBody UserDTO userDTO) {
    UserEntity user = userSerivce.getByCredentials(userDTO.getUsername(),
        userDTO.getPassword());

    if (user != null) {
      final String token = tokenProvider.create(user);
      final UserDTO responseUserDTO = UserDTO.builder()
          .username(user.getUsername())
          .id(user.getId())
          .token(token)
          .build();
      return ResponseEntity.ok().body(responseUserDTO);
    } else {
      ResponseDTO responseDTO = ResponseDTO.builder()
          .error("Login failed.").build();
      return ResponseEntity.badRequest().body(responseDTO);
    }
  }
}
