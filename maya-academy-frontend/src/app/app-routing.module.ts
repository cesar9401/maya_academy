import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddFormComponent } from './add-form/add-form.component';
import { AddLessonComponent } from './add-lesson/add-lesson.component';
import { EditorComponent } from './lesson/editor/editor.component';
import { QuestionItemViewComponent } from './form/question-item-view/question-item-view.component';
import { QuestionListViewComponent } from './form/question-list-view/question-list-view.component';
import { QuestionListComponent } from './form/question-list/question-list.component';
import { CanActiveAuthGuard } from './guard/can-active-auth.guard';
import { HomelayoutComponent } from './homelayout/homelayout.component';
import { HomepageContentComponent } from './homepage-content/homepage-content.component';
import { ArticleViewComponent } from './lesson/article-view/article-view.component';
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
					{ path: ':lessonId', component: LessonDetailsComponent },
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
					// agregar articulo
					{
						path: ':lessonId/add-article',
						component: EditorComponent,
						canActivate: [CanActiveEditorGuard],
					},
					{
						path: ':lessonId/article/:articleId',
						component: ArticleViewComponent,
					},
					{
						path: ':lessonId/edit-article/:articleId',
						component: EditArticleComponent,
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
	{
		path: 'question-view',
		component: QuestionItemViewComponent,
	},
	{
		path: 'question-list-view',
		component: QuestionListViewComponent,
	},
];

@NgModule({
	imports: [RouterModule.forRoot(routes)],
	exports: [RouterModule],
})
export class AppRoutingModule {}
