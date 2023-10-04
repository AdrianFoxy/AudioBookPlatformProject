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
import { LanguageService } from '../core/services/language-service/language.service';

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
    { name: 'За алфавітом', engName: 'Alphabetically', value: 'name' },
    { name: 'Рейтинг: від низького до високого', engName: 'Rating: from low to high', value: 'rateAsc' },
    { name: 'Рейтинг: від високого до низького', engName: 'Rating: from high to low', value: 'rateDesc' },
    { name: 'Час програвання: від низького до високого ', engName: 'Duration: from low to high', value: 'durAsc' },
    { name: 'Час програвання: від високого до низького', engName: 'Duration: from high to low', value: 'durDesc' }
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

  selectedIdGenresException = new FormControl();
  selectedIdAuthorsException = new FormControl();
  selectedIdNarratorsException = new FormControl();
  selectedIdBookSeriesException = new FormControl();
  selectedIdBookLanguagesException = new FormControl();


  constructor(private libraryService: LibraryService, public langService: LanguageService) {
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
    this.selectedIdGenres = new FormControl();
    this.selectedIdAuthors = new FormControl();
    this.selectedIdNarrators = new FormControl();
    this.selectedIdBookSeries = new FormControl();
    this.selectedIdBookLanguages = new FormControl();

    this.selectedIdGenresException = new FormControl();
    this.selectedIdAuthorsException = new FormControl();
    this.selectedIdNarratorsException = new FormControl();
    this.selectedIdBookSeriesException = new FormControl();
    this.selectedIdBookLanguagesException = new FormControl();

    this.getAudioBooksForLibrary();
  }

  onSortSelected(event: any){
    console.log('asdasd');

    this.sortingAndPaginationParams.sort = event.value;
    console.log(this.sortingAndPaginationParams.sort);

    this.getAudioBooksForLibrary();
  }

  sliderStartValue = 0;
  sliderEndValue = 10;

  onSliderChange(event: Event): void {
    const sliderValue = (event.target as HTMLInputElement).value;
    if (event.target === document.querySelector('input[matSliderStartThumb]')) {
      this.sliderStartValue = +sliderValue;
    } else if (event.target === document.querySelector('input[matSliderEndThumb]')) {
      this.sliderEndValue = +sliderValue;
    }
    this.sortingAndPaginationParams.lowerRating = this.sliderStartValue;
    this.sortingAndPaginationParams.highRating = this.sliderEndValue;
    // console.log('Slider Start Value:', this.sliderStartValue);
    // console.log('Slider End Value:', this.sliderEndValue);
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
