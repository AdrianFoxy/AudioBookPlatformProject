import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { AudioBook } from '../shared/models/libraryModels/audiobook';
import { LibraryService } from './library.service';
import { Genre } from '../shared/models/libraryModels/genre';
import { FormControl } from '@angular/forms';
import { filtreingParams } from '../shared/models/paramsModels/filtreingParams';
import { Author } from '../shared/models/libraryModels/author';
import { Narrator } from '../shared/models/libraryModels/narrator';
import { BookSeries } from '../shared/models/libraryModels/bookSeries';
import { BookLanguage } from '../shared/models/libraryModels/bookLanguage';
import { sortingAndPaginationParams } from '../shared/models/paramsModels/sortingAndPaginationParams';
import { LanguageService } from '../core/services/language-service/language.service';
import { LoaderService } from '../core/services/loader-service/loader.service';

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
    { name: 'Популярність', engName: 'Popularity', value: 'popularity' },
    { name: 'Рейтинг: від низького до високого', engName: 'Rating: from low to high', value: 'rateAsc' },
    { name: 'Рейтинг: від високого до низького', engName: 'Rating: from high to low', value: 'rateDesc' },
    { name: 'Час програвання: від низького до високого ', engName: 'Duration: from low to high', value: 'durAsc' },
    { name: 'Час програвання: від високого до низького', engName: 'Duration: from high to low', value: 'durDesc' },
  ];

  selectedChips: any[] = [];
  lowerDurationValue: number = 0;
  highDurationValue: number = 0;


  chipsDurationOptions = [
    {min: 0, max: 1, selected: false},
    {min: 1, max: 2, selected: false},
    {min: 2, max: 5, selected: false},
    {min: 5, max: 10, selected: false},
    {min: 10, max: 15, selected: false},
    {min: 15, max: 20, selected: false},
    {min: 20, max: 25, selected: false},
    {min: 25, max: 30, selected: false},
    {min: 30, max: 35, selected: false},
    {min: 35, max: 40, selected: false},
    {min: 40, max: 100000, selected: false}

  ]

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


  constructor(private libraryService: LibraryService, public langService: LanguageService,
    public loaderService:LoaderService) {
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
        // console.log(response.pageIndex);
        this.sortingAndPaginationParams.pageSize = response.pageSize;
        // console.log(response.pageSize);
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
    this.sortingAndPaginationParams.search = this.searchTerm?.nativeElement.value;

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

    this.sortingAndPaginationParams.sort = 'name';

    this.chipsDurationOptions.forEach(chip => chip.selected = false);
    this.selectedChips = [];
    this.sortingAndPaginationParams.lowerDuration = 0;
    this.sortingAndPaginationParams.highDuration = 0;
    this.sortingAndPaginationParams.lowerRating = 0;
    this.sortingAndPaginationParams.highRating = 5;
    this.sliderStartValue = 0;
    this.sliderEndValue = 5;

    this.getAudioBooksForLibrary();
  }

  onSortSelected(event: any){
    this.sortingAndPaginationParams.sort = event.value;
    console.log(this.sortingAndPaginationParams.sort);

    this.getAudioBooksForLibrary();
  }

  sliderStartValue = 0;
  sliderEndValue = 5;

  onSliderChange(event: Event): void {
    const sliderValue = (event.target as HTMLInputElement).value;
    if (event.target === document.querySelector('input[matSliderStartThumb]')) {
      this.sliderStartValue = +sliderValue;
    } else if (event.target === document.querySelector('input[matSliderEndThumb]')) {
      this.sliderEndValue = +sliderValue;
    }
    this.sortingAndPaginationParams.lowerRating = this.sliderStartValue;
    this.sortingAndPaginationParams.highRating = this.sliderEndValue;
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

  chipSelectionChange(chip: any) {
    const index = this.selectedChips.indexOf(chip);

    if (index === -1) {
      if (this.selectedChips.length >= 2) {
        const chipIndex = this.chipsDurationOptions.findIndex((option) => option === chip);
        if (chipIndex > 0) {
          const prevChip = this.chipsDurationOptions[chipIndex - 1];

          const lastSelectedChip = this.selectedChips[this.selectedChips.length - 1];
          const lastIndex = this.chipsDurationOptions.findIndex(option => option === lastSelectedChip);

          if (lastIndex < chipIndex){
            // console.log("JUST ADD NEW");
            this.selectedChips.pop();
            this.selectedChips.push(chip);
          }
          else if (!this.selectedChips.includes(prevChip)) {
            // console.log("ADDED PREV");
            this.selectedChips.pop();
            this.selectedChips.push(prevChip);
          }
          else {
            // console.log("JUST DELETE");
            this.selectedChips.pop();
          }
        }
      } else {
        this.selectedChips.push(chip);
      }
    } else {
      this.selectedChips.splice(index, 1);
    }

    this.updateMinMaxValues();
    this.activateChipsBetweenSelected();

    this.sortingAndPaginationParams.lowerDuration = this.lowerDurationValue * 3600;
    this.sortingAndPaginationParams.highDuration = this.highDurationValue * 3600;

    this.getAudioBooksForLibrary();
  }


  activateChipsBetweenSelected() {
    // Sort selectedChips by min
    this.selectedChips.sort((a, b) => a.min - b.min);

    // If selectedChips have only 1 value
    if (this.selectedChips.length === 1) {
      const selectedChip = this.selectedChips[0];

      // Set selected: true for choosen chip and selected: false for everything else
      this.chipsDurationOptions.forEach(chip => {
        chip.selected = chip === selectedChip;
      });
    } else {
      // Reset flag selected to false
      this.chipsDurationOptions.forEach(chip => {
        chip.selected = false;
      });

      // Set selected: true for chips between choosen
      for (let i = 0; i < this.selectedChips.length - 1; i++) {
        const currentChip = this.selectedChips[i];
        const nextChip = this.selectedChips[i + 1];

        const startIndex = this.chipsDurationOptions.indexOf(currentChip);
        const endIndex = this.chipsDurationOptions.indexOf(nextChip);

        if (startIndex !== -1 && endIndex !== -1) {
          for (let j = startIndex; j <= endIndex; j++) {
            this.chipsDurationOptions[j].selected = true;
          }
        }
      }
    }
  }


  updateMinMaxValues() {
    if (this.selectedChips.length > 0) {
      this.lowerDurationValue = Math.min(...this.selectedChips.map(chip => chip.min));
      this.highDurationValue = Math.max(...this.selectedChips.map(chip => chip.max || 0));
    } else {
      this.lowerDurationValue = 0;
      this.highDurationValue = 0;
    }
  }
}
