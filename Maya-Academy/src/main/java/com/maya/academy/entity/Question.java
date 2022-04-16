package com.maya.academy.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import javax.persistence.Table;
import java.util.List;

@Entity
@Table(name = "question")
@Getter
@Setter
@ToString
@NoArgsConstructor
public class Question {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "question_id")
    private Integer questionId;

    @Column(name = "form_id")
    private Integer formId;

    @Column(name = "question_title")
    private String questionTitle;

    private String description;

    private String image;

    private Integer score;

    @ManyToOne
    @JoinColumn(name = "form_id", insertable = false, updatable = false)
    @JsonIgnore
    private Form form;

    @OneToMany(mappedBy = "question")
    private List<Option> options;
}
