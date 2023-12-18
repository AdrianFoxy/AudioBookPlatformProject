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
import { bookMarkForm } from 'src/app/shared/models/bookMarkForm';
import { LoaderService } from 'src/app/core/services/loader-service/loader.service';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-book-details',
  templateUrl: './book-details.component.html',
  styleUrls: ['./book-details.component.scss']
})
export class BookDetailsComponent implements OnInit {

  isExpandedMap: { [key: number]: boolean } = {};

  audiobook?: SingleAudioBook;
  reviews: Review[] = [];

  sortingAndPaginationParams = new sortingAndPaginationParams();
  totalCount = 0;

  review?: ReviewDto;
  audioBookId: number = 0;
  userId: number = 0;

  userLibraryOptions = [
    { name: 'Читаю', engName: 'Reading', value: 1 },
    { name: 'Прочитав', engName: 'Read', value: 2 },
    { name: 'Планую', engName: 'Plan', value: 3 },
    { name: 'Видалити', engName: 'Remove', value: 4 },
  ];

  userLibraryOpt: number = 0;
  private routeParamsSubscription: Subscription = new Subscription();

  constructor(private libraryService: LibraryService, private activatedRoute: ActivatedRoute,
    public langService: LanguageService, public accountService: AccountService, private toastr: ToastrService,
    public loaderService:LoaderService) {
  }

  ngOnInit() {
    this.routeParamsSubscription = this.activatedRoute.params.subscribe(params => {
      this.loadSingleAudioBook();
      this.getReviewOfAudioBook();
    });
  }

  loadSingleAudioBook() {
    const id = this.activatedRoute.snapshot.paramMap.get('id');
    if (id) {
      this.libraryService.getAudioBook(+id).subscribe(audiobook => {
        this.audiobook = audiobook;
        if (this.audiobook) {
          this.audiobook.description = this.audiobook.description.replace(/\r\n/g, '<br>');
          this.audioBookId = this.audiobook.id;
          this.userLibraryOpt = this.audiobook.libraryStatusId;
          this.audiobook.viewCount++;

          this.accountService.currentUser$.subscribe(currentUser => {
            this.userId = currentUser?.id || 0;
          });
        }
      });
    }
    this.incrementViewCount();
  }

  incrementViewCount() {
    const id = this.activatedRoute.snapshot.paramMap.get('id');
    if (id !== null) {
      this.libraryService.incrementViewCount(+id).subscribe(() => {
      });
    }
  }

  toggleExpand(reviewId: number) {
    this.isExpandedMap[reviewId] = !this.isExpandedMap[reviewId];
  }

  // BookMarks methods
  onSortSelected(event: any){
    this.userLibraryOpt = event.value;
    if (event.value === 4) {
      this.userLibraryOpt = 0;
    }
    this.manageBookMark(this.userLibraryOpt);
  }

  manageBookMark(markStatus: number){
    const bookmark: bookMarkForm = {
      userId: this.userId,
      audioBookId: this.audioBookId,
      libraryStatusId: markStatus,
    };
    this.libraryService.postBookMark(bookmark).subscribe();
  }

  // Review methods
  onReviewAdded(newReview: Review) {
    const existingReviewIndex = this.reviews.findIndex(review => review.id === newReview.id);
    if (existingReviewIndex !== -1) {
      this.reviews[existingReviewIndex] = newReview;
    } else {
      this.reviews.unshift(newReview);
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
            this.toastr.error(`${translatedMessage1}`, `${translatedMessage2}`);
            this.getReviewOfAudioBook();
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
    this.sortingAndPaginationParams.pageSize = 4;
    if (id !== null) {
      this.libraryService.getReviewForAudioBook(+id, this.sortingAndPaginationParams).subscribe({
      next: response => {
        this.reviews = response.data;

        this.reviews.forEach(review => {
          if (this.review?.reviewText) {
            review.reviewText = review.reviewText.replace(/\r\n/g, '<br>');
          }
        });

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
      this.getReviewOfAudioBook();
    }
  }

  formatDate(date: string){
    return moment(date).format("YYYY-MM-DD");
  }
}
