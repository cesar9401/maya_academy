import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Progress } from '../model/progress.model';
import { environment } from 'src/environments/environment'

@Injectable({
	providedIn: 'root',
})
export class ProgressService {
	private url: string = `${environment.apiURL}/progress`;

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
