package com.maya.academy.repository;

import com.maya.academy.entity.Lesson;
import org.springframework.data.repository.CrudRepository;

public interface LessonCrudRepository extends CrudRepository<Lesson, Integer> {
}
