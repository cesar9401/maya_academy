package com.maya.academy.service;

import com.maya.academy.entity.Question;
import com.maya.academy.repository.QuestionCrudRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class QuestionService {

    @Autowired
    private QuestionCrudRepository repository;

    public List<Question> getAll() {
        return (List<Question>) repository.findAll();
    }

    public Question createQuestion(Question question) {
        if (question.getOptions() != null) {
            question.getOptions().forEach(o -> o.setQuestion(question));
        }
        return repository.save(question);
    }
}
