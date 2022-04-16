package com.maya.academy.controller;

import com.maya.academy.entity.Lesson;
import com.maya.academy.service.LessonService;
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
@RequestMapping("/lesson")
public class LessonController {

    @Autowired
    private JWTUtil jwt;

    @Autowired
    private LessonService service;

    @PostMapping()
    public ResponseEntity<Lesson> addLesson(@RequestHeader(value="Authorization", required = false) String token, @RequestBody Lesson lesson) {
        Lesson l = service.createLesson(lesson);
        return new ResponseEntity<>(l, HttpStatus.CREATED);
    }
}
