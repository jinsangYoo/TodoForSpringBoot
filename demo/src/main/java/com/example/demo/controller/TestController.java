package com.example.demo.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("test")
public class TestController {
  @GetMapping
  public String testController() {
    // TODO Auto-generated method stub
    return "Hello World!";
  }
  
  @GetMapping("/testGetMapping")
  public String testControllerWithPath() {
    return "Hello Wrold! testGetMapping";
  }
  
  @GetMapping("/{id}")
  public String testControllerWithPathVariables(@PathVariable(required = false) int id) {
    return "Hello World! ID " + id;
  }
}
