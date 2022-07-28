import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../model/user.model';
import { environment } from 'src/environments/environment';

@Injectable({
	providedIn: 'root',
})
export class AuthService {
	private url: string = `${environment.apiURL}/auth`;

	constructor(private http: HttpClient) {}

	login(user: User) {
		return this.http.post(`${this.url}/login`, user);
	}
}
