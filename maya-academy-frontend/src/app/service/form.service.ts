import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Form } from '../model/form.model';

@Injectable({
	providedIn: 'root',
})
export class FormService {
	private url: string = "http://localhost:8090/maya-academy/api/form";

	constructor(private http: HttpClient) {}

	createForm(form: Form) {
		return this.http.post<Form>(this.url, form);
	}
}
