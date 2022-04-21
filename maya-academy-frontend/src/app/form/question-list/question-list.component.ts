import { Component, OnInit } from '@angular/core';
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
		this.questions = [new Question(), new Question(), new Question()];
	}

	see() {
		console.log(this.questions);
	}
}
