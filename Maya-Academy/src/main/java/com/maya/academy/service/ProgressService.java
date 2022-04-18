package com.maya.academy.service;

import com.maya.academy.entity.Progress;
import com.maya.academy.repository.ProgressCrudRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ProgressService {

    @Autowired
    private ProgressCrudRepository repository;

    public List<Progress> getAll() {
        return (List<Progress>) repository.findAll();
    }

    public Progress createProgress(Progress progress) {
        return repository.save(progress);
    }
}
