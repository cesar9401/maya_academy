import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Activity } from '../../model/activity.model';
import { Article } from '../../model/article.model';
import { Lesson } from '../../model/lesson.model';
import { ArticleService } from '../../service/article.service';
import { LessonService } from '../../service/lesson.service';

@Component({
	selector: 'app-editor',
	templateUrl: './editor.component.html',
	styleUrls: ['./editor.component.css'],
})
export class EditorComponent implements OnInit {
	modules: {};
	form: FormGroup;
	article: Article;
	lessonId: number;
	lesson: Lesson;

	constructor(
		private router: Router,
		private route: ActivatedRoute,
		private formBuilder: FormBuilder,
		private articleService: ArticleService,
		private lessonService: LessonService
	) {}

	ngOnInit(): void {
		const routeParam = this.route.snapshot.paramMap;
		this.lessonId = Number(routeParam.get('lessonId'));

		this.getLessonById();

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

	getLessonById() {
		if(!this.lessonId) {
			this.router.navigate(['/lesson/lesson-list']);
		}

		this.lessonService.getLessonById(this.lessonId).subscribe({
			next: (response) => {
				// console.log(response);
				this.lesson = response;
			},
			error: (e) => {
				console.log(e);
				this.router.navigate(['/lesson/lesson-list']);
			}
		});
	}

	send() {
		if (this.form.valid) {
			const { title, text } = this.form.value;

			const activity: Activity = new Activity();
			// activity.userId = 1; // el token brinda el userId
			activity.lessonId = this.lessonId;
			activity.activityType = 'ARTICLE';

			this.article = new Article();
			this.article.activity = activity;
			this.article.articleName = title;
			this.article.articleText = text;

			this.articleService.createArticle(this.article).subscribe({
				next: (response: Article) => {
					console.log(response);
					// this.router.navigate(['/']);
					this.router.navigate(['/lesson', this.lessonId]);
				},
				error: (e) => {
					console.log(e);
				}
			});
		}
	}
}
