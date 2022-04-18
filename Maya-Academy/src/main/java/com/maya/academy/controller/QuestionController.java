package com.maya.academy.controller;

import com.maya.academy.entity.Question;
import com.maya.academy.service.QuestionService;
import com.maya.academy.utils.JWTUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@CrossOrigin(origins = "http://localhost:4200", maxAge = 3600)
@RestController
@RequestMapping("/question")
public class QuestionController {

    @Autowired
    private JWTUtil jwt;

    @Autowired
    private QuestionService service;

    @PostMapping
    public ResponseEntity<Question> createQuestion(@RequestHeader(value="Authorization", required = false) String token, @RequestBody Question question) {
        return new ResponseEntity<>(service.createQuestion(question), HttpStatus.CREATED);
    }
}
