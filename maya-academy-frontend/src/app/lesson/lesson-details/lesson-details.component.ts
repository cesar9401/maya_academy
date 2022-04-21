import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Activity } from 'src/app/model/activity.model';
import { Lesson } from 'src/app/model/lesson.model';
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

	constructor(
		private router: Router,
		private route: ActivatedRoute,
		private lessonService: LessonService,
	) {}

	ngOnInit(): void {
		const routeParams = this.route.snapshot.paramMap;
		this.lessonId = Number(routeParams.get('lessonId'));
		this.getLessonById();
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
				this.router.navigate(['/lesson/lesson-list'])
			}
		});
	}
}
