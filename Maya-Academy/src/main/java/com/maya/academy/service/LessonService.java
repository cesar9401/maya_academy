package com.maya.academy.service;

import com.maya.academy.entity.Lesson;
import com.maya.academy.repository.LessonCrudRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class LessonService {

    @Autowired
    private LessonCrudRepository repository;

    public Lesson createLesson(Lesson lesson) {
        return repository.save(lesson);
    }
}
