package com.maya.academy.repository;

import com.maya.academy.entity.Question;
import org.springframework.data.repository.CrudRepository;

public interface QuestionCrudRepository extends CrudRepository<Question, Integer> {
}
