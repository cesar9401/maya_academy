package com.maya.academy.service;

import com.maya.academy.entity.Form;
import com.maya.academy.repository.FormCrudRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;

@Service
public class FormService {

    @Autowired
    private FormCrudRepository repository;

    public List<Form> getAll() {
        return (List<Form>) repository.findAll();
    }

    public Form createForm(Form form, int userId) {
        if (form.getActivity() != null) {
            form.getActivity().setUserId(userId);
        }
        form.setCreationDate(LocalDate.now());

        if (form.getQuestions() != null) {
            form.getQuestions().forEach(q -> {
                q.setForm(form);
                if (q.getOptions() != null) {
                    q.getOptions().forEach(o -> {
                        o.setQuestion(q);
                    });
                }
            });
        }

        return repository.save(form);
    }
}
