package com.maya.academy.service;

import com.maya.academy.entity.Question;
import com.maya.academy.repository.QuestionCrudRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

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

    public List<Question> createGroupOfQuestions(List<Question> questions) {
        questions.forEach(q -> {
            if (q.getOptions() != null) {
                q.getOptions().forEach(o -> {
                    o.setQuestion(q);
                });
            }
        });

        return (List<Question>) repository.saveAll(questions);
    }

    public boolean deleteQuestionById(int questionId) {
        return repository.findById(questionId).map(q -> {
            repository.delete(q);
            return true;
        }).orElse(false);
    }

    public Optional<Question> getQuestionById(int questionId) {
        return repository.findById(questionId);
    }
}
