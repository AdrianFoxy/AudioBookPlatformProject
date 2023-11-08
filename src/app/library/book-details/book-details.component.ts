import { Component, OnInit } from '@angular/core';
import { SingleAudioBook } from 'src/app/shared/models/singleAudioBook';
import { LibraryService } from '../library.service';
import { ActivatedRoute } from '@angular/router';
import { LanguageService } from 'src/app/core/services/language-service/language.service';
import { Review } from 'src/app/shared/models/review';
import { sortingAndPaginationParams } from 'src/app/shared/models/audioBooksParams/sortingAndPaginationParams';

@Component({
  selector: 'app-book-details',
  templateUrl: './book-details.component.html',
  styleUrls: ['./book-details.component.scss']
})
export class BookDetailsComponent implements OnInit {

  truncatedText: string = '';
  isExpanded: boolean = false;
  isToggled: boolean = false;

  audiobook?: SingleAudioBook;
  reviews: Review[] = [];

  sortingAndPaginationParams = new sortingAndPaginationParams();
  totalCount = 0;


  constructor(private libraryService: LibraryService, private activatedRoute: ActivatedRoute,
    public langService: LanguageService) {
  }

  async ngOnInit(): Promise<void> {
    await this.incrementViewCount();
    await this.loadSingleAudioBook();
    this.getReviewOfAudioBook();
  }

  getReviewOfAudioBook() {
    const id = this.activatedRoute.snapshot.paramMap.get('id');
    if (id !== null) {
      this.libraryService.getReviewForAudioBook(+id, this.sortingAndPaginationParams).subscribe({
        next: response => {
          this.reviews = response.data;
          this.sortingAndPaginationParams.pageNumber = response.pageIndex;
          this.sortingAndPaginationParams.pageSize = response.pageSize;
          this.totalCount = response.count;
        },
        error: error => console.log(error)
      });
    }
  }

  async incrementViewCount() {
    const id = this.activatedRoute.snapshot.paramMap.get('id');
    if (id !== null) {
      await this.libraryService.incrementViewCount(+id).toPromise();
    }
  }

  async loadSingleAudioBook() {
    const id = this.activatedRoute.snapshot.paramMap.get('id')
    if (id) {
      const audiobook = await this.libraryService.getAudioBook(+id).toPromise();
      this.audiobook = audiobook;
      if (this.audiobook?.description) {
        this.truncateText(this.audiobook.description);
      }
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
      this.isToggled = true;
    }
  }

}
