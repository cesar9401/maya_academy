package com.maya.academy.service;

import com.maya.academy.entity.Lesson;
import com.maya.academy.repository.LessonCrudRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class LessonService {

    @Autowired
    private LessonCrudRepository repository;

    public List<Lesson> getAll() {
        return (List<Lesson>) repository.findAll();
    }

    public Lesson createLesson(Lesson lesson) {
        return repository.save(lesson);
    }

    public Lesson updateLesson(Lesson lesson) {
        return repository.save(lesson);
    }
}
