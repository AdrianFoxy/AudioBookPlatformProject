import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { AudioBook } from '../models/audiobook';

@Injectable({
  providedIn: 'root'
})
export class RecommendationsService {

  private baseUrl = environment.apiUrl

  constructor(private http: HttpClient) { }

  getRecommedationsByPopularity() {
    return this.http.get<AudioBook[]>(this.baseUrl + 'Recommendation/byPopularity');
  }

  getRecommedationsByRating() {
    return this.http.get<AudioBook[]>(this.baseUrl + 'Recommendation/byRating');
  }
}
