import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Article } from '../model/article.model';
import { environment } from 'src/environments/environment';

@Injectable({
	providedIn: 'root',
})
export class ArticleService {
	private url: string = `${environment.apiURL}/article`;
	private headers: {};

	constructor(private http: HttpClient) {
		this.headers = {
			headers: new HttpHeaders({
				Authorization: localStorage.getItem('current_user') ?? '',
			}),
		};
	}

	createArticle(article: Article) {
		return this.http.post<Article>(this.url, article, this.headers);
	}

	updateArticle(article: Article) {
		return this.http.put<Article>(this.url, article, this.headers);
	}
}
