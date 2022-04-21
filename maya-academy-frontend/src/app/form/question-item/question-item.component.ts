import { Component, Input, OnInit, Output } from '@angular/core';
import { Option } from 'src/app/model/option.model';
import { Question } from 'src/app/model/question.model';

@Component({
	selector: 'app-question-item',
	templateUrl: './question-item.component.html',
	styleUrls: ['./question-item.component.css'],
})
export class QuestionItemComponent implements OnInit {
	@Input() question: Question;
	@Input() index: number;
	// @Output() close = new EventEmitter();
	options: Option[];

	constructor() {}

	ngOnInit(): void {
		// this.question = new Question();
		this.question.questionTitle = `Pregunta ${this.index + 1}`;
		const opt1 = new Option();
		opt1.correct = false;
		opt1.optionTitle = "Opcion 1";

		const opt2 = new Option();
		opt2.optionTitle = 'Opcion B';
		opt2.correct = true;

		this.options = [opt1, opt2];
		this.question.options = this.options;

		// this.question = new Question();
		// this.question.questionTitle = 'Titulo de la pregunta 1';
		// this.question.description = 'description';
		// this.question.score = 10;

		// const opt1 = new Option();
		// opt1.optionTitle = 'Opcion A';
		// const opt2 = new Option();
		// opt2.optionTitle = 'Opcion B';
		// const opt3 = new Option();
		// opt3.optionTitle = 'Opcion C';
		// this.options = [opt1, opt2, opt3];

		// this.question.options = this.options;
	}

	addOption() {
		const option = new Option();
		option.optionTitle = `Opcion ${this.options.length + 1}`
		option.correct = false;
		this.options.push(option);
	}

	deleteOption(i: number) {
		this.options.splice(i, 1);
	}

	ver() {
		console.log(this.question);
		console.log(this.checkQuestion());
	}

	changeQuestionTitle(event) {
		this.question.questionTitle = event.target.value;
	}

	changeQuestionValue(event) {
		this.question.score = event.target.value;
	}

	changeInput(event, i: number) {
		this.options[i].optionTitle = event.target.value;
	}

	changeRadio(event, i) {
		(event.target.value, i);
		this.options.forEach((option, index) => {
			option.correct = false;
			if(index === i) {
				option.correct = true;
			}
		})
	}

	checkQuestion(): boolean {
		if(!this.question.questionTitle || !this.question.questionTitle.trim()) {
			return false;
		}

		if(!this.question.options.length) {
			return false;
		}

		const anyCorrect = this.options.every(option => !option.correct);
		if(anyCorrect) {
			return false;
		}

		const anyWithoutTitle = this.options.some(option => option.optionTitle.trim() === '');
		if(anyWithoutTitle) {
			return false;
		}

		return true;
	}
}
