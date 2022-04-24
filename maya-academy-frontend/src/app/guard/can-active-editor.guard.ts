import { Injectable } from '@angular/core';
import {
	ActivatedRouteSnapshot,
	CanActivate,
	Router,
	RouterStateSnapshot,
	UrlTree,
} from '@angular/router';
import { Observable } from 'rxjs';
import { UserService } from '../service/user.service';

@Injectable({
	providedIn: 'root',
})
export class CanActiveEditorGuard implements CanActivate {
	constructor(private router: Router, private service: UserService) {}

	async canActivate(
		route: ActivatedRouteSnapshot,
		state: RouterStateSnapshot
	): Promise<boolean> {
		const user = localStorage.getItem('current_user');
		if (user) {
			const prom = await this.service.getUserByToken().toPromise();
			console.log(prom);
			if (prom.userType) {
				return true;
			}

			this.router.navigate(['home']);
			return false;
			// this.service.getUserByToken().subscribe({
			// 	next: (response) => {
			// 		if(!response.userType) {
			// 			console.log(response);
			// 			this.router.navigate(['home']);
			// 		}
			// 	},
			// 	error: (e) => {
			// 		console.log(e);
			// 	}
			// });
		}

		this.router.navigate(['login']);
		return false;
	}
}
