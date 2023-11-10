import { Component, OnInit } from '@angular/core';
import { SingleAudioBook } from 'src/app/shared/models/singleAudioBook';
import { LibraryService } from '../library.service';
import { ActivatedRoute } from '@angular/router';
import { LanguageService } from 'src/app/core/services/language-service/language.service';
import { Review } from 'src/app/shared/models/review/review';
import { sortingAndPaginationParams } from 'src/app/shared/models/audioBooksParams/sortingAndPaginationParams';
import { AccountService } from 'src/app/account/account.service';
import { ReviewDto } from 'src/app/shared/models/review/reviewDto';
import * as moment from 'moment';
import { ToastrService } from 'ngx-toastr';

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

  review?: ReviewDto;

  constructor(private libraryService: LibraryService, private activatedRoute: ActivatedRoute,
    public langService: LanguageService, public accountService: AccountService, private toastr: ToastrService) {
  }

  async ngOnInit(): Promise<void> {
    await this.incrementViewCount();
    await this.loadSingleAudioBook();
    this.getReviewOfAudioBook();
  }

  formatDate(date: string){
    return moment(date).format("YYYY-MM-DD");
  }

  onReviewAdded(newReview: Review) {
    const existingReviewIndex = this.reviews.findIndex(review => review.id === newReview.id);

    if (existingReviewIndex !== -1) {
      this.reviews[existingReviewIndex] = newReview;
    } else {
      this.reviews.push(newReview);
    }
  }

  deleteReview(id: number) {
    this.libraryService.formData = new ReviewDto();

    const translationKeys = ['User-Review', 'Successfully-Delete', 'Confirm-Delete'];
    this.langService.getTranslatedMessages(translationKeys).subscribe((translations: Record<string, string>) => {
      const translatedMessage2 = translations['User-Review'];
      const translatedMessage1 = translations['Successfully-Delete'];
      const translatedMessage3 = translations['Confirm-Delete'];

      if(confirm(translatedMessage3)){
        this.libraryService.deleteReview(id).subscribe({
          next: res => {
            const deletedReviewIndex = this.reviews.findIndex(review => review.id === id);
            if (deletedReviewIndex !== -1) {
              this.reviews.splice(deletedReviewIndex, 1);
            }
            this.toastr.error(`${translatedMessage1}`, `${translatedMessage2}`);
          },
          error: err => {
            console.log(err);
          }
        });
      }
    });

  }


  editReview(selectedReview: Review){
    this.libraryService.formData = Object.assign({}, selectedReview);
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

  onPageChanged(event: any){
    if(this.sortingAndPaginationParams.pageNumber !== event) {
      this.sortingAndPaginationParams.pageNumber = event;
      this.getReviewOfAudioBook();
    }
  }
}
