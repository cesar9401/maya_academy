import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { EditorComponent } from './editor/editor.component';

import { QuillModule } from 'ngx-quill';
import { FormsModule } from '@angular/forms';

@NgModule({
	declarations: [AppComponent, EditorComponent],
	imports: [
		BrowserModule,
		AppRoutingModule,
		QuillModule.forRoot(),
		FormsModule,
	],
	providers: [],
	bootstrap: [AppComponent],
})
export class AppModule {}
