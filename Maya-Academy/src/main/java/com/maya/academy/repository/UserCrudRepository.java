package com.maya.academy.repository;

import com.maya.academy.entity.User;
import org.springframework.data.repository.CrudRepository;

import java.util.Optional;

public interface UserCrudRepository extends CrudRepository<User, Integer> {

    Optional<User> findByUsernameAndPassword(String username, String password);
}
