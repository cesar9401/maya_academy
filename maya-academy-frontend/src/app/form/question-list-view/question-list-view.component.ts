import { Component, OnInit } from '@angular/core';
import { Question } from 'src/app/model/question.model';
@Component({
  selector: 'app-question-list-view',
  templateUrl: './question-list-view.component.html',
  styleUrls: ['./question-list-view.component.css']
})
export class QuestionListViewComponent implements OnInit {
  questions: Question[];

  constructor() { }

  ngOnInit(): void {
		this.questions = [new Question(), new Question(), new Question()];
	}

}
