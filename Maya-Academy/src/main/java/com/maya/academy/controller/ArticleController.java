package com.maya.academy.controller;

import com.maya.academy.entity.Article;
import com.maya.academy.service.ArticleService;
import com.maya.academy.utils.JWTUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@CrossOrigin(origins = "http://localhost:4200", maxAge = 3600)
@RestController
@RequestMapping("/article")
public class ArticleController {

    @Autowired
    private JWTUtil jwt;

    @Autowired
    private ArticleService service;

    @GetMapping
    private ResponseEntity<List<Article>> getAll(@RequestHeader(value = "Authorization") String token) {
        if (jwt.tokenIsNotValidate(token)) {
            return new ResponseEntity<>(HttpStatus.FORBIDDEN);
        }

        List<Article> articles = service.getAll();
        return new ResponseEntity<>(articles, HttpStatus.OK);
    }

    @PostMapping
    private ResponseEntity<Article> createArticle(@RequestHeader(value = "Authorization") String token, @RequestBody Article article) {
        if (jwt.tokenIsNotValidate(token)) {
            return new ResponseEntity<>(HttpStatus.FORBIDDEN);
        }
        // System.out.println(article);
        int userId = Integer.parseInt(jwt.getKey(token));
        Article art = service.createArticle(article, userId);
        return new ResponseEntity<>(art, HttpStatus.CREATED);
    }

    @PutMapping
    public ResponseEntity<Article> updateArticle(@RequestHeader(value = "Authorization") String token, @RequestBody Article article) {
        if (jwt.tokenIsNotValidate(token)) {
            return new ResponseEntity<>(HttpStatus.FORBIDDEN);
        }

        Article a = service.updateArticle(article);
        return new ResponseEntity<>(a, HttpStatus.OK);
    }
}
