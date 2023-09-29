import { Component, OnInit } from '@angular/core';
import { AudioBook } from '../shared/models/audiobook';
import { LibraryService } from './library.service';
import { Genre } from '../shared/models/genre';

@Component({
  selector: 'app-library',
  templateUrl: './library.component.html',
  styleUrls: ['./library.component.scss']
})
export class LibraryComponent implements OnInit {

  audioBooks: AudioBook[] = [];
  sortOptions = [
    {name: 'За алфавітом', value: 'name'},
    {name: 'Рейтинг: від нізького до виского', value: 'rateAsc'},
    {name: 'Рейтинг: від високого до нізького', value: 'rateDesc'},
  ];

  constructor(private libraryService: LibraryService){
  }

  ngOnInit(): void {
    this.libraryService.getAudioBooksForLibrary().subscribe({
      next: response => this.audioBooks = response.data,
      error: error => console.log(error)
    })
  }

  formatLabel(value: number): string {
    if (value >= 1000) {
      return Math.round(value / 1000) + 'k';
    }

    return `${value}`;
  }


}
