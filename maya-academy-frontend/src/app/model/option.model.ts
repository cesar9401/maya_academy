import { Question } from "./question.model";

export class Option {
	optionId: number;
	optionTitle: string;
	correct: boolean;
	question: Question;
}
