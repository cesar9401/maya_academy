package com.maya.academy.service;

import com.maya.academy.entity.Activity;
import com.maya.academy.repository.ActivityCrudRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class ActivityService {

    @Autowired
    private ActivityCrudRepository respository;

    public Activity createActivity(Activity activity) {
        return respository.save(activity);
    }
}
