import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { LibraryService } from '../../library.service';
import { NgForm } from "@angular/forms"
import { ActivatedRoute } from '@angular/router';
import { AccountService } from 'src/app/account/account.service';
import { Review } from 'src/app/shared/models/review/review';
import { ReviewDto } from 'src/app/shared/models/review/reviewDto';

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

  inserReview(form: NgForm){
    this.libraryService.postReview().subscribe({
      next: res => {
        console.log(res);
        this.reviewAdded.emit(res);
        form.resetForm();
        this.libraryService.formData = new ReviewDto();
      },
      error: err => {
        console.log(err);
      }
    });
  }

  updateReview(form: NgForm){
    console.log("put time");
    this.libraryService.putReview().subscribe({
      next: res => {
        console.log(res);
        this.reviewAdded.emit(res);
        form.resetForm();
        this.libraryService.formData = new ReviewDto();
      },
      error: err => {
        console.log(err);
      }
    });
  }

  onSubmit(form: NgForm) {
    if(form.valid){
      this.accountService.currentUser$.subscribe(currentUser => {
        if (currentUser) {
          this.libraryService.formData.userId = currentUser.id
          this.libraryService.formData.audioBookId = +this.activatedRoute.snapshot.paramMap.get('id')!;
          if (this.libraryService.formData.rating !== null && this.libraryService.formData.rating !== undefined) {
            this.libraryService.formData.rating = +this.libraryService.formData.rating;
          }
       }
      })
      if(this.libraryService.formData.id == null)
        this.inserReview(form);
      else
        this.updateReview(form)

      console.log(this.libraryService.formData);
    }
  }

}
