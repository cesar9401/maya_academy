import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Activity } from '../model/activity.model';

@Injectable({
	providedIn: 'root',
})
export class ActivityService {
	private url: string = 'http://localhost:8090/maya-academy/api/activity';

	constructor(private http: HttpClient) {}

	getActivitiesByLesson(lessonId: number) {
		return this.http.get<Activity[]>(`${this.url}/lesson/${lessonId}`);
	}
}
