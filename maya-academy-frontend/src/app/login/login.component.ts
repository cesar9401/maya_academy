import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../service/auth.service';
import { Validators } from '@angular/forms';
import { User } from '../model/user.model';

@Component({
	selector: 'app-login',
	templateUrl: './login.component.html',
	styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
	formLogin: FormGroup;
	loginError: boolean = false;

	constructor(
		private router: Router,
		private formBuilder: FormBuilder,
		private service: AuthService
	) {}

	ngOnInit(): void {
		this.formLogin = this.formBuilder.group({
			username: ['', [Validators.required]],
			password: ['', [Validators.required]],
		});
	}

	send() {
		if (this.formLogin.valid) {
			const { username, password } = this.formLogin.value;
			const user = new User();
			user.password = password;
			user.username = username;

			this.loginError = false;

			this.service.login(user).subscribe({
				next: (response: any) => {
					const token = response.Authorization;
					localStorage.setItem('current_user', token);
					this.router.navigate(['/']);
				},
				error: (e) => {
					// console.error(e);
					this.loginError = true;
				},
			});
		}
	}
}
