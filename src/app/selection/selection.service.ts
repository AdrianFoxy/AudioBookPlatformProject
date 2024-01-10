import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Selection } from '../shared/models/libraryModels/selection';
import { sortingAndPaginationParams } from '../shared/models/paramsModels/sortingAndPaginationParams';
import { Pagination } from '../shared/models/pagination';
import { AudioBook } from '../shared/models/libraryModels/audiobook';

@Injectable({
  providedIn: 'root'
})
export class SelectionService {

  private baseUrl = environment.apiUrl

  constructor(private http: HttpClient) { }

  getSelections() {
    return this.http.get<Selection[]>(this.baseUrl + 'Selection');
  }

  getSingleSelection(id: number){
    return this.http.get<Selection>(this.baseUrl + 'Selection/' + id);
  }

  getAudioBooksOfSelection(id: number,
    sortingAndPaginationParams: sortingAndPaginationParams)
  {
    let params = new HttpParams();
    params = params.append('PageIndex', sortingAndPaginationParams.pageNumber);
    params = params.append('PageSize', sortingAndPaginationParams.pageSize);
    params = params.append('Id', id);

    return this.http.get<Pagination<AudioBook[]>>(this.baseUrl + 'Selection/selection-books', { params });

  }
}
