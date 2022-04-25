import { Component, Input, OnInit } from '@angular/core';
import { Lesson } from 'src/app/model/lesson.model';

@Component({
	selector: 'app-lesson-element',
	templateUrl: './lesson-element.component.html',
	styleUrls: ['./lesson-element.component.css'],
})
export class LessonElementComponent implements OnInit {
	@Input() lesson: Lesson;

	constructor() {}

	ngOnInit(): void {
		// console.log(this.lesson);
	}

	getLessonDetails() {
		const size = 60;
		if(this.lesson.description.length <= size) {
			return this.lesson.description;
		}

		return `${this.lesson.description.substring(0, size)}...`;
	}
}
