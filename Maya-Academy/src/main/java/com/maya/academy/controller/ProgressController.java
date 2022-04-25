package com.maya.academy.controller;

import com.maya.academy.entity.Progress;
import com.maya.academy.service.ProgressService;
import com.maya.academy.utils.JWTUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
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
    public ResponseEntity<Progress> createProgress(@RequestHeader(value = "Authorization") String token, @RequestBody Progress progress) {
        if (jwt.tokenIsNotValidate(token)) {
            return new ResponseEntity<>(HttpStatus.FORBIDDEN);
        }
        int userId = Integer.parseInt(jwt.getKey(token));
        return new ResponseEntity<>(service.createProgress(progress, userId), HttpStatus.CREATED);
    }

    @GetMapping
    public ResponseEntity<List<Progress>> getAll(@RequestHeader(value = "Authorization") String token) {
        if (jwt.tokenIsNotValidate(token)) {
            return new ResponseEntity<>(HttpStatus.FORBIDDEN);
        }
        return new ResponseEntity<>(service.getAll(), HttpStatus.OK);
    }

    @GetMapping("/form/{formId}")
    public ResponseEntity<Boolean> getByFormIdAndUser(@RequestHeader(value = "Authorization") String token, @PathVariable int formId) {
        if (jwt.tokenIsNotValidate(token)) {
            return new ResponseEntity<>(HttpStatus.FORBIDDEN);
        }

        int userId = Integer.parseInt(jwt.getKey(token));
        return service.getByUserIdAndFormId(userId, formId)
                .map(p -> new ResponseEntity<>(true, HttpStatus.OK))
                .orElse(new ResponseEntity<>(false, HttpStatus.OK));
    }
}
