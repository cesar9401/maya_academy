import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Activity } from 'src/app/model/activity.model';
import { Progress } from 'src/app/model/progress.model';
import { Question } from 'src/app/model/question.model';
import { ProgressService } from 'src/app/service/progress.service';
@Component({
	selector: 'app-question-list-view',
	templateUrl: './question-list-view.component.html',
	styleUrls: ['./question-list-view.component.css'],
})
export class QuestionListViewComponent implements OnInit {
	formValid: boolean = true;
	activity: Activity;
	questions: Question[]; // respuestas correctas
	passed: boolean = false;
	@Input() editor = false;
	@Input() set setActivity(activity: Activity) {
		this.activity = activity;

		// obtener progreso
		this.progressService
			.getScoreByFormAndUser(this.activity.form.formId)
			.subscribe({
				next: (response) => {
					this.passed = response;
				},
				error: (e) => {
					console.log(e);
				},
			});

		this.questions = [];
		this.activity.form.questions.forEach((q) => {
			const json = JSON.stringify(q);
			const question: Question = JSON.parse(json);
			this.questions.push(question);

			// marcar como no contestadas
			q.options.forEach((o) => (o.correct = false));
		});
	}
	@Output() sendFormResult = new EventEmitter<{
		form: number;
		progress: Progress;
	}>();

	constructor(private progressService: ProgressService) {}

	ngOnInit(): void {}

	checkQuestion(question: Question): boolean {
		const anyCorrect = question.options.some((option) => option.correct);
		return anyCorrect;
	}

	answerForm() {
		this.formValid = true;
		this.formValid = this.activity.form.questions.every((q) =>
			this.checkQuestion(q)
		);

		if (this.formValid) {
			let score = 0;
			this.activity.form.questions.forEach((q, i) => {
				let value = true;
				q.options.forEach((o, j) => {
					value =
						value &&
						o.correct === this.questions[i].options[j].correct;
				});
				score += value ? q.score : 0;
			});

			const progress = new Progress();
			progress.formId = this.activity.form.formId;
			progress.score = score;

			this.progressService.createProgress(progress).subscribe({
				next: (response) => {
					// console.log(response);
					/* mostrar punteo y si aprobo el formulario o no */
					this.emitFormResult(response);
				},
				error: (e) => {
					console.log(e);
				},
			});
		}
	}

	emitFormResult(response: Progress) {
		this.sendFormResult.emit({
			form: this.activity.form.formId,
			progress: response,
		});
	}
}
