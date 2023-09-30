import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { AudioBook } from '../shared/models/audiobook';
import { LibraryService } from './library.service';
import { Genre } from '../shared/models/genre';
import { FormControl } from '@angular/forms';
import { filtreingParams } from '../shared/models/audioBooksParams/filtreingParams';
import { Author } from '../shared/models/author';
import { Narrator } from '../shared/models/narrator';
import { BookSeries } from '../shared/models/bookSeries';
import { BookLanguage } from '../shared/models/bookLanguage';
import { sortingAndPaginationParams } from '../shared/models/audioBooksParams/sortingAndPaginationParams';

@Component({
  selector: 'app-library',
  templateUrl: './library.component.html',
  styleUrls: ['./library.component.scss']
})
export class LibraryComponent implements OnInit {

  @ViewChild('search') searchTerm?: ElementRef;
  audioBooks: AudioBook[] = [];

  filretingParams = new filtreingParams();
  sortingAndPaginationParams = new sortingAndPaginationParams();

  genres: Genre[] = [];
  authors: Author[] = [];
  narrators: Narrator[] = [];
  bookSeries: BookSeries[] = [];
  bookLanguages: BookLanguage[] = [];

  sortOptions = [
    { name: 'За алфавітом', value: 'name' },
    { name: 'Рейтинг: від низького до високого', value: 'rateAsc' },
    { name: 'Рейтинг: від високого до низького', value: 'rateDesc' },
  ];

  totalCount = 0;

  // Search string for filtering params
  searchCtrl = new FormControl();
  // Filter params Ids
  selectedIdGenres = new FormControl();
  selectedIdAuthors = new FormControl();
  selectedIdNarrators = new FormControl();
  selectedIdBookSeries = new FormControl();
  selectedIdBookLanguages = new FormControl();

  constructor(private libraryService: LibraryService) {
  }

  ngOnInit(): void {

    this.getAudioBooksForLibrary();

    this.getGenreForFilter();
    this.getAuthorForFilter();
    this.getNarratorForFilter();
    this.getBookLanguagesForFilter();
    this.getBookSeriesForFilter();
  }

  getAudioBooksForLibrary() {
    this.libraryService.getAudioBooksForLibrary(this.filretingParams, this.sortingAndPaginationParams).subscribe({
      next: response => {
        this.audioBooks = response.data;
        this.sortingAndPaginationParams.pageNumber = response.pageIndex;
        console.log(response.pageIndex);
        this.sortingAndPaginationParams.pageSize = response.pageSize;
        console.log(response.pageSize);
        this.totalCount = response.count;
      },
      error: error => console.log(error)
    })
  }

  getGenreForFilter() {
    this.libraryService.getGenresForFilter().subscribe({
      next: response => this.genres = response,
      error: error => console.log(error)
    })
  }

  getAuthorForFilter() {
    this.libraryService.getAuthorsForFilter().subscribe({
      next: response => this.authors = response,
      error: error => console.log(error)
    })
  }

  getNarratorForFilter() {
    this.libraryService.getNarratorsForFilter().subscribe({
      next: response => this.narrators = response,
      error: error => console.log(error)
    })
  }

  getBookLanguagesForFilter(){
    this.libraryService.getBookLanguagesForFilter().subscribe({
      next: response => this.bookLanguages = response,
      error: error => console.log(error)
    })
  }

  getBookSeriesForFilter(){
    this.libraryService.getBookSeriesForFilter().subscribe({
      next: response => this.bookSeries = response,
      error: error => console.log(error)
    })
  }

  onSearch(){
    this.sortingAndPaginationParams.search = this.searchTerm?.nativeElement.value;
    this.sortingAndPaginationParams.pageNumber = 1;
    this.getAudioBooksForLibrary();
  }

  onReset(){
    if(this.searchTerm) this.searchTerm.nativeElement.value = '';
    this.filretingParams = new filtreingParams();
    this.getAudioBooksForLibrary();
  }

  onSortSelected(event: any){
    this.sortingAndPaginationParams.sort = event.target.value;
    console.log(this.sortingAndPaginationParams.sort);

    this.getAudioBooksForLibrary();
  }

  onPageChanged(event: any){
    if(this.sortingAndPaginationParams.pageNumber !== event) {
      this.sortingAndPaginationParams.pageNumber = event;
      this.getAudioBooksForLibrary();
    }
  }

  // Get selected ids of entities for filtering
  onFilterSelected<T extends number | string>(selectedIds: T[], filretingParamsProperty: keyof filtreingParams) {
    this.filretingParams[filretingParamsProperty] = selectedIds as number[];
    this.sortingAndPaginationParams.pageNumber = 1;
    this.getAudioBooksForLibrary();
  }

  // Remove props from filtering
  onFilterRemoved(item: string, control: FormControl) {
    const itemsInFilter = control.value as string[];
    this.removeFirst(itemsInFilter, item);
    control.setValue(itemsInFilter);
    this.getAudioBooksForLibrary();
  }

  private removeFirst<T>(array: T[], toRemove: T): void {
    const index = array.indexOf(toRemove);
    if (index !== -1) {
      array.splice(index, 1);
    }
  }

  // get ids
  getByIds(ids: number[], source: any[]): any[] {
    if (ids === null) {
      return [];
    }
    return ids.map((id) => {
      return source.find((item) => item.id == id);
    });
  }


  formatLabel(value: number): string {
    if (value >= 1000) {
      return Math.round(value / 1000) + 'k';
    }

    return `${value}`;
  }

}
