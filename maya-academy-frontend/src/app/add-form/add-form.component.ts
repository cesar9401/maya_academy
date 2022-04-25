import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Activity } from '../model/activity.model';
import { Form } from '../model/form.model';
import { Lesson } from '../model/lesson.model';
import { FormService } from '../service/form.service';
import { LessonService } from '../service/lesson.service';

@Component({
	selector: 'app-add-form',
	templateUrl: './add-form.component.html',
	styleUrls: ['./add-form.component.css'],
})
export class AddFormComponent implements OnInit {
	formForm: FormGroup;
	form: Form;
	lessonId: number;
	lesson: Lesson;

	constructor(
		private router: Router,
		private route: ActivatedRoute,
		private formBuilder: FormBuilder,
		private formService: FormService,
		private lessonService: LessonService
	) {}

	ngOnInit(): void {
		const routeParams = this.route.snapshot.paramMap;
		this.lessonId = Number(routeParams.get('lessonId'));
		this.getLessonById();

		this.formForm = this.formBuilder.group({
			formName: ['', [Validators.required]],
			formDescription: ['', [Validators.required, Validators.maxLength(255)]],
		});
	}

	send() {
		if (this.formForm.valid) {
			const { formName, formDescription } = this.formForm.value;

			const activity: Activity = new Activity();
			/* datos quedamos */
			// activity.userId = 1; // el token brinda el userId
			activity.lessonId = this.lessonId;
			activity.activityType = 'FORM';
			/* datos quemados */
			this.form = new Form();
			this.form.activity = activity;
			this.form.formName = formName;
			this.form.description = formDescription;
			this.form.minimumCorrects = 0;
			this.form.total = 0;

			this.formService.createForm(this.form).subscribe({
				next: (response) => {
					// console.log(response);
					// this.router.navigate(['/']);
					this.router.navigate(['/lesson', this.lessonId, 'form', response.formId, 'add-questions']);
				},
				error: (e) => {
					console.log(e);
				},
			});
		}
	}

	private getLessonById() {
		if(!this.lessonId) {
			this.router.navigate(['/lesson/lesson-list']);
		}

		this.lessonService.getLessonById(this.lessonId).subscribe({
			next: (response) => {
				this.lesson = response;
				console.log(this.lesson);
				// peticion de actividades
			},
			error: (e) => {
				console.log(e);
				this.router.navigate(['/lesson/lesson-list']);
			}
		});
	}
}
