import { Component, EventEmitter, Output } from '@angular/core';
import { LibraryService } from '../../library.service';
import { NgForm } from "@angular/forms"
import { ActivatedRoute } from '@angular/router';
import { ReviewDto } from 'src/app/shared/models/review/reviewDto';
import { AccountService } from 'src/app/account/account.service';
import { Review } from 'src/app/shared/models/review/review';

@Component({
  selector: 'app-review-form',
  templateUrl: './review-form.component.html',
  styleUrls: ['./review-form.component.scss']
})
export class ReviewFormComponent {

  constructor(public libraryService: LibraryService, private activatedRoute: ActivatedRoute,
    private accountService: AccountService){
  }

  @Output() reviewAdded: EventEmitter<Review> = new EventEmitter();

  formData : ReviewDto = new ReviewDto();

  onSubmit(form: NgForm) {
    this.accountService.currentUser$.subscribe(currentUser => {
      if (currentUser) {
        this.formData.userId = currentUser.id
        this.formData.audioBookId = +this.activatedRoute.snapshot.paramMap.get('id')!;
        this.formData.rating = +this.formData.rating;
      }
    })
    console.log(this.formData);
    this.libraryService.postNewReview(this.formData).subscribe({
      next: res => {
        console.log(res);
        this.reviewAdded.emit(res); // Передаем новый отзыв обратно
      },
      error: err => {
        console.log(err);
      }
    });
  }
}
