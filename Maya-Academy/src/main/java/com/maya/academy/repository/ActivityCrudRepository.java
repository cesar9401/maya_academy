package com.maya.academy.repository;

import com.maya.academy.entity.Activity;
import com.maya.academy.entity.Form;
import org.springframework.data.repository.CrudRepository;

import java.util.List;
import java.util.Optional;

public interface ActivityCrudRepository extends CrudRepository<Activity, Integer> {

    List<Activity> findActivityByLessonId(int lessonId);

    Optional<Activity> findActivityByLessonIdAndFormFormId(int lessonId, int formId);

    Optional<Activity> findActivityByLessonIdAndArticleArticleId(int lessonId, int articleId);
}
