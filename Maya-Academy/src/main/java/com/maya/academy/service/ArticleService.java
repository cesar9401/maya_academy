package com.maya.academy.service;

import com.maya.academy.entity.Article;
import com.maya.academy.repository.ArticleCrudRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;

@Service
public class ArticleService {

    @Autowired
    private ArticleCrudRepository repository;

    public List<Article> getAll() {
        return (List<Article>) repository.findAll();
    }

    public Article createArticle(Article article) {
        article.setCreationDate(LocalDate.now());
        article.setModificationDate(LocalDate.now());
        return repository.save(article);
    }
}
