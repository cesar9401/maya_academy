import { Component, Input, OnInit, Output } from '@angular/core';
import { Option } from 'src/app/model/option.model';
import { Question } from 'src/app/model/question.model';

@Component({
  selector: 'app-question-item-view',
  templateUrl: './question-item-view.component.html',
  styleUrls: ['./question-item-view.component.css']
})
export class QuestionItemViewComponent implements OnInit {
  @Input() question: Question;
	@Input() index: number;
  constructor() { }
	options: Option[];
  ngOnInit(): void {
    this.question.questionTitle = `Pregunta ${this.index + 1}`;
		const opt1 = new Option();
		opt1.correct = false;
		opt1.optionTitle = "Opcion 1";

		const opt2 = new Option();
		opt2.optionTitle = 'Opcion B';
		opt2.correct = true;

		this.options = [opt1, opt2];
		this.question.options = this.options;
  }

  
}
