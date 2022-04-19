import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddFormComponent } from './add-form/add-form.component';
import { AddLessonComponent } from './add-lesson/add-lesson.component';
import { EditorComponent } from './editor/editor.component';
import { LessonDetailsComponent } from './lesson/lesson-details/lesson-details.component';
import { LessonElementComponent } from './lesson/lesson-element/lesson-element.component';
import { LessonListComponent } from './lesson/lesson-list/lesson-list.component';
import { LessonComponent } from './lesson/lesson.component';

const routes: Routes = [
	{
		path: 'lesson',
		component: LessonComponent,
		canActivate: [],
		children: [
			{ path: '', component: LessonListComponent },
			{ path: 'lesson-list', component: LessonListComponent },
			{ path: 'add-lesson', component: AddLessonComponent },
			{ path: ':lessonId', component: LessonDetailsComponent },
		],
	},
	{ path: 'add-form', component: AddFormComponent },
	{ path: 'add-article', component: EditorComponent },
];

@NgModule({
	imports: [RouterModule.forRoot(routes)],
	exports: [RouterModule],
})
export class AppRoutingModule {}
