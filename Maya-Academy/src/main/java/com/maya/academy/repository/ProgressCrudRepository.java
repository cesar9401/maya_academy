package com.maya.academy.repository;

import com.maya.academy.entity.Progress;
import org.springframework.data.repository.CrudRepository;

public interface ProgressCrudRepository extends CrudRepository<Progress, Integer> {
}
