package com.maya.academy.repository;

import com.maya.academy.entity.Activity;
import org.springframework.data.repository.CrudRepository;

import java.util.List;

public interface ActivityCrudRepository extends CrudRepository<Activity, Integer> {

    List<Activity> findActivityByLessonId(int lessonId);
}
