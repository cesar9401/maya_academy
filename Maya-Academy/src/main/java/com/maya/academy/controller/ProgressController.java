package com.maya.academy.controller;

import com.maya.academy.entity.Progress;
import com.maya.academy.service.ProgressService;
import com.maya.academy.utils.JWTUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@CrossOrigin(origins = "http://localhost:4200", maxAge = 3600)
@RestController
@RequestMapping("/progress")
public class ProgressController {

    @Autowired
    private JWTUtil jwt;

    @Autowired
    private ProgressService service;

    @PostMapping
    public ResponseEntity<Progress> createProgress(@RequestBody Progress progress) {
        return new ResponseEntity<>(service.createProgress(progress), HttpStatus.CREATED);
    }

    @GetMapping
    public ResponseEntity<List<Progress>> getAll() {
        return new ResponseEntity<>(service.getAll(), HttpStatus.OK);
    }
}
