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
import { BookSeries } from '../shared/models/adminModels/book-series/book-series';
import { UpdateBookSeries } from '../shared/models/adminModels/book-series/updateBookSeries';
import { BookLanguage } from '../shared/models/adminModels/book-language/bookLanguage';
import { UpdateBookLanguage } from '../shared/models/adminModels/book-language/updateBookLanguage';
import { Author } from '../shared/models/adminModels/author/author';
import { updateAuthor } from '../shared/models/adminModels/author/updateAuthor';
import { AudioBookInList } from '../shared/models/adminModels/audiobook/audiobookInList';
import { AddAudioBook } from '../shared/models/adminModels/audiobook/addAudioBook';
import { AudioBook } from '../shared/models/adminModels/audiobook/audiobook';
import { UpdateAudioBook } from '../shared/models/adminModels/audiobook/updateAudioBook';

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

  // BookSeries section
  getBookSeriesList(paginationAndSearchParams: paginationAndSearchParams) {
    const headers = this.createHeaders();
    let params = new HttpParams();
    params = params.append('PageIndex', paginationAndSearchParams.pageNumber);
    params = params.append('PageSize', paginationAndSearchParams.pageSize);
    if (paginationAndSearchParams.search) params = params.append('search', paginationAndSearchParams.search);

    return this.http.get<Pagination<BookSeries[]>>(this.baseUrl + 'AdminManagementBookSeries', { params, headers, withCredentials: true });
  }

  getBookSeriesById(id: string): Observable<BookSeries>{
    const headers = this.createHeaders();
    return this.http.get<BookSeries>(this.baseUrl + 'AdminManagementBookSeries/' + id, { headers: headers, withCredentials: true })
  }

  addBookSeries(model: any): Observable<BookSeries> {
    const headers = this.createHeaders();
    return this.http.post<BookSeries>(this.baseUrl + 'AdminManagementBookSeries/', model, { headers: headers, withCredentials: true });
  }

  updateBookSeries(id: string, model: UpdateBookSeries): Observable<BookSeries>{
    const headers = this.createHeaders();
    return this.http.put<BookSeries>(this.baseUrl + 'AdminManagementBookSeries/' + id, model, { headers: headers, withCredentials: true });
  }

  deleteBookSeries(id: number){
    const headers = this.createHeaders();
    return this.http.delete<BookSeries>(this.baseUrl + 'AdminManagementBookSeries/' + id, { headers: headers, withCredentials: true });
  }

  // BookLanguage section
  getBookLanguageList(paginationAndSearchParams: paginationAndSearchParams) {
    const headers = this.createHeaders();
    let params = new HttpParams();
    params = params.append('PageIndex', paginationAndSearchParams.pageNumber);
    params = params.append('PageSize', paginationAndSearchParams.pageSize);
    if (paginationAndSearchParams.search) params = params.append('search', paginationAndSearchParams.search);

    return this.http.get<Pagination<BookLanguage[]>>(this.baseUrl + 'AdminManagementLanguage', { params, headers, withCredentials: true });
  }

  getBookLanguageById(id: string): Observable<BookLanguage> {
    const headers = this.createHeaders();
    return this.http.get<BookLanguage>(this.baseUrl + 'AdminManagementLanguage/' + id, { headers: headers, withCredentials: true })
  }

  addBookLanguage(model: any): Observable<BookLanguage> {
    const headers = this.createHeaders();
    return this.http.post<BookLanguage>(this.baseUrl + 'AdminManagementLanguage/', model, { headers: headers, withCredentials: true });
  }

  updateBookLanguage(id: string, model: UpdateBookLanguage): Observable<BookLanguage> {
    const headers = this.createHeaders();
    return this.http.put<BookLanguage>(this.baseUrl + 'AdminManagementLanguage/' + id, model, { headers: headers, withCredentials: true });
  }

  deleteBookLanguage(id: number) {
    const headers = this.createHeaders();
    return this.http.delete<BookLanguage>(this.baseUrl + 'AdminManagementLanguage/' + id, { headers: headers, withCredentials: true });
  }

  // Author section
  getAuthorList(paginationAndSearchParams: paginationAndSearchParams) {
    const headers = this.createHeaders();
    let params = new HttpParams();
    params = params.append('PageIndex', paginationAndSearchParams.pageNumber);
    params = params.append('PageSize', paginationAndSearchParams.pageSize);
    if (paginationAndSearchParams.search) params = params.append('search', paginationAndSearchParams.search);

    return this.http.get<Pagination<Author[]>>(this.baseUrl + 'AdminManagementAuthor', { params, headers, withCredentials: true });
  }

  getAuthorById(id: string): Observable<Author> {
    const headers = this.createHeaders();
    return this.http.get<Author>(this.baseUrl + 'AdminManagementAuthor/' + id, { headers: headers, withCredentials: true })
  }

  addAuthor(model: any) {
    const headers = new HttpHeaders().set('Accept-Language', this.getLang());

    const formData = new FormData();
    formData.append("name", model.name);
    formData.append("enName", model.enName);
    formData.append("description", model.description);
    formData.append("enDescription", model.enDescription);
    formData.append("picture", model.picture);

    return this.http.post(this.baseUrl + 'AdminManagementAuthor', formData, { headers, withCredentials: true });
  }

  updateAuthor(id: string, model: updateAuthor): Observable<Author> {
    const headers = new HttpHeaders().set('Accept-Language', this.getLang());

    const formData = new FormData();
    formData.append("name", model.name);
    formData.append("enName", model.enName);
    formData.append("description", model.description);
    formData.append("enDescription", model.enDescription);
    formData.append("picture", model.picture);

    return this.http.put<Author>(this.baseUrl + 'AdminManagementAuthor/' + id, formData, { headers: headers, withCredentials: true });

  }

  deleteAuthor(id: number) {
    const headers = this.createHeaders();
    return this.http.delete<Author>(this.baseUrl + 'AdminManagementAuthor/' + id, { headers: headers, withCredentials: true });
  }

  // AudioBook Section
  getAudioBooksList(paginationAndSearchParams: paginationAndSearchParams) {
    const headers = this.createHeaders();
    let params = new HttpParams();
    params = params.append('PageIndex', paginationAndSearchParams.pageNumber);
    params = params.append('PageSize', paginationAndSearchParams.pageSize);
    if (paginationAndSearchParams.search) params = params.append('search', paginationAndSearchParams.search);

    return this.http.get<Pagination<AudioBookInList[]>>(this.baseUrl + 'AdminManagmentAudioBook', { params, headers, withCredentials: true });
  }

  getAudioBookById(id: string): Observable<AudioBook> {
    const headers = this.createHeaders();
    return this.http.get<AudioBook>(this.baseUrl + 'AdminManagmentAudioBook/' + id, { headers: headers, withCredentials: true })
  }

  addAudioBook(model: AddAudioBook) {
    const headers = new HttpHeaders().set('Accept-Language', this.getLang());

    const formData = new FormData();
    formData.append("name", model.name);
    formData.append("description", model.description);
    formData.append("bookLanguageId", String(model.bookLanguageId));
    formData.append("narratorId", String(model.narratorId));
    formData.append("bookSeriesId", String(model.bookSeriesId));
    formData.append("orderInSeries", String(model.orderInSeries));

    if (model.authorsIds && Array.isArray(model.authorsIds)) {
      model.authorsIds.forEach((authorId: number) => {
        formData.append("authorsIds", String(authorId));
      });
    }

    if (model.genresIds && Array.isArray(model.genresIds)) {
      model.genresIds.forEach((genreId: number) => {
        formData.append("genresIds", String(genreId));
      });
    }

    if (model.audioFiles && Array.isArray(model.audioFiles)) {
      const audioFilesJsonString = JSON.stringify(model.audioFiles);
      formData.append("AudioFiles", audioFilesJsonString);
    }

    if (model.picture) {
      formData.append("picture", model.picture);
    }

    return this.http.post(this.baseUrl + 'AdminManagmentAudioBook', formData, { headers, withCredentials: true });
  }

  updateAudioBook(model: UpdateAudioBook){
    const headers = new HttpHeaders().set('Accept-Language', this.getLang());

    const formData = new FormData();
    formData.append("name", model.name);
    formData.append("description", model.description);
    formData.append("bookLanguageId", String(model.bookLanguageId));
    formData.append("narratorId", String(model.narratorId));
    formData.append("bookSeriesId", String(model.bookSeriesId));
    formData.append("orderInSeries", String(model.orderInSeries));

    if (model.authorsIds && Array.isArray(model.authorsIds)) {
      model.authorsIds.forEach((authorId: number) => {
        formData.append("authorsIds", String(authorId));
      });
    }

    if (model.genresIds && Array.isArray(model.genresIds)) {
      model.genresIds.forEach((genreId: number) => {
        formData.append("genresIds", String(genreId));
      });
    }

    if (model.audioFilesToDelete && Array.isArray(model.audioFilesToDelete)) {
      model.audioFilesToDelete.forEach((deleteId: number) => {
        formData.append("audioFilesToDelete", String(deleteId));
      });
    }

    if (model.audioFiles && Array.isArray(model.audioFiles)) {
      const audioFilesJsonString = JSON.stringify(model.audioFiles);
      formData.append("AudioFiles", audioFilesJsonString);
    }

    if (model.picture) {
      formData.append("picture", model.picture);
    }

    return this.http.put(this.baseUrl + 'AdminManagmentAudioBook/' + model.id, formData, { headers, withCredentials: true });
  }

  deleteAudiobook(id: number) {
    const headers = this.createHeaders();
    return this.http.delete<AudioBook>(this.baseUrl + 'AdminManagmentAudioBook/' + id, { headers: headers, withCredentials: true });
  }

}
