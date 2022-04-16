package com.maya.academy.repository;

import com.maya.academy.entity.Article;
import org.springframework.data.repository.CrudRepository;

public interface ArticleCrudRepository extends CrudRepository<Article, Integer> {
}
