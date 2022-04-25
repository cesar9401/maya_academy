package com.maya.academy.controller;

import com.maya.academy.entity.User;
import com.maya.academy.service.AuthService;
import com.maya.academy.utils.JWTUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.HashMap;

@CrossOrigin(origins = "http://localhost:4200", maxAge = 3600)
@RestController
@RequestMapping("/auth")
public class AuthController {

    @Autowired
    private AuthService service;

    @Autowired
    private JWTUtil jwt;

    @PostMapping("/login")
    public ResponseEntity<HashMap<String, String>> login(@RequestBody User user) {
        return service.getUserByUsernameAndPassword(user)
                .map(u -> {
                    String token = jwt.create(String.valueOf(u.getUserId()), u.getUsername());
                    HashMap<String, String> map = new HashMap<>();
                    map.put("Authorization", token);
                    return new ResponseEntity<>(map, HttpStatus.OK);
                })
                .orElse(new ResponseEntity<>(HttpStatus.FORBIDDEN));
    }
}
