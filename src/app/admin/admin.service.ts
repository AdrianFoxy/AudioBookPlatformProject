import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  private baseUrl = environment.apiUrl

  constructor(private http: HttpClient) { }

  getUserCount() {
    const header = new HttpHeaders().set('Content-type', 'application/json');
    return this.http.get<number>(this.baseUrl + 'AdminDashboard/user-count', { headers: header, withCredentials: true });
  }

  getReviewCount() {
    const header = new HttpHeaders().set('Content-type', 'application/json');
    return this.http.get<number>(this.baseUrl + 'AdminDashboard/review-count', { headers: header, withCredentials: true });
  }

  getAudioBookCount() {
    const header = new HttpHeaders().set('Content-type', 'application/json');
    return this.http.get<number>(this.baseUrl + 'AdminDashboard/audiobook-count', { headers: header, withCredentials: true });
  }

  getNewUsersCount() {
    const header = new HttpHeaders().set('Content-type', 'application/json');
    return this.http.get<number[]>(this.baseUrl + 'AdminDashboard/user-count-chart', { headers: header, withCredentials: true });
  }
}
