package com.maya.academy.controller;

import com.maya.academy.entity.Lesson;
import com.maya.academy.service.LessonService;
import com.maya.academy.utils.JWTUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@CrossOrigin(origins = "http://localhost:4200", maxAge = 3600)
@RestController
@RequestMapping("/lesson")
public class LessonController {

    @Autowired
    private JWTUtil jwt;

    @Autowired
    private LessonService service;

    @PostMapping
    public ResponseEntity<Lesson> addLesson(@RequestHeader(value = "Authorization", required = false) String token, @RequestBody Lesson lesson) {
        Lesson l = service.createLesson(lesson);
        return new ResponseEntity<>(l, HttpStatus.CREATED);
    }

    @GetMapping
    public ResponseEntity<List<Lesson>> getAll(@RequestHeader(value = "Authorization", required = false) String token) {
        List<Lesson> lessons = service.getAll();
        return new ResponseEntity<>(lessons, HttpStatus.OK);
    }

    @PutMapping
    public ResponseEntity<Lesson> updateLesson(@RequestHeader(value = "Authorization", required = false) String token, @RequestBody Lesson lesson) {
        Lesson l = service.updateLesson(lesson);
        return new ResponseEntity<>(l, HttpStatus.OK);
    }
}
