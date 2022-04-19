import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../model/user.model';

@Injectable({
	providedIn: 'root',
})
export class AuthService {
	private url: string = 'http://localhost:8090/maya-academy/auth';

	constructor(private http: HttpClient) {}

	login(user: User) {
		return this.http.post(`${this.url}/login`, user);
	}
}
