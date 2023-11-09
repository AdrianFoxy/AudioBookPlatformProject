import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Pagination } from '../shared/models/pagination';
import { AudioBook } from '../shared/models/audiobook';
import { Genre } from '../shared/models/genre';
import { filtreingParams } from '../shared/models/audioBooksParams/filtreingParams';
import { Author } from '../shared/models/author';
import { Narrator } from '../shared/models/narrator';
import { BookSeries } from '../shared/models/bookSeries';
import { BookLanguage } from '../shared/models/bookLanguage';
import { sortingAndPaginationParams } from '../shared/models/audioBooksParams/sortingAndPaginationParams';
import { SingleAudioBook } from '../shared/models/singleAudioBook';
import { environment } from 'src/environments/environment';
import { Review } from '../shared/models/review/review';
import { ReviewDto } from '../shared/models/review/reviewDto';


@Injectable({
  providedIn: 'root'
})
export class LibraryService {

  //baseUrl = 'https://localhost:7088/api/';
  private baseUrl = environment.apiUrl
  // private baseUrl = environment.apiUrl;

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
    const header = new HttpHeaders().set('Content-type', 'application/json');

    return this.http.get<SingleAudioBook>(this.baseUrl + 'AudioBook/' + id, { headers: header, withCredentials: true });
  }

  getGenresForFilter() {
    return this.http.get<Genre[]>(this.baseUrl + 'Filtering/filter-genres');
  }

  getAuthorsForFilter() {
    return this.http.get<Author[]>(this.baseUrl + 'Filtering/filter-authors');
  }

  getNarratorsForFilter() {
    return this.http.get<Narrator[]>(this.baseUrl + 'Filtering/filter-narrator');
  }

  getBookSeriesForFilter() {
    return this.http.get<BookSeries[]>(this.baseUrl + 'Filtering/filter-bookSeries');
  }

  getBookLanguagesForFilter() {
    return this.http.get<BookLanguage[]>(this.baseUrl + 'Filtering/filter-bookLanguage');
  }

  incrementViewCount(id: number) {
    const url = `${this.baseUrl}AudioBook/increment-viewcount/${id}`;
    console.log(url);

    return this.http.put(url, null);
  }

  getAuthorById(id: number){
    return this.http.get<Author>(this.baseUrl+ 'Author/' + id);
  }

  postNewReview(review: ReviewDto){
    const header = new HttpHeaders().set('Content-type', 'application/json');
    return this.http.post<Review>(this.baseUrl + 'Review', review, { headers: header, withCredentials: true });
  }
}
