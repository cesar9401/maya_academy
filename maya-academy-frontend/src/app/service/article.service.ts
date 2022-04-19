import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Article } from '../model/article.model';

@Injectable({
	providedIn: 'root',
})
export class ArticleService {
	private url: string = "http://localhost:8090/maya-academy/api/article";

	constructor(private http: HttpClient) {}

	createArticle(article: Article) {
		return this.http.post<Article>(this.url, article);
	}
}
