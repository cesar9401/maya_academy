package com.maya.academy.controller;

import com.maya.academy.entity.Form;
import com.maya.academy.service.FormService;
import com.maya.academy.utils.JWTUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@CrossOrigin(origins = "http://localhost:4200", maxAge = 3600)
@RestController
@RequestMapping("/form")
public class FormController {

    @Autowired
    private JWTUtil jwt;

    @Autowired
    private FormService service;

    @GetMapping
    public ResponseEntity<List<Form>> getAll(@RequestHeader(value = "Authorization") String token) {
        if (jwt.tokenIsNotValidate(token)) {
            return new ResponseEntity<>(HttpStatus.FORBIDDEN);
        }
        List<Form> forms = service.getAll();
        return new ResponseEntity<>(forms, HttpStatus.OK);
    }

    @PostMapping
    public ResponseEntity<Form> createForm(@RequestHeader(value = "Authorization") String token, @RequestBody Form form) {
        if (jwt.tokenIsNotValidate(token)) {
            return new ResponseEntity<>(HttpStatus.FORBIDDEN);
        }
        Form f = service.createForm(form);
        return new ResponseEntity<>(f, HttpStatus.CREATED);
    }
}
