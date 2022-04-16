package com.maya.academy.controller;

import com.maya.academy.entity.Activity;
import com.maya.academy.entity.Article;
import com.maya.academy.repository.ActivityCrudRepository;
import com.maya.academy.repository.ArticleCrudRepository;
import com.maya.academy.service.ActivityService;
import com.maya.academy.service.ArticleService;
import com.maya.academy.utils.JWTUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@CrossOrigin(origins = "http://localhost:4200", maxAge = 3600)
@RestController
@RequestMapping("/activity")
public class ActivityController {

    @Autowired
    private JWTUtil jwt;

    @Autowired
    private ActivityService activityService;

    @Autowired
    private ArticleService articleService;

    @PostMapping("/article")
    private ResponseEntity<Article> createArticle(@RequestHeader(value="Authorization", required=false) String token, @RequestBody Article article) {
        return new ResponseEntity<>(articleService.createArticle(article), HttpStatus.CREATED);
    }
}
