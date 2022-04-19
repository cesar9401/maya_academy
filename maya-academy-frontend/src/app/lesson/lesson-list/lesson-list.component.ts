import { Component, OnInit } from '@angular/core';
import { Lesson } from 'src/app/model/lesson.model';
import { LessonService } from 'src/app/service/lesson.service';

@Component({
	selector: 'app-lesson-list',
	templateUrl: './lesson-list.component.html',
	styleUrls: ['./lesson-list.component.css'],
})
export class LessonListComponent implements OnInit {
	lessons: Lesson[];
	constructor(private service: LessonService) {}

	ngOnInit(): void {
		this.getLessons();
	}

	private getLessons(): void {
		this.service.getAll().subscribe({
			next: (response) => {
				this.lessons = response;
				console.log(this.lessons);
			},
			error: (e) => {
				console.log(e);
			}
		})
	}
}
