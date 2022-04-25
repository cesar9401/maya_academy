import { Component, Input, OnInit } from '@angular/core';
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
				}
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

	constructor(private progressService: ProgressService) {}

	ngOnInit(): void {}

	checkQuestion(question: Question): boolean {
		const anyCorrect = question.options.some((option) => option.correct);
		return anyCorrect;
	}

	answerForm() {
		const response = this.activity.form.questions.every((q) =>
			this.checkQuestion(q)
		);

		if (response) {
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
					console.log(response);
				},
				error: (e) => {
					console.log(e);
				},
			});
		}
	}
}
