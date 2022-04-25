package com.maya.academy.service;

import com.maya.academy.entity.User;
import com.maya.academy.repository.UserCrudRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class AuthService {

    @Autowired
    private UserCrudRepository repository;

    public Optional<User> getUserByUsernameAndPassword(User user) {
        return repository.findByUsernameAndPassword(user.getUsername(), user.getPassword());
    }
}
