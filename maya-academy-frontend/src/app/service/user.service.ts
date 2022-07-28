import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../model/user.model';
import { environment } from 'src/environments/environment';

@Injectable({
	providedIn: 'root',
})
export class UserService {
	private url: string = `${environment.apiURL}/user`;

	constructor(private http: HttpClient) {}

	createUser(user: User) {
		return this.http.post<User>(this.url, user);
	}

	getUserByToken() {
		return this.http.get<User>(this.url, {
			headers: new HttpHeaders({
				Authorization: localStorage.getItem('current_user') ?? '',
			}),
		});
	}
}
