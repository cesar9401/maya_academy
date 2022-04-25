package com.maya.academy.repository;

import com.maya.academy.entity.Progress;
import org.springframework.data.repository.CrudRepository;

import java.util.Optional;

public interface ProgressCrudRepository extends CrudRepository<Progress, Integer> {

    Optional<Progress> findProgressByUserIdAndFormIdAndCompleteTrue(int userId, int formId);

    Optional<Progress> findFirstByUserIdAndFormIdAndCompleteTrue(int userId, int formId);
}
