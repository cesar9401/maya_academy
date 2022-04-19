import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { EditorComponent } from './editor/editor.component';

import { QuillModule } from 'ngx-quill';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AddLessonComponent } from './add-lesson/add-lesson.component';
import { AddFormComponent } from './add-form/add-form.component';

@NgModule({
	declarations: [AppComponent, EditorComponent, AddLessonComponent, AddFormComponent],
	imports: [
		BrowserModule,
		AppRoutingModule,
		QuillModule.forRoot(),
		FormsModule,
		ReactiveFormsModule,
		HttpClientModule,
	],
	providers: [],
	bootstrap: [AppComponent],
})
export class AppModule {}
