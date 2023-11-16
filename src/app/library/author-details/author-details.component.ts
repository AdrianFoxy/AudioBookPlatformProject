import { Component, OnInit } from '@angular/core';
import { Author } from 'src/app/shared/models/author';
import { LibraryService } from '../library.service';
import { ActivatedRoute } from '@angular/router';
import { LanguageService } from 'src/app/core/services/language-service/language.service';
import { LoaderService } from 'src/app/core/services/loader-service/loader.service';
import { AudioBook } from 'src/app/shared/models/audiobook';
import { sortingAndPaginationParams } from 'src/app/shared/models/audioBooksParams/sortingAndPaginationParams';

@Component({
  selector: 'app-author-details',
  templateUrl: './author-details.component.html',
  styleUrls: ['./author-details.component.scss']
})
export class AuthorDetailsComponent implements OnInit {

  author?: Author;
  audioBooks: AudioBook[] = [];
  sortingAndPaginationParams = new sortingAndPaginationParams();
  isExpandedMap: { [key: number]: boolean } = {};

  totalCount = 0;

  constructor(private libraryService: LibraryService, private activatedRoute: ActivatedRoute,
    public langService: LanguageService, public loaderService:LoaderService) {
  }
  ngOnInit(): void {
    this.getAuthor();
    this.getAudioBooksOfAuthorComponent();
  }

  formatDescription(text: string): string {
    return text ? text.replace(/\r\n/g, '<br>') : '';
  }

  toggleExpand(reviewId: number) {
    this.isExpandedMap[reviewId] = !this.isExpandedMap[reviewId];
  }

  getAuthor() {
    const id = this.activatedRoute.snapshot.paramMap.get('id')
    if (id) {
      this.libraryService.getAuthorById(+id).subscribe({
        next: response => {
          this.author = response;
        },
        error: error => console.log(error)
      })
    }
  }

  getAudioBooksOfAuthorComponent() {
    const id = this.activatedRoute.snapshot.paramMap.get('id');

    if (id !== null) {
      this.libraryService.getAudioBooksOfAuthor(+id, this.sortingAndPaginationParams).subscribe({
        next: response => {
          this.audioBooks = response.data;
          this.sortingAndPaginationParams.pageNumber = response.pageIndex;
          this.sortingAndPaginationParams.pageSize = response.pageSize;
          this.totalCount = response.count;
        },
        error: error => console.log(error)
      });
    }
  }

  onPageChanged(event: any){
    if(this.sortingAndPaginationParams.pageNumber !== event) {
      this.sortingAndPaginationParams.pageNumber = event;
      this.getAudioBooksOfAuthorComponent();
    }
  }
}
