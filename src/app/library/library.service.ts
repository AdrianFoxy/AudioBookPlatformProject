import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Pagination } from '../shared/models/pagination';
import { AudioBook } from '../shared/models/audiobook';
import { Genre } from '../shared/models/genre';

@Injectable({
  providedIn: 'root'
})
export class LibraryService {

  baseUrl = 'https://localhost:7088/api/';

  constructor(private http: HttpClient) { }

  getAudioBooksForLibrary(){
    return this.http.get<Pagination<AudioBook[]>>(this.baseUrl + 'AudioBook');
  }

  getGenresForFilter(){
    return this.http.get<Genre[]>(this.baseUrl + 'Filtering/filter-genres');
  }
}
