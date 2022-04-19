import { Activity } from "./activity.model";
import { Question } from "./question.model";

export class Form {
	formId: number;
	formName: string;
	description: string;
	creationDate: string;
	minimumCorrects: number;
	total: number;
	questions: Question[];
	activity: Activity;
}
