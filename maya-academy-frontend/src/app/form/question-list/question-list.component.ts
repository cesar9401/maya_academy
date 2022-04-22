import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Activity } from 'src/app/model/activity.model';
import { Question } from 'src/app/model/question.model';
import { ActivityService } from 'src/app/service/activity.service';
import { FormService } from 'src/app/service/form.service';

@Component({
	selector: 'app-question-list',
	templateUrl: './question-list.component.html',
	styleUrls: ['./question-list.component.css'],
})
export class QuestionListComponent implements OnInit {
	activity: Activity;
	questions: Question[];
	lessonId: number;
	formId: number;

	constructor(
		private router: Router,
		private route: ActivatedRoute,
		private activityService: ActivityService,
		private formService: FormService
	) {}

	ngOnInit(): void {
		const routeParams = this.route.snapshot.paramMap;
		this.lessonId = Number(routeParams.get('lessonId'));
		this.formId = Number(routeParams.get('formId'));

		this.getActivityByLessonIdAndFormId();

		/* questions */
		this.questions = [this.addQuestion()];
	}

	getActivityByLessonIdAndFormId() {
		if (!this.lessonId || !this.formId) {
			this.router.navigate(['/lesson/lesson-list']);
		}

		this.activityService
			.getActivityByLessonIdAndFormId(this.lessonId, this.formId)
			.subscribe({
				next: (response) => {
					this.activity = response;
					console.log(this.activity);
				},
				error: (e) => {
					console.log(e);
					this.router.navigate(['/lesson/lesson-list']);
				},
			});
	}

	createQuestions() {
		const correct = this.questions.every((q) => this.checkQuestion(q));

		if (correct) {
			this.activity.form.questions = this.questions;
			this.formService.createForm(this.activity.form).subscribe({
				next: (response) => {
					console.log(response);
					this.router.navigate(['/lesson', this.lessonId]);
				},
				error: (e) => {
					console.log(e);
				},
			});
		}
	}

	receiveQuestionIndex(obj: { index: number; data: string }) {
		switch (obj.data) {
			case 'close':
				this.removeQuestion(obj.index);
				break;
			case 'up':
				this.insertElement(obj.index, this.addQuestion());
				break;
			case 'down':
				this.insertElement(obj.index + 1, this.addQuestion());
				break;
		}
		// console.log(this.questions);
	}

	addQuestion(): Question {
		const question = new Question();
		question.questionTitle = 'Pregunta';
		question.options = [];

		return question;
	}

	removeQuestion(index: number) {
		this.questions.splice(index, 1);
		if (!this.questions.length) {
			this.questions.push(this.addQuestion());
		}
	}

	insertElement(index: number, item: Question) {
		this.questions = [
			...this.questions.slice(0, index),
			item,
			...this.questions.slice(index),
		];
	}

	checkQuestion(question: Question): boolean {
		if (!question.questionTitle || !question.questionTitle.trim()) {
			return false;
		}

		if (!question.options.length) {
			return false;
		}

		const anyCorrect = question.options.every((option) => !option.correct);
		if (anyCorrect) {
			return false;
		}

		const anyWithoutTitle = question.options.some(
			(option) => option.optionTitle.trim() === ''
		);
		if (anyWithoutTitle) {
			return false;
		}

		return true;
	}

	cancelAddQuestions() {
		this.router.navigate(['/lesson', this.lessonId]);
	}
}
