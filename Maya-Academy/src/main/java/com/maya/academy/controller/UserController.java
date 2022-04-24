package com.maya.academy.controller;

import com.maya.academy.entity.User;
import com.maya.academy.service.UserService;
import com.maya.academy.utils.JWTUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@CrossOrigin(origins = "http://localhost:4200", maxAge = 3600)
@RestController
@RequestMapping("/user")
public class UserController {

    @Autowired
    private UserService service;

    @Autowired
    private JWTUtil jwt;

    @GetMapping()
    public ResponseEntity<User> getUserById(@RequestHeader(value = "Authorization") String token) {
        if (jwt.tokenIsNotValidate(token)) {
            return new ResponseEntity<>(HttpStatus.FORBIDDEN);
        }

        int userId = Integer.parseInt(jwt.getKey(token));
        return service.getById(userId)
                .map(u -> {
                    u.setPassword(null);
                    return new ResponseEntity<>(u, HttpStatus.OK);
                })
                .orElse(new ResponseEntity<>(HttpStatus.FORBIDDEN));
    }

    @PostMapping
    public ResponseEntity<User> addUser(@RequestBody User user) {
        User u = service.createUser(user);
        return new ResponseEntity<>(u, HttpStatus.CREATED);
    }

    @PutMapping
    public ResponseEntity<User> updateUser(@RequestHeader(value = "Authorization") String token, @RequestBody User user) {
        if (jwt.tokenIsNotValidate(token)) {
            return new ResponseEntity<>(HttpStatus.FORBIDDEN);
        }

        if (user.getUserId() == null) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }

        if (jwt.tokenIsNotCorrect(token, user.getUserId())) {
            return new ResponseEntity<>(HttpStatus.FORBIDDEN);
        }

        User u = service.updateUser(user);
        return new ResponseEntity<>(u, HttpStatus.OK);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Boolean> deleteUser(@RequestHeader(value = "Authorization") String token, @PathVariable int id) {
        if (jwt.tokenIsNotValidate(token) || jwt.tokenIsNotCorrect(token, id)) {
            return new ResponseEntity<>(HttpStatus.FORBIDDEN);
        }

        boolean isDeleted = service.deleteUserById(id);
        if (isDeleted) {
            return new ResponseEntity<>(isDeleted, HttpStatus.OK);
        }

        return new ResponseEntity<>(isDeleted, HttpStatus.NOT_FOUND);
    }
}
