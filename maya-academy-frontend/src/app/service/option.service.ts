import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Option } from '../model/option.model';

@Injectable({
	providedIn: 'root',
})
export class OptionService {
	private url: string = 'http://localhost:8090/maya-academy/api/option';
	private headers: {};

	constructor(private http: HttpClient) {
		this.headers = {
			headers: new HttpHeaders({
				Authorization: localStorage.getItem('current_user') ?? '',
			}),
		};
	}

	deleteOptionById(idOption: number) {
		return this.http.delete<boolean>(`${this.url}/${idOption}`, this.headers);
	}
}
