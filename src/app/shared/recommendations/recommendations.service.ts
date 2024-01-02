import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { AudioBook } from '../models/audiobook';

@Injectable({
  providedIn: 'root'
})
export class RecommendationsService {

  private baseUrl = environment.apiUrl

  private readonly maxRecentBooks = 5;
  private readonly recentBooksKey = 'recentBooks';

  constructor(private http: HttpClient) { }

  getRecommedationsByPopularity() {
    return this.http.get<AudioBook[]>(this.baseUrl + 'Recommendation/byPopularity');
  }

  getRecommedationsByRating() {
    return this.http.get<AudioBook[]>(this.baseUrl + 'Recommendation/byRating');
  }

  getRecentlyWatched() {
    const recentBooks = this.getRecentBooks();
    let params = new HttpParams();

    if (recentBooks.length > 0) {
      for (let i = 0; i < recentBooks.length; i++) {
        params = params.append('audioBooksIds', recentBooks[i].toString());
      }
    }

    return this.http.get<AudioBook[]>(this.baseUrl + 'Recommendation/recentlyWatched', { params });
  }




  private getRecentBooks(): number[] {
    const recentBooks = JSON.parse(localStorage.getItem(this.recentBooksKey) || '[]') as number[];
    return recentBooks.slice(0, this.maxRecentBooks);
  }
}
