import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { ToolBarComponent } from './tool-bar/tool-bar.component';
import { HomepageContentComponent } from './homepage-content/homepage-content.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';

import { EditorComponent } from './editor/editor.component';

import { QuillModule } from 'ngx-quill';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AddLessonComponent } from './add-lesson/add-lesson.component';
import { AddFormComponent } from './add-form/add-form.component';
import { HeaderComponent } from './header/header.component';
import { LessonComponent } from './lesson/lesson.component';
import { LessonElementComponent } from './lesson/lesson-element/lesson-element.component';
import { LessonListComponent } from './lesson/lesson-list/lesson-list.component';
import { LessonDetailsComponent } from './lesson/lesson-details/lesson-details.component';

@NgModule({
	declarations: [
		AppComponent,
		ToolBarComponent,
		HomepageContentComponent,
		LoginComponent,
		RegisterComponent,
		EditorComponent,
		AddLessonComponent,
		AddFormComponent,
		HeaderComponent,
		LessonComponent,
		LessonElementComponent,
		LessonListComponent,
		LessonDetailsComponent,
	],
	imports: [
		BrowserModule,
		BrowserAnimationsModule,
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
