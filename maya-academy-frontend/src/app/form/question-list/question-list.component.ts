import { Component, OnInit } from '@angular/core';
import { Option } from 'src/app/model/option.model';
import { Question } from 'src/app/model/question.model';

@Component({
	selector: 'app-question-list',
	templateUrl: './question-list.component.html',
	styleUrls: ['./question-list.component.css'],
})
export class QuestionListComponent implements OnInit {
	questions: Question[];

	constructor() {}

	ngOnInit(): void {
		this.questions = [this.addQuestion(), this.addQuestion()];
	}

	createQuestions() {
		const correct = this.questions.every(q => this.checkQuestion(q));
		console.log(correct);
	}

	receiveQuestionIndex(obj: { index: number; data: string }) {
		switch (obj.data) {
			case 'close':
				this.questions.splice(obj.index, 1);
				break;
			case 'up':
				this.insertElement(obj.index, this.addQuestion());
				break;
			case 'down':
				this.insertElement(obj.index + 1, this.addQuestion());
				break;
		}

		console.log(this.questions);
	}

	addQuestion(): Question {
		const question = new Question();
		question.questionTitle = 'Pregunta';
		question.options = [];

		return question;
	}

	insertElement(index: number, item: Question) {
		this.questions = [
			...this.questions.slice(0, index),
			item,
			...this.questions.slice(index),
		];
	}

	checkQuestion(question: Question): boolean {
		if (
			!question.questionTitle ||
			!question.questionTitle.trim()
		) {
			return false;
		}

		if (!question.options.length) {
			return false;
		}

		const anyCorrect = question.options.every(
			(option) => !option.correct
		);
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
}
