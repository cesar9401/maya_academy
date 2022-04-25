import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Activity } from 'src/app/model/activity.model';
import { ArticleService } from 'src/app/service/article.service';

@Component({
	selector: 'app-activity-element',
	templateUrl: './activity-element.component.html',
	styleUrls: ['./activity-element.component.css'],
})
export class ActivityElementComponent implements OnInit {
	@Input() activity: Activity;
	@Output() articleId = new EventEmitter<number>();
	@Output() formId = new EventEmitter<number>();

	ActivityAutor: String;
	ActivityName: String;

	constructor(private articleService: ArticleService) {}

	ngOnInit(): void {
		// console.log(this.activity.activityType);
	}

	setName(): void {}

	emitArticleId(id: number) {
		this.articleId.emit(id);
	}

	emitFormId(id: number) {
		this.formId.emit(id);
	}

	getArticleDescription(text:string):string {
		if(text.length < 25) {
			return text;
		} else {
			return text.substring(0,25) + '...';
		}
	}
}
