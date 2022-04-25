import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Activity } from 'src/app/model/activity.model';
import { ActivityService } from 'src/app/service/activity.service';
import { ArticleService } from 'src/app/service/article.service';

@Component({
	selector: 'app-edit-article',
	templateUrl: './edit-article.component.html',
	styleUrls: ['./edit-article.component.css'],
})
export class EditArticleComponent implements OnInit {
	modules: {};
	form: FormGroup;
	activity: Activity;
	lessonId: number;
	articleId: number;

	constructor(
		private router: Router,
		private route: ActivatedRoute,
		private formBuilder: FormBuilder,
		private activityService: ActivityService,
		private articleService: ArticleService
	) {}

	ngOnInit(): void {
		const routeParams = this.route.snapshot.paramMap;
		this.lessonId = Number(routeParams.get('lessonId'));
		this.articleId = Number(routeParams.get('articleId'));

		this.getActivityByLessonIdAndArticleId();

		this.modules = {
			toolbar: [
				['bold', 'italic', 'underline', 'strike'], // toggled buttons
				['code-block'],

				[{ header: 1 }, { header: 2 }], // custom button values
				[{ list: 'ordered' }, { list: 'bullet' }],
				[{ script: 'sub' }, { script: 'super' }], // superscript/subscript
				// [{ indent: '-1' }, { indent: '+1' }], // outdent/indent
				[{ size: ['small', false, 'large', 'huge'] }], // custom dropdown
				[{ header: [1, 2, 3, 4, 5, 6, false] }],

				[{ color: [] }], // dropdown with defaults from theme
				// [{ font: [] }],
				[{ align: [] }],

				['link', 'image', 'video'], // link and image, video
			],
		};

		this.form = this.formBuilder.group({
			title: ['', [Validators.required]],
			text: ['', [Validators.required]],
		});
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
					this.form.setValue({
						title: this.activity.article.articleName,
						text: this.activity.article.articleText,
					});
				},
				error: (e) => {
					console.log(e);
					this.router.navigate(['/lesson/lesson-list']);
				},
			});
	}

	editArticle() {
		if (this.form.valid) {
			const { title, text } = this.form.value;
			this.activity.article.articleName = title;
			this.activity.article.articleText = text;

			this.articleService
				.updateArticle(this.activity.article).subscribe({
					next: (response) => {
						// console.log(response);
						this.router.navigate(['lesson', this.lessonId]);
					},
					error: (e) => {
						console.log(e);
					}
				});
		}
	}
}
