package com.maya.academy.service;

import com.maya.academy.entity.Activity;
import com.maya.academy.repository.ActivityCrudRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ActivityService {

    @Autowired
    private ActivityCrudRepository repository;

    public List<Activity> getAll() {
        return (List<Activity>) repository.findAll();
    }
}
