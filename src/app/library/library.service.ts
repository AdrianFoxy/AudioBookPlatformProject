import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Pagination } from '../shared/models/pagination';
import { AudioBook } from '../shared/models/audiobook';
import { Genre } from '../shared/models/genre';
import { filretingParams } from '../shared/models/audioBooksParams/filretingParams';
import { Author } from '../shared/models/author';
import { Narrator } from '../shared/models/narrator';
import { BookSeries } from '../shared/models/bookSeries';
import { BookLanguage } from '../shared/models/bookLanguage';
import { sortingAndPaginationParams } from '../shared/models/audioBooksParams/sortingAndPaginationParams';


@Injectable({
  providedIn: 'root'
})
export class LibraryService {

  baseUrl = 'https://localhost:7088/api/';

  constructor(private http: HttpClient) { }

  getAudioBooksForLibrary(filretingParams: filretingParams,
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

    if(sortingAndPaginationParams.sort) params = params.append('Sort', sortingAndPaginationParams.sort);

    return this.http.get<Pagination<AudioBook[]>>(this.baseUrl + 'AudioBook', { params });
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
}
