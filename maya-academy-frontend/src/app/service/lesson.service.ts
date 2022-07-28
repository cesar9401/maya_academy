import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Lesson } from '../model/lesson.model';
import { environment } from 'src/environments/environment';

@Injectable({
	providedIn: 'root',
})
export class LessonService {
	private url: string = `${environment.apiURL}/lesson`;
	private headers: {};

	constructor(private http: HttpClient) {
		this.headers = {
			headers: new HttpHeaders({
				Authorization: localStorage.getItem('current_user') ?? '',
			}),
		};
	}

	getAll() {
		return this.http.get<Lesson[]>(this.url, this.headers);
	}

	getLessonById(id: number) {
		return this.http.get<Lesson>(`${this.url}/${id}`, this.headers);
	}

	createLesson(lesson: Lesson) {
		return this.http.post<Lesson>(this.url, lesson, this.headers);
	}

	updateLesson(lesson: Lesson) {
		return this.http.put<Lesson>(this.url, lesson, this.headers);
	}
}
