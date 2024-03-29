import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Pagination } from '../shared/models/pagination';
import { AudioBook } from '../shared/models/libraryModels/audiobook';
import { SelectGenre } from '../shared/models/selectModels/selectGenre';
import { filtreingParams } from '../shared/models/paramsModels/filtreingParams';
import { Author } from '../shared/models/libraryModels/author';
import { SelectBookSeries } from '../shared/models/selectModels/selectbookSeries';
import { SelectBookLanguage } from '../shared/models/selectModels/selectBookLanguage';
import { sortingAndPaginationParams } from '../shared/models/paramsModels/sortingAndPaginationParams';
import { SingleAudioBook } from '../shared/models/libraryModels/singleAudioBook';
import { environment } from 'src/environments/environment';
import { Review } from '../shared/models/libraryModels/review/review';
import { ReviewDto } from '../shared/models/libraryModels/review/reviewDto';
import { bookMarkForm } from '../shared/models/libraryModels/bookMarkForm';
import { SelectAuthor } from '../shared/models/selectModels/selectAuthor';
import { SelectNarrator } from '../shared/models/selectModels/selectNarrator';

@Injectable({
  providedIn: 'root'
})
export class LibraryService {

  private baseUrl = environment.apiUrl
  formData: ReviewDto = new ReviewDto();

  private getLang(): string {
    return localStorage.getItem('lang') || 'en-US';
  }

  private createHeaders(): HttpHeaders {
    return new HttpHeaders()
      .set('Content-Type', 'application/json')
      .set('Accept-Language', this.getLang());
  }

  constructor(private http: HttpClient) { }

  getAudioBooksForLibrary(filretingParams: filtreingParams,
    sortingAndPaginationParams: sortingAndPaginationParams)
  {
    let params = new HttpParams();

    if (filretingParams.genreIds && filretingParams.genreIds.length > 0) {
      for (let i = 0; i < filretingParams.genreIds.length; i++) {
        params = params.append('GenreIds', filretingParams.genreIds[i].toString());
      }
    }

    if (filretingParams.authorIds && filretingParams.authorIds.length > 0) {
      for (let i = 0; i < filretingParams.authorIds.length; i++) {
        params = params.append('AuthorIds', filretingParams.authorIds[i].toString());
      }
    }

    if (filretingParams.narratorIds && filretingParams.narratorIds.length > 0) {
      for (let i = 0; i < filretingParams.narratorIds.length; i++) {
        params = params.append('NarratorIds', filretingParams.narratorIds[i].toString());
      }
    }

    if (filretingParams.bookSeriresIds && filretingParams.bookSeriresIds.length > 0) {
      for (let i = 0; i < filretingParams.bookSeriresIds.length; i++) {
        params = params.append('BookSeriesIds', filretingParams.bookSeriresIds[i].toString());
      }
    }

    if (filretingParams.bookLanguageIds && filretingParams.bookLanguageIds.length > 0) {
      for (let i = 0; i < filretingParams.bookLanguageIds.length; i++) {
        params = params.append('BookLanguageIds', filretingParams.bookLanguageIds[i].toString());
      }
    }

    if (filretingParams.genreIdsException && filretingParams.genreIdsException.length > 0) {
      for (let i = 0; i < filretingParams.genreIdsException.length; i++) {
        params = params.append('ExceptGenreIds', filretingParams.genreIdsException[i].toString());
      }
    }

    if (filretingParams.authorIdsException && filretingParams.authorIdsException.length > 0) {
      for (let i = 0; i < filretingParams.authorIdsException.length; i++) {
        params = params.append('ExceptAuthorIds', filretingParams.authorIdsException[i].toString());
      }
    }

    if (filretingParams.narratorIdsException && filretingParams.narratorIdsException.length > 0) {
      for (let i = 0; i < filretingParams.narratorIdsException.length; i++) {
        params = params.append('ExceptNarratorIds', filretingParams.narratorIdsException[i].toString());
      }
    }

    if (filretingParams.bookSeriresIdsException && filretingParams.bookSeriresIdsException.length > 0) {
      for (let i = 0; i < filretingParams.bookSeriresIdsException.length; i++) {
        params = params.append('ExceptBookSeriesIds', filretingParams.bookSeriresIdsException[i].toString());
      }
    }

    if (filretingParams.bookLanguageIdsException && filretingParams.bookLanguageIdsException.length > 0) {
      for (let i = 0; i < filretingParams.bookLanguageIdsException.length; i++) {
        params = params.append('ExceptBookLanguageIds', filretingParams.bookLanguageIdsException[i].toString());
      }
    }

    params = params.append('LowerRating', sortingAndPaginationParams.lowerRating);
    params = params.append('HighRating', sortingAndPaginationParams.highRating);

    params = params.append('LowerDuration', sortingAndPaginationParams.lowerDuration);
    params = params.append('HighDuration', sortingAndPaginationParams.highDuration);

    params = params.append('Sort', sortingAndPaginationParams.sort);

    params = params.append('PageIndex', sortingAndPaginationParams.pageNumber);
    params = params.append('PageSize', sortingAndPaginationParams.pageSize);
    if(sortingAndPaginationParams.search) params = params.append('search', sortingAndPaginationParams.search);


    return this.http.get<Pagination<AudioBook[]>>(this.baseUrl + 'AudioBook', { params });
  }

  getReviewForAudioBook(id: number,
    sortingAndPaginationParams: sortingAndPaginationParams){

      let params = new HttpParams();
      params = params.append('PageIndex', sortingAndPaginationParams.pageNumber);
      params = params.append('PageSize', sortingAndPaginationParams.pageSize);
      params = params.append('Id', id);

      return this.http.get<Pagination<Review[]>>(this.baseUrl + 'Review', { params });
  }

  getAudioBooksOfAuthor(id: number,
    sortingAndPaginationParams: sortingAndPaginationParams)
  {
    let params = new HttpParams();
    params = params.append('PageIndex', sortingAndPaginationParams.pageNumber);
    params = params.append('PageSize', sortingAndPaginationParams.pageSize);
    params = params.append('Id', id);

    return this.http.get<Pagination<AudioBook[]>>(this.baseUrl + 'Author/author-books', { params });

  }
  getAudioBook(id: number){
    const headers = this.createHeaders();
    return this.http.get<SingleAudioBook>(this.baseUrl + 'AudioBook/' + id, { headers: headers, withCredentials: true });
  }

  getGenresForFilter() {
    return this.http.get<SelectGenre[]>(this.baseUrl + 'Filtering/filter-genres');
  }

  getAuthorsForFilter() {
    return this.http.get<SelectAuthor[]>(this.baseUrl + 'Filtering/filter-authors');
  }

  getNarratorsForFilter() {
    return this.http.get<SelectNarrator[]>(this.baseUrl + 'Filtering/filter-narrator');
  }

  getBookSeriesForFilter() {
    return this.http.get<SelectBookSeries[]>(this.baseUrl + 'Filtering/filter-bookSeries');
  }

  getBookLanguagesForFilter() {
    return this.http.get<SelectBookLanguage[]>(this.baseUrl + 'Filtering/filter-bookLanguage');
  }

  incrementViewCount(id: number) {
    const url = `${this.baseUrl}AudioBook/increment-viewcount/${id}`;
    // console.log(url);
    return this.http.put(url, null);
  }

  getAuthorById(id: number){
    return this.http.get<Author>(this.baseUrl+ 'Author/' + id);
  }

  postReview(){
    const headers = this.createHeaders();
    return this.http.post<Review>(this.baseUrl + 'Review', this.formData, { headers: headers, withCredentials: true });
  }

  putReview(){
    const headers = this.createHeaders();
    return this.http.put<Review>(this.baseUrl + 'Review/id?id=' + this.formData.id, this.formData, { headers: headers, withCredentials: true });
  }

  deleteReview(id: number){
    const headers = this.createHeaders();
    return this.http.delete<Review>(this.baseUrl + 'Review/id?id=' + id, { headers: headers, withCredentials: true });
  }

  postBookMark(bookMark: bookMarkForm){
    const headers = this.createHeaders();
    return this.http.post(this.baseUrl + 'UserLibrary', bookMark, { headers: headers, withCredentials: true });
  }
}
