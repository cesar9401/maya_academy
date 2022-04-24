import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Activity } from '../model/activity.model';

@Injectable({
	providedIn: 'root',
})
export class ActivityService {
	private url: string = 'http://localhost:8090/maya-academy/api/activity';
	private headers: {};

	constructor(private http: HttpClient) {
		this.headers = {
			headers: new HttpHeaders({
				Authorization: localStorage.getItem('current_user') ?? '',
			}),
		};
	}

	getActivitiesByLesson(lessonId: number) {
		return this.http.get<Activity[]>(
			`${this.url}/lesson/${lessonId}`,
			this.headers
		);
	}

	getActivityByLessonIdAndFormId(lessonId: number, formId: number) {
		return this.http.get<Activity>(
			`${this.url}/lesson/${lessonId}/form/${formId}`,
			this.headers
		);
	}

	getActivityByLessonIdAndArticleId(lessonId: number, articleId: number) {
		return this.http.get<Activity>(
			`${this.url}/lesson/${lessonId}/article/${articleId}`,
			this.headers
		);
	}
}
