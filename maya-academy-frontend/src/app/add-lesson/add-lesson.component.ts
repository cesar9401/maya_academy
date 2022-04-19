import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Lesson } from '../model/lesson.model';
import { LessonService } from '../service/lesson.service';

@Component({
	selector: 'app-add-lesson',
	templateUrl: './add-lesson.component.html',
	styleUrls: ['./add-lesson.component.css'],
})
export class AddLessonComponent implements OnInit {
	formLesson: FormGroup;
	lesson: Lesson;

	constructor(
		private formBuilder: FormBuilder,
		private service: LessonService
	) {}

	ngOnInit(): void {
		this.formLesson = this.formBuilder.group({
			lessonName: ['', [Validators.required]],
			lessonText: ['', [Validators.required]],
		});
	}

	send() {
		if (this.formLesson.valid) {
			this.lesson = new Lesson();
			this.lesson.lessonName = this.formLesson.value.lessonName;
			this.lesson.description = this.formLesson.value.lessonText;

			this.service.createLesson(this.lesson).subscribe({
				next: (response: Lesson) => {
					console.log(response);
				},
				error: (e) => {
					console.log(e);
				}
			});
		}
	}
}
