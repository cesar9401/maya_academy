import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Option } from 'src/app/model/option.model';
import { Question } from 'src/app/model/question.model';

@Component({
	selector: 'app-question-item',
	templateUrl: './question-item.component.html',
	styleUrls: ['./question-item.component.css'],
})
export class QuestionItemComponent implements OnInit {
	classes = [
		'border-primary',
		'border-secondary',
		'border-danger',
		'border-warning',
		'border-info',
	];
	@Input() question: Question;
	@Input() index: number;
	@Output() questionIndex = new EventEmitter<{
		index: number;
		data: string;
	}>();

	constructor() {
	}

	ngOnInit(): void {
		console.log(this.classes[this.index % this.classes.length])
	}

	addOption() {
		const option = new Option();
		option.optionTitle = `Opcion ${this.question.options.length + 1}`;
		option.correct = false;
		this.question.options.push(option);
	}

	deleteOption(i: number) {
		this.question.options.splice(i, 1);
	}

	changeQuestionTitle(event) {
		this.question.questionTitle = event.target.value;
	}

	changeQuestionValue(event) {
		this.question.score = event.target.value;
	}

	changeInput(event, i: number) {
		this.question.options[i].optionTitle = event.target.value;
	}

	changeRadio(event, i) {
		event.target.value, i;
		this.question.options.forEach((option, index) => {
			option.correct = false;
			if (index === i) {
				option.correct = true;
			}
		});
	}

	emitQuestionIndex(data: string) {
		this.questionIndex.emit({ index: this.index, data: data });
	}
}
