package com.maya.academy.service;

import com.maya.academy.entity.Activity;
import com.maya.academy.repository.ActivityCrudRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ActivityService {

    @Autowired
    private ActivityCrudRepository repository;

    public List<Activity> getAll() {
        return (List<Activity>) repository.findAll();
    }

    public List<Activity> getByLessonId(int lessonId) {
        return repository.findActivityByLessonId(lessonId);
    }

    public Optional<Activity> findActivityByLessonIdAndFormId(int lessonId, int formId) {
        return repository.findActivityByLessonIdAndFormFormId(lessonId, formId);
    }

    public Optional<Activity> findActivityByLessonAndArticleId(int lessonId, int articleId) {
        return repository.findActivityByLessonIdAndArticleArticleId(lessonId, articleId);
    }
}
