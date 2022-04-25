import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../service/user.service';
import { Validators } from '@angular/forms';
import { User } from '../model/user.model';

@Component({
	selector: 'app-register',
	templateUrl: './register.component.html',
	styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
	formRegister: FormGroup;

	constructor(
		private router: Router,
		private formBuilder: FormBuilder,
		private service: UserService
	) {}

	ngOnInit(): void {
		this.formRegister = this.formBuilder.group({
			first_name: ['', [Validators.required]],
			last_name: ['', [Validators.required]],
			username: ['', [Validators.required]],
			password: ['', [Validators.required, Validators.minLength(3)]],
			typeUser: ['', [Validators.required]],
			email: ['', [Validators.required, Validators.email]],
			gender: ['', [Validators.required]],
			phone_number: [
				'',
				[Validators.required, Validators.pattern('[0-9]{8,8}')],
			],
		});
	}

	send() {
		if (this.formRegister.valid) {
			const user = new User();
			user.firstName = this.formRegister.value.first_name;
			user.lastName = this.formRegister.value.last_name;
			user.password = this.formRegister.value.password;
			user.username = this.formRegister.value.username;
			user.email = this.formRegister.value.email;
			user.gender = this.formRegister.value.gender;
			user.phoneNumber = this.formRegister.value.phone_number;
			user.userType = this.formRegister.value.typeUser === '1';
			// console.log(user);
			this.service.createUser(user).subscribe({
				next: (response: any) => {
					// console.log(response);
					this.router.navigate(['/login']);
				},
				error: (e) => {
					console.log(e);
				},
			});
		}
	}
}
