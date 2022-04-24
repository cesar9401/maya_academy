import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Activity } from 'src/app/model/activity.model';
import { Lesson } from 'src/app/model/lesson.model';
import { ActivityService } from 'src/app/service/activity.service';
import { LessonService } from 'src/app/service/lesson.service';

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

	constructor(
		private router: Router,
		private route: ActivatedRoute,
		private lessonService: LessonService,
		private activityService: ActivityService
	) {}

	ngOnInit(): void {
		const routeParams = this.route.snapshot.paramMap;
		this.lessonId = Number(routeParams.get('lessonId'));
		this.getLessonById();
		this.getActivitiesByLesson();
	}

	private getLessonById() {
		this.lessonService.getLessonById(this.lessonId).subscribe({
			next: (response) => {
				this.lesson = response;
				console.log(this.lesson);
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
				console.log(this.activities);
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
					this.activityForm = response;
					this.activity = null;
					console.log(this.activityForm);
				},
				error: (e) => {
					// console.log(e);
					this.router.navigate(['/lesson/lesson-list']);
				},
			});
	}
}
