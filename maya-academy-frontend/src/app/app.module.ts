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
import { QuestionItemComponent } from './form/question-item/question-item.component';
import { QuestionListComponent } from './form/question-list/question-list.component';
import { QuestionItemViewComponent } from './form/question-item-view/question-item-view.component';
import { QuestionListViewComponent } from './form/question-list-view/question-list-view.component';
import { ActivityElementComponent } from './lesson/activity-element/activity-element.component';

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
  QuestionItemComponent,
  QuestionListComponent,
  QuestionItemViewComponent,
  QuestionListViewComponent,
  ActivityElementComponent,
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
