import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Form } from '../model/form.model';

@Injectable({
	providedIn: 'root',
})
export class FormService {
	private url: string = 'http://localhost:8090/maya-academy/api/form';
	private headers: {};

	constructor(private http: HttpClient) {
		this.headers = {
			headers: new HttpHeaders({
				Authorization: localStorage.getItem('current_user') ?? '',
			}),
		};
	}

	createForm(form: Form) {
		return this.http.post<Form>(this.url, form, this.headers);
	}
}
