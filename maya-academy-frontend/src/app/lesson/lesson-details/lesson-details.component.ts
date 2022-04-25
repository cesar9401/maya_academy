import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Activity } from 'src/app/model/activity.model';
import { Lesson } from 'src/app/model/lesson.model';
import { ActivityService } from 'src/app/service/activity.service';
import { LessonService } from 'src/app/service/lesson.service';
import { UserService } from 'src/app/service/user.service';

@Component({
	selector: 'app-lesson-details',
	templateUrl: './lesson-details.component.html',
	styleUrls: ['./lesson-details.component.css'],
})
export class LessonDetailsComponent implements OnInit {
	lessonId: number;
	lesson: Lesson;
	activities: Activity[];
	activity: Activity;
	activityForm: Activity;
	editor: boolean = false;

	constructor(
		private router: Router,
		private route: ActivatedRoute,
		private lessonService: LessonService,
		private activityService: ActivityService,
		private userService: UserService
	) {}

	ngOnInit(): void {
		const routeParams = this.route.snapshot.paramMap;
		this.lessonId = Number(routeParams.get('lessonId'));
		this.getLessonById();
		this.getActivitiesByLesson();
		this.getUser();
	}

	private getUser() {
		this.userService.getUserByToken().subscribe({
			next: (response) => {
				this.editor = response.userType;
			},
			error: (e) => {
				console.log(e);
			},
		});
	}

	private getLessonById() {
		if (!this.lessonId) {
			this.router.navigate(['/lesson/lesson-list']);
		}

		this.lessonService.getLessonById(this.lessonId).subscribe({
			next: (response) => {
				this.lesson = response;
				// peticion de actividades
			},
			error: (e) => {
				console.log(e);
				this.router.navigate(['/lesson/lesson-list']);
			},
		});
	}

	private getActivitiesByLesson(): void {
		this.activityService.getActivitiesByLesson(this.lessonId).subscribe({
			next: (response) => {
				this.activities = response;
				if(this.activities) {
					if(this.activities[0].article) {
						this.activity = this.activities[0];
					} else {
						this.activityForm = this.activities[0];
					}
				}
			},
			error: (e) => {
				console.log(e);
			},
		});
	}

	getActivityByLessonIdAndArticleId(lessonId_: number, articleId: number) {
		if (!lessonId_ || !articleId) {
			this.router.navigate(['/lesson/lesson-list']);
		}

		this.activityService
			.getActivityByLessonIdAndArticleId(lessonId_, articleId)
			.subscribe({
				next: (response) => {
					// this.activity = null;
					this.activity = response;
					this.activityForm = null;
					// console.log(this.activity);
				},
				error: (e) => {
					console.log(e);
					this.router.navigate(['/lesson/lesson-list']);
				},
			});
	}

	getArticleId(id: number) {
		this.getActivityByLessonIdAndArticleId(this.lessonId, id);
	}

	getActivityByLessonIdAndFormId(lessonId_: number, formId: number) {
		this.activityService
			.getActivityByLessonIdAndFormId(lessonId_, formId)
			.subscribe({
				next: (response) => {
					// this.activityForm = null;
					this.activityForm = response;
					this.activity = null;
					// console.log(this.activityForm);
				},
				error: (e) => {
					// console.log(e);
					this.router.navigate(['/lesson/lesson-list']);
				},
			});
	}

	getFormId(id: number) {
		this.getActivityByLessonIdAndFormId(this.lessonId, id);
	}
}
