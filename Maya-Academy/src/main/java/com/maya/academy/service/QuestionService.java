package com.maya.academy.service;

import com.maya.academy.entity.Question;
import com.maya.academy.repository.FormCrudRepository;
import com.maya.academy.repository.QuestionCrudRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class QuestionService {

    @Autowired
    private QuestionCrudRepository repository;

    @Autowired
    private FormCrudRepository formCrudRepository;

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

            /* actualizar informacion de formulario aqui */
            if (q.getForm() != null) {
                int formId = q.getForm().getFormId();
                formCrudRepository.findById(formId).ifPresent(f -> {
                    f.setTotal(f.getTotal() - q.getScore());
                    f.setMinimumCorrects((int) Math.floor(f.getTotal() * 0.7));
                    formCrudRepository.save(f);
                });
            }

            return true;
        }).orElse(false);
    }

    public Optional<Question> getQuestionById(int questionId) {
        return repository.findById(questionId);
    }
}
