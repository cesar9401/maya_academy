package com.maya.academy.entity;

import com.fasterxml.jackson.annotation.JsonManagedReference;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

import javax.persistence.*;

@Entity
@Table(name = "activity")
@Getter
@Setter
@ToString
@NoArgsConstructor
public class Activity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "activity_id")
    private Integer activityId;

    @Column(name = "user_id")
    private Integer userId;

    @Column(name = "lesson_id")
    private Integer lessonId;

    @Column(name = "activity_type")
    private String activityType;

    @ManyToOne
    @JoinColumn(name = "user_id", insertable = false, updatable = false)
    private User user;

    /*
    @ManyToOne
    @JoinColumn(name = "lesson_id", insertable = false, updatable = false)
    private Lesson lesson;
    */

    @OneToOne(mappedBy = "activity", cascade = CascadeType.PERSIST)
    @JsonManagedReference
    private Article article;

    @OneToOne(mappedBy = "activity", cascade = CascadeType.PERSIST)
    @JsonManagedReference
    private Form form;
}
