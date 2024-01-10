import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

import { paginationAndSearchParams } from '../shared/models/paramsModels/paginationAndSearchParams';
import { Pagination } from '../shared/models/pagination';

import { Genre } from '../shared/models/adminModels/genre';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  private baseUrl = environment.apiUrl

  constructor(private http: HttpClient) { }

  // Admin dashboard section

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

  // Admin panel section
  getGenresList(paginationAndSearchParams: paginationAndSearchParams){
    let params = new HttpParams();
    params = params.append('PageIndex', paginationAndSearchParams.pageNumber);
    params = params.append('PageSize', paginationAndSearchParams.pageSize);
    if(paginationAndSearchParams.search) params = params.append('search', paginationAndSearchParams.search);

    return this.http.get<Pagination<Genre[]>>(this.baseUrl + 'AdminManagement/genres', { params });
  }
}
