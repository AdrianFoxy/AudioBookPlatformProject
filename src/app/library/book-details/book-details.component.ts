import { Component, OnInit } from '@angular/core';
import { SingleAudioBook } from 'src/app/shared/models/singleAudioBook';
import { LibraryService } from '../library.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-book-details',
  templateUrl: './book-details.component.html',
  styleUrls: ['./book-details.component.scss']
})
export class BookDetailsComponent implements OnInit {

  truncatedText: string = '';
  isExpanded: boolean = false;

  audiobook?: SingleAudioBook;

  constructor(private libraryService: LibraryService, private activatedRoute: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.loadSingleAudioBook();
  }

  loadSingleAudioBook() {
    const id = this.activatedRoute.snapshot.paramMap.get('id')
    if (id) {
      this.libraryService.getAudioBook(+id).subscribe({
        next: audiobook => {
          this.audiobook = audiobook;
          if (this.audiobook?.description) {
            this.truncateText(this.audiobook.description);
          }
        },
        error: error => console.log(error)
      });
    }
  }

  toggleText(description: string) {
    this.isExpanded = !this.isExpanded;
    if (this.isExpanded) {
      this.truncatedText = description;
    } else {
      this.truncateText(description);
    }
  }

  truncateText(description: string) {
    const maxLength = 300;
    if (description.length <= maxLength) {
      this.truncatedText = description;
    } else {
      this.truncatedText = description.slice(0, maxLength) + '...';
    }
  }

}
