import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddFormComponent } from './add-form/add-form.component';
import { AddLessonComponent } from './add-lesson/add-lesson.component';
import { EditorComponent } from './editor/editor.component';
import { QuestionItemComponent } from './form/question-item/question-item.component';
import { CanActiveAuthGuard } from './guard/can-active-auth.guard';
import { HomepageContentComponent } from './homepage-content/homepage-content.component';
import { LessonDetailsComponent } from './lesson/lesson-details/lesson-details.component';
import { LessonListComponent } from './lesson/lesson-list/lesson-list.component';
import { LessonComponent } from './lesson/lesson.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';

const routes: Routes = [
	{
		path: '',
		component: HomepageContentComponent,
		canActivate: [CanActiveAuthGuard],
	},
	{
		path: 'home',
		component: HomepageContentComponent,
		canActivate: [CanActiveAuthGuard],
	},
	{
		path: 'lesson',
		component: LessonComponent,
		canActivate: [CanActiveAuthGuard],
		children: [
			{ path: '', component: LessonListComponent },
			{ path: 'lesson-list', component: LessonListComponent },
			{ path: 'add-lesson', component: AddLessonComponent },
			{ path: ':lessonId', component: LessonDetailsComponent },
		],
	},
	{
		path: 'add-form',
		component: AddFormComponent,
		canActivate: [CanActiveAuthGuard],
	},
	{
		path: 'add-article',
		component: EditorComponent,
		canActivate: [CanActiveAuthGuard],
	},
	{
		path: 'login',
		component: LoginComponent,
	},
	{
		path: 'register',
		component: RegisterComponent,
	},
	{
		path: 'question-item',
		component: QuestionItemComponent,
	},
];

@NgModule({
	imports: [RouterModule.forRoot(routes)],
	exports: [RouterModule],
})
export class AppRoutingModule {}
