import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Question } from '../model/question.model';

@Injectable({
	providedIn: 'root',
})
export class QuestionService {
	private url: string = 'http://localhost:8090/maya-academy/api/question';
	private headers: {};

	constructor(private http: HttpClient) {
		this.headers = {
			headers: new HttpHeaders({
				Authorization: localStorage.getItem('current_user') ?? '',
			}),
		};
	}

	createQuestions(questions: Question[]) {
		return this.http.post<Question[]>(this.url, questions, this.headers);
	}

	updateQuestions(questions: Question[]) {
		return this.http.put<Question[]>(this.url, questions, this.headers);
	}

	deleteQuestion(questionId: number) {
		return this.http.delete<boolean>(`${this.url}/${questionId}`, this.headers);
	}

	getQuestionById(questionId: number) {
		return this.http.get<Question>(`${this.url}/${questionId}`);
	}
}
