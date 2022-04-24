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
        List<Activity> activities = (List<Activity>) repository.findAll();
        activities.forEach(a -> {
            if (a.getUser() != null) {
                a.getUser().setPassword(null);
            }
        });
        return activities;
    }

    public List<Activity> getByLessonId(int lessonId) {
        List<Activity> activities = repository.findActivityByLessonId(lessonId);
        activities.forEach(a -> {
            if (a.getUser() != null) {
                a.getUser().setPassword(null);
            }
        });
        return activities;
    }

    public Optional<Activity> findActivityByLessonIdAndFormId(int lessonId, int formId) {
        return repository.findActivityByLessonIdAndFormFormId(lessonId, formId);
    }

    public Optional<Activity> findActivityByLessonAndArticleId(int lessonId, int articleId) {
        return repository.findActivityByLessonIdAndArticleArticleId(lessonId, articleId);
    }
}
