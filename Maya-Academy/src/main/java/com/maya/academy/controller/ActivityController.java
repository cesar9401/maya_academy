package com.maya.academy.controller;

import com.maya.academy.entity.Activity;
import com.maya.academy.service.ActivityService;
import com.maya.academy.utils.JWTUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@CrossOrigin(origins = "http://localhost:4200", maxAge = 3600)
@RestController
@RequestMapping("/activity")
public class ActivityController {

    @Autowired
    private JWTUtil jwt;

    @Autowired
    private ActivityService service;

    @GetMapping
    public ResponseEntity<List<Activity>> getAll(@RequestHeader(value="Authorization", required = false) String token) {
        return new ResponseEntity<>(service.getAll(), HttpStatus.CREATED);
    }
}
