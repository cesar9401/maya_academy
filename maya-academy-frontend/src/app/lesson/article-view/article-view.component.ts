import { Component, OnInit, AfterViewChecked, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Activity } from 'src/app/model/activity.model';
import { ActivityService } from 'src/app/service/activity.service';

@Component({
	selector: 'app-article-view',
	templateUrl: './article-view.component.html',
	styleUrls: ['./article-view.component.css'],
})
export class ArticleViewComponent implements OnInit, AfterViewChecked {
	@Input() activity: Activity;
	@Input() editor = false;

	constructor() {}

	ngAfterViewChecked(): void {
		if (document.querySelector('#texto')) {
			document.querySelector('#texto').innerHTML =
				this.activity.article.articleText;
		}
	}

	ngOnInit(): void {}
}
