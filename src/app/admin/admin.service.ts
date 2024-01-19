import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

import { paginationAndSearchParams } from '../shared/models/paramsModels/paginationAndSearchParams';
import { Pagination } from '../shared/models/pagination';

import { Genre } from '../shared/models/adminModels/genre/genre';
import { Observable } from 'rxjs';
import { UpdateGenre } from '../shared/models/adminModels/genre/updateGenre';
import { Narrator } from '../shared/models/adminModels/narrator/narrator';
import { UpdateNarrator } from '../shared/models/adminModels/narrator/updateNarrator';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  private baseUrl = environment.apiUrl

  constructor(private http: HttpClient) { }

  private getLang(): string {
    return localStorage.getItem('lang') || 'en-US';
  }

  private createHeaders(): HttpHeaders {
    return new HttpHeaders()
      .set('Content-Type', 'application/json')
      .set('Accept-Language', this.getLang());
  }

  // Admin dashboard section
  getUserCount() {
    const headers = this.createHeaders();
    return this.http.get<number>(this.baseUrl + 'AdminDashboard/user-count', { headers: headers, withCredentials: true });
  }

  getReviewCount() {
    const headers = this.createHeaders();
    return this.http.get<number>(this.baseUrl + 'AdminDashboard/review-count', { headers: headers, withCredentials: true });
  }

  getAudioBookCount() {
    const headers = this.createHeaders();
    return this.http.get<number>(this.baseUrl + 'AdminDashboard/audiobook-count', { headers: headers, withCredentials: true });
  }

  getNewUsersCount() {
    const headers = this.createHeaders();
    return this.http.get<number[]>(this.baseUrl + 'AdminDashboard/user-count-chart', { headers: headers, withCredentials: true });
  }

  // Admin panel section
  // Genre section
  getGenresList(paginationAndSearchParams: paginationAndSearchParams) {
    const headers = this.createHeaders();
    let params = new HttpParams();
    params = params.append('PageIndex', paginationAndSearchParams.pageNumber);
    params = params.append('PageSize', paginationAndSearchParams.pageSize);
    if (paginationAndSearchParams.search) params = params.append('search', paginationAndSearchParams.search);

    return this.http.get<Pagination<Genre[]>>(this.baseUrl + 'AdminManagementGenre', { params, headers, withCredentials: true });
  }

  getGenreById(id: string): Observable<Genre>{
    const headers = this.createHeaders();
    return this.http.get<Genre>(this.baseUrl + 'AdminManagementGenre/' + id, { headers: headers, withCredentials: true })
  }

  addGenre(model: any): Observable<Genre> {
    const headers = this.createHeaders();
    return this.http.post<Genre>(this.baseUrl + 'AdminManagementGenre/', model, { headers: headers, withCredentials: true });
  }

  updateGenre(id: string, model: UpdateGenre): Observable<Genre>{
    const headers = this.createHeaders();
    return this.http.put<Genre>(this.baseUrl + 'AdminManagementGenre/' + id, model, { headers: headers, withCredentials: true });
  }

  deleteGenre(id: number){
    const headers = this.createHeaders();
    return this.http.delete<Genre>(this.baseUrl + 'AdminManagementGenre/' + id, { headers: headers, withCredentials: true });
  }

  // Narrator section
  getNarratorsList(paginationAndSearchParams: paginationAndSearchParams) {
    const headers = this.createHeaders();
    let params = new HttpParams();
    params = params.append('PageIndex', paginationAndSearchParams.pageNumber);
    params = params.append('PageSize', paginationAndSearchParams.pageSize);
    if (paginationAndSearchParams.search) params = params.append('search', paginationAndSearchParams.search);

    return this.http.get<Pagination<Narrator[]>>(this.baseUrl + 'AdminManagementNarrator', { params, headers, withCredentials: true });
  }

  getNarratorById(id: string): Observable<Narrator>{
    const headers = this.createHeaders();
    return this.http.get<Narrator>(this.baseUrl + 'AdminManagementNarrator/' + id, { headers: headers, withCredentials: true })
  }

  addNarrator(model: any): Observable<Narrator> {
    const headers = this.createHeaders();
    return this.http.post<Narrator>(this.baseUrl + 'AdminManagementNarrator/', model, { headers: headers, withCredentials: true });
  }

  updateNarrator(id: string, model: UpdateNarrator): Observable<Narrator>{
    const headers = this.createHeaders();
    return this.http.put<Narrator>(this.baseUrl + 'AdminManagementNarrator/' + id, model, { headers: headers, withCredentials: true });
  }

  deleteNarrator(id: number){
    const headers = this.createHeaders();
    return this.http.delete<Narrator>(this.baseUrl + 'AdminManagementNarrator/' + id, { headers: headers, withCredentials: true });
  }
}
