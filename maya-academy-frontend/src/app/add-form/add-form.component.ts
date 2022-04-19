import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Activity } from '../model/activity.model';
import { Form } from '../model/form.model';
import { FormService } from '../service/form.service';

@Component({
	selector: 'app-add-form',
	templateUrl: './add-form.component.html',
	styleUrls: ['./add-form.component.css'],
})
export class AddFormComponent implements OnInit {
	formForm: FormGroup;
	form: Form;

	constructor(
		private formBuilder: FormBuilder,
		private service: FormService
	) {}

	ngOnInit(): void {
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
			activity.userId = 1; // el token brinda el userId
			activity.lessonId = 1;
			activity.activityType = 'FORM';
			/* datos quemados */
			this.form = new Form();
			this.form.activity = activity;
			this.form.formName = formName;
			this.form.description = formDescription;
			this.form.minimumCorrects = 0;
			this.form.total = 0;

			this.service.createForm(this.form).subscribe({
				next: (response) => {
					console.log(response);
				},
				error: (e) => {
					console.log(e);
				},
			});
		}
	}
}
