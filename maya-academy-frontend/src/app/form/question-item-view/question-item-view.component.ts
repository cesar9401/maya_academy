import { Component, Input, OnInit, Output } from '@angular/core';
import { Option } from 'src/app/model/option.model';
import { Question } from 'src/app/model/question.model';

@Component({
	selector: 'app-question-item-view',
	templateUrl: './question-item-view.component.html',
	styleUrls: ['./question-item-view.component.css'],
})
export class QuestionItemViewComponent implements OnInit {
	@Input() question: Question;
	@Input() index: number;
	constructor() {}
	options: Option[];

	ngOnInit(): void {
		this.options = this.question.options;
	}
}
