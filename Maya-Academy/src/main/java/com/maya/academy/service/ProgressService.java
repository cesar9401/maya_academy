package com.maya.academy.service;

import com.maya.academy.entity.Progress;
import com.maya.academy.repository.FormCrudRepository;
import com.maya.academy.repository.ProgressCrudRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ProgressService {

    @Autowired
    private ProgressCrudRepository repository;

    @Autowired
    private FormCrudRepository formCrudRepository;

    public List<Progress> getAll() {
        return (List<Progress>) repository.findAll();
    }

    public Progress createProgress(Progress progress, int userId) {
        formCrudRepository.findById(progress.getFormId()).ifPresent(f -> {
            boolean complete = progress.getScore() >= f.getMinimumCorrects();
            progress.setComplete(complete);
        });

        progress.setUserId(userId);
        return repository.save(progress);
    }

    public Optional<Progress> getByUserIdAndFormId(int userId, int formId) {
        return repository.findFirstByUserIdAndFormIdAndCompleteTrue(userId, formId);
    }
}
