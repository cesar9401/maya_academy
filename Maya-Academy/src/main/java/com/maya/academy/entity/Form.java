package com.maya.academy.entity;

import com.fasterxml.jackson.annotation.JsonBackReference;
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
import javax.persistence.OneToMany;
import javax.persistence.OneToOne;
import javax.persistence.Table;
import java.time.LocalDate;
import java.util.List;

@Entity
@Table(name = "form")
@Getter
@Setter
@ToString
@NoArgsConstructor
public class Form {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "form_id")
    private Integer formId;

    /*
    @Column(name = "activity_id")
    private Integer activityId;
    */

    @Column(name = "form_name")
    private String formName;

    private String description;

    @Column(name = "creation_date")
    private LocalDate creationDate;

    @Column(name = "minimum_corrects")
    private Integer minimumCorrects;

    private Integer total;

    @OneToMany(mappedBy = "form")
    private List<Question> questions;

    @OneToOne(cascade = CascadeType.PERSIST)
    @JoinColumn(name = "activity_id", referencedColumnName = "activity_id", updatable = false)
    @JsonBackReference
    private Activity activity;
}
