import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../service/auth.service';
import { Validators } from '@angular/forms';
import { User } from '../model/user.model';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  formLogin: FormGroup;

  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private service: AuthService
  ) { }

  ngOnInit(): void {
    this.formLogin = this.formBuilder.group({
			username: ['', [Validators.required]],
			password: ['', [Validators.required]],
		});
  }

  send() {
    if (this.formLogin.valid) {
			const user = new User();
      user.password = this.formLogin.value.password;
      user.username = this.formLogin.value.username;
      console.log(user);

      this.service.login(user).subscribe({
        next: (response: any) => {
          console.log(response);
          let token =  response.Authorization;
          localStorage.setItem("current_user", token);
          this.router.navigate(['/']);
        
        },
        error: (e) => {
          console.log(e);
        }
      })

		}
  }

}
