import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddFormComponent } from './add-form/add-form.component';
import { AddLessonComponent } from './add-lesson/add-lesson.component';
import { EditorComponent } from './lesson/editor/editor.component';
import { QuestionListComponent } from './form/question-list/question-list.component';
import { CanActiveAuthGuard } from './guard/can-active-auth.guard';
import { HomelayoutComponent } from './homelayout/homelayout.component';
import { HomepageContentComponent } from './homepage-content/homepage-content.component';
import { LessonDetailsComponent } from './lesson/lesson-details/lesson-details.component';
import { LessonListComponent } from './lesson/lesson-list/lesson-list.component';
import { LessonComponent } from './lesson/lesson.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { EditArticleComponent } from './lesson/edit-article/edit-article.component';
import { CanActiveEditorGuard } from './guard/can-active-editor.guard';

const routes: Routes = [
	{
		path: '',
		component: HomelayoutComponent,
		canActivate: [CanActiveAuthGuard],
		children: [
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
					{
						path: 'add-lesson',
						component: AddLessonComponent,
						canActivate: [CanActiveEditorGuard],
					},
					{
						path: ':lessonId',
						component: LessonDetailsComponent,
					},
					// agregar formulario
					{
						path: ':lessonId/add-form',
						component: AddFormComponent,
						canActivate: [CanActiveEditorGuard],
					},
					{
						path: ':lessonId/form/:formId/add-questions',
						component: QuestionListComponent,
						canActivate: [CanActiveEditorGuard],
					},
					/* editar formulario */
					{
						path: ':lessonId/edit-form/:formId',
						component: QuestionListComponent,
						canActivate: [CanActiveEditorGuard],
					},
					/* editar formulario */

					// agregar articulo
					{
						path: ':lessonId/add-article',
						component: EditorComponent,
						canActivate: [CanActiveEditorGuard],
					},
					{
						path: ':lessonId/edit-article/:articleId',
						component: EditArticleComponent,
						canActivate: [CanActiveEditorGuard],
					},
				],
			},
		],
	},
	{
		path: 'login',
		component: LoginComponent,
	},
	{
		path: 'register',
		component: RegisterComponent,
	},
];

@NgModule({
	imports: [RouterModule.forRoot(routes)],
	exports: [RouterModule],
})
export class AppRoutingModule {}
