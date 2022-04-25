import { Component, OnInit } from '@angular/core';
import { Lesson } from 'src/app/model/lesson.model';
import { LessonService } from 'src/app/service/lesson.service';
import { UserService } from 'src/app/service/user.service';

@Component({
	selector: 'app-lesson-list',
	templateUrl: './lesson-list.component.html',
	styleUrls: ['./lesson-list.component.css'],
})
export class LessonListComponent implements OnInit {
	lessons: Lesson[];
	editor: boolean = false;

	constructor(private lessonService: LessonService, private userService: UserService) {}

	ngOnInit(): void {
		this.getUser();
		this.getLessons();
	}

	private getUser() {
		this.userService.getUserByToken().subscribe({
			next: (response) => {
				this.editor = response.userType;
			},
			error: (e) => {
				console.log(e);
			}
		});
	}

	private getLessons(): void {
		this.lessonService.getAll().subscribe({
			next: (response) => {
				this.lessons = response;
			},
			error: (e) => {
				console.log(e);
			}
		})
	}
}
