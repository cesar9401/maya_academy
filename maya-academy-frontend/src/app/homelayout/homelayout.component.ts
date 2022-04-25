import { Component, OnInit } from '@angular/core';

@Component({
	selector: 'app-homelayout',
	template: `<app-tool-bar></app-tool-bar><router-outlet></router-outlet>`,
	styles: [],
})
export class HomelayoutComponent implements OnInit {
	constructor() {}

	ngOnInit(): void {}
}
