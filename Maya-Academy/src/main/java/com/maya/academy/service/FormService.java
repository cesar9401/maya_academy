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
        form.getActivity().setUserId(userId);
        form.setCreationDate(LocalDate.now());
        return repository.save(form);
    }
}
