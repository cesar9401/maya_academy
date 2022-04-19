import { Article } from "./article.model";
import { Form } from "./form.model";

export class Activity {
	activityId: number;
	userId: number;
	lessonId: number;
	activityType: string;
	article: Article;
	form: Form;
}
