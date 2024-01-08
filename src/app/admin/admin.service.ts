import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  private baseUrl = environment.apiUrl

  constructor(private http: HttpClient) { }

  getUserCount() {
    return this.http.get<number>(this.baseUrl + 'AdminDashboard/user-count');
  }

  getReviewCount() {
    return this.http.get<number>(this.baseUrl + 'AdminDashboard/review-count');
  }

  getAudioBookCount() {
    return this.http.get<number>(this.baseUrl + 'AdminDashboard/audiobook-count');
  }

  getNewUsersCount() {
    return this.http.get<number[]>(this.baseUrl + 'AdminDashboard/user-count-chart');
  }
}
