package com.maya.academy.service;

import com.maya.academy.entity.Article;
import com.maya.academy.repository.ArticleCrudRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class ArticleService {

    @Autowired
    private ArticleCrudRepository repository;

    public Article createArticle(Article article) {
        return repository.save(article);
    }
}
