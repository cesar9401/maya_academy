package com.maya.academy.controller;

import com.maya.academy.entity.Question;
import com.maya.academy.service.QuestionService;
import com.maya.academy.utils.JWTUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@CrossOrigin(origins = "http://localhost:4200", maxAge = 3600)
@RestController
@RequestMapping("/question")
public class QuestionController {

    @Autowired
    private JWTUtil jwt;

    @Autowired
    private QuestionService service;

    @PostMapping
    public ResponseEntity<List<Question>> createQuestion(@RequestHeader(value = "Authorization") String token, @RequestBody List<Question> questions) {
        if (jwt.tokenIsNotValidate(token)) {
            return new ResponseEntity<>(HttpStatus.FORBIDDEN);
        }
        List<Question> qs = service.createGroupOfQuestions(questions);
        return new ResponseEntity<>(qs, HttpStatus.CREATED);
    }

    @PutMapping
    public ResponseEntity<List<Question>> updateQuestions(@RequestHeader(value = "Authorization") String token, @RequestBody List<Question> questions) {
        if (jwt.tokenIsNotValidate(token)) {
            return new ResponseEntity<>(HttpStatus.FORBIDDEN);
        }
        List<Question> qs = service.createGroupOfQuestions(questions);
        return new ResponseEntity<>(qs, HttpStatus.OK);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Boolean> deleteQuestion(@RequestHeader(value = "Authorization") String token, @PathVariable int id) {
        if (jwt.tokenIsNotValidate(token)) {
            return new ResponseEntity<>(HttpStatus.FORBIDDEN);
        }
        boolean deleted = service.deleteQuestionById(id);
        HttpStatus status = deleted ? HttpStatus.OK : HttpStatus.NOT_FOUND;
        return new ResponseEntity<>(deleted, status);
    }
}
