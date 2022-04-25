import { Form } from "./form.model";
import { Option } from "./option.model";

export class Question {
	questionId: number;
	formId: number;
	questionTitle: string;
	description: string;
	image: string;
	score: number;
	form: Form;
	options: Option[];
}
