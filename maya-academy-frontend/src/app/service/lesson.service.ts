import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Lesson } from '../model/lesson.model';

@Injectable({
	providedIn: 'root',
})
export class LessonService {
	private url: string = "http://localhost:8090/maya-academy/api/lesson";

	constructor(private http: HttpClient) {}

	getAll() {
		return this.http.get<Lesson[]>(this.url);
	}

	getLessonById(id: number) {
		return this.http.get<Lesson>(`${this.url}/${id}`);
	}

	createLesson(lesson: Lesson) {
		return this.http.post<Lesson>(this.url, lesson);
	}

	updateLesson(lesson: Lesson) {
		return this.http.put<Lesson>(this.url, lesson);
	}
}
