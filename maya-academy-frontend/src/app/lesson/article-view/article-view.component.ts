import { Component, OnInit, AfterViewChecked } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Activity } from 'src/app/model/activity.model';
import { ActivityService } from 'src/app/service/activity.service';

@Component({
	selector: 'app-article-view',
	templateUrl: './article-view.component.html',
	styleUrls: ['./article-view.component.css'],
})
export class ArticleViewComponent implements OnInit, AfterViewChecked {
	activity: Activity;
	lessonId: number;
	articleId: number;

	constructor(
		private router: Router,
		private route: ActivatedRoute,
		private activityService: ActivityService
	) {}

	ngAfterViewChecked(): void {
		if(document.querySelector("#texto")) {
			document.querySelector("#texto").innerHTML = this.activity.article.articleText;
		}
	}

	ngOnInit(): void {
		const routerParams = this.route.snapshot.paramMap;
		this.lessonId = Number(routerParams.get('lessonId'));
		this.articleId = Number(routerParams.get('articleId'));

		this.getActivityByLessonIdAndArticleId();
	}

	getActivityByLessonIdAndArticleId() {
		if (!this.lessonId || !this.articleId) {
			this.router.navigate(['/lesson/lesson-list']);
		}

		this.activityService
			.getActivityByLessonIdAndArticleId(this.lessonId, this.articleId)
			.subscribe({
				next: (response) => {
					this.activity = response;
					// console.log(this.activity);
				},
				error: (e) => {
					console.log(e);
					this.router.navigate(['/lesson/lesson-list']);
				},
			});
	}
}
