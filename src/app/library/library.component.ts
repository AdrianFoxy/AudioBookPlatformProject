import { Component, OnInit } from '@angular/core';
import { AudioBook } from '../shared/models/audiobook';
import { LibraryService } from './library.service';

@Component({
  selector: 'app-library',
  templateUrl: './library.component.html',
  styleUrls: ['./library.component.scss']
})
export class LibraryComponent implements OnInit {

  audioBooks: AudioBook[] = [];

  constructor(private libraryService: LibraryService){

  }

  ngOnInit(): void {
    this.libraryService.getAudioBooksForLibrary().subscribe({
      next: response => this.audioBooks = response.data,
      error: error => console.log(error)
    })
  }

}
