import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Activity } from '../model/activity.model';
import { Article } from '../model/article.model';
import { ArticleService } from '../service/article.service';

@Component({
	selector: 'app-editor',
	templateUrl: './editor.component.html',
	styleUrls: ['./editor.component.css'],
})
export class EditorComponent implements OnInit {
	modules: {};
	form: FormGroup;
	article: Article;

	constructor(
		private router: Router,
		private formBuilder: FormBuilder,
		private service: ArticleService
	) {}

	ngOnInit(): void {
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

	send() {
		if (this.form.valid) {
			const { title, text } = this.form.value;

			const activity: Activity = new Activity();
			/* datos quedamos */
			activity.userId = 1; // el token brinda el userId
			activity.lessonId = 1;
			activity.activityType = 'ARTICLE';
			/* datos quemados */
			this.article = new Article();
			this.article.activity = activity;
			this.article.articleName = title;
			this.article.articleText = text;

			this.service.createArticle(this.article).subscribe({
				next: (response: Article) => {
					// console.log(response);
					this.router.navigate(['/']);
					this.router.navigate(['/lesson/1']);
				},
				error: (e) => {
					console.log(e);
				}
			});
		}
	}
}
