package com.maya.academy.service;

import com.maya.academy.entity.User;
import com.maya.academy.repository.UserCrudRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class UserService {

    @Autowired
    private UserCrudRepository repository;

    public Optional<User> getById(int id) {
        return repository.findById(id);
    }

    public User createUser(User user) {
        return repository.save(user);
    }

    public User updateUser(User user) {
        return repository.save(user);
    }

    public boolean deleteUserById(int id) {
        return repository.findById(id).map(u -> {
            repository.deleteById(id);
            return true;
        }).orElse(false);
    }
}
