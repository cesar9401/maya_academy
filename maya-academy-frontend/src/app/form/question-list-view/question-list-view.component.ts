import { Component, Input, OnInit } from '@angular/core';
import { Activity } from 'src/app/model/activity.model';
import { Question } from 'src/app/model/question.model';
@Component({
	selector: 'app-question-list-view',
	templateUrl: './question-list-view.component.html',
	styleUrls: ['./question-list-view.component.css'],
})
export class QuestionListViewComponent implements OnInit {
	@Input() activity: Activity;
	questions: Question[];

	constructor() {}

	ngOnInit(): void {
		this.questions = this.activity.form.questions;
		// this.questions = [new Question(), new Question(), new Question()];
	}
}
