package com.maya.academy.controller;

import com.maya.academy.entity.Activity;
import com.maya.academy.service.ActivityService;
import com.maya.academy.utils.JWTUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
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
    public ResponseEntity<List<Activity>> getAll(@RequestHeader(value = "Authorization") String token) {
        if (jwt.tokenIsNotValidate(token)) {
            return new ResponseEntity<>(HttpStatus.FORBIDDEN);
        }

        return new ResponseEntity<>(service.getAll(), HttpStatus.CREATED);
    }

    @GetMapping("/lesson/{id}")
    public ResponseEntity<List<Activity>> getByLessonId(@RequestHeader(value = "Authorization") String token, @PathVariable int id) {
        if (jwt.tokenIsNotValidate(token)) {
            return new ResponseEntity<>(HttpStatus.FORBIDDEN);
        }

        List<Activity> activities = service.getByLessonId(id);
        return new ResponseEntity<>(activities, HttpStatus.OK);
    }

    @GetMapping("/lesson/{lessonId}/form/{formId}")
    public ResponseEntity<Activity> findByLessonIdAndFormId(@RequestHeader(value = "Authorization") String token, @PathVariable int lessonId, @PathVariable int formId) {
        if (jwt.tokenIsNotValidate(token)) {
            return new ResponseEntity<>(HttpStatus.FORBIDDEN);
        }
        return service.findActivityByLessonIdAndFormId(lessonId, formId)
                .map(a -> {
                    if (a.getUser() != null) {
                        a.getUser().setPassword(null);
                    }
                    return new ResponseEntity<>(a, HttpStatus.OK);
                })
                .orElse(new ResponseEntity<>(HttpStatus.NOT_FOUND));
    }

    @GetMapping("/lesson/{lessonId}/article/{articleId}")
    public ResponseEntity<Activity> findByLessonIdAndArticleId(@RequestHeader(value = "Authorization") String token, @PathVariable int lessonId, @PathVariable int articleId) {
        if (jwt.tokenIsNotValidate(token)) {
            return new ResponseEntity<>(HttpStatus.FORBIDDEN);
        }

        return service.findActivityByLessonAndArticleId(lessonId, articleId)
                .map(a -> {
                    if (a.getUser() != null) {
                        a.getUser().setPassword(null);
                    }
                    return new ResponseEntity<>(a, HttpStatus.OK);
                })
                .orElse(new ResponseEntity<>(HttpStatus.NOT_FOUND));
    }
}
