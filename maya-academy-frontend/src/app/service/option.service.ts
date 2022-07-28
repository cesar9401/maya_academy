import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment'

@Injectable({
	providedIn: 'root',
})
export class OptionService {
	private url: string = `${environment.apiURL}/option`;
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
