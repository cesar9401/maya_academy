import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Progress } from '../model/progress.model';

@Injectable({
	providedIn: 'root',
})
export class ProgressService {
	private url: string = 'http://localhost:8090/maya-academy/api/progress';

	constructor(private http: HttpClient) {}

	createProgress(progress: Progress) {
		return this.http.post<Progress>(this.url, progress, {
			headers: new HttpHeaders({
				Authorization: localStorage.getItem('current_user') ?? '',
			}),
		});
	}

	getScoreByFormAndUser(formId: number) {
		return this.http.get<boolean>(`${this.url}/form/${formId}`, {
			headers: new HttpHeaders({
				Authorization: localStorage.getItem('current_user') ?? '',
			}),
		});
	}
}
