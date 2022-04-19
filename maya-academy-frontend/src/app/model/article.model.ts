import { Activity } from "./activity.model";

export class Article {
	articleId: number;
	articleName: string;
	articleText: string;
	creationDate: string;
	modificationDate: string;
	activity: Activity;
}
