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
	lesson: Lesson;
	activities: Activity[];

	constructor(
		private router: Router,
		private route: ActivatedRoute,
		private lessonService: LessonService,
	) {}

	ngOnInit(): void {
		this.getLessonById();
	}

	private getLessonById() {
		const routeParams = this.route.snapshot.paramMap;
		const lessonId = Number(routeParams.get('lessonId'));
		this.lessonService.getLessonById(lessonId).subscribe({
			next: (response) => {
				this.lesson = response;
				console.log(this.lesson)
			},
			error: (e) => {
				console.log(e);
				this.router.navigate(['/lesson/lesson-list'])
			}
		});
	}
}
