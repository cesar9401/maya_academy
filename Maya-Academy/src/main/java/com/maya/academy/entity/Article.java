package com.maya.academy.entity;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.OneToOne;
import javax.persistence.Table;
import java.time.LocalDate;

@Entity
@Table(name = "article")
@Getter
@Setter
@ToString
@NoArgsConstructor
public class Article {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "article_id")
    private Integer articleId;

    /*
    @Column(name = "activity_id")
    private Integer activityId;
    */

    @Column(name = "article_name")
    private String articleName;

    @Column(name = "article_text")
    private String articleText;

    @Column(name = "creation_date")
    private LocalDate creationDate;

    @Column(name = "modification_date")
    private LocalDate modificationDate;

    @OneToOne(cascade = CascadeType.PERSIST)
    @JoinColumn(name = "activity_id", referencedColumnName = "activity_id", updatable = false)
    @JsonBackReference
    private Activity activity;
}
