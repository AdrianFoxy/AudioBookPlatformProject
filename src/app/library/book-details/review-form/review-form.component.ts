import { Component, EventEmitter, Output } from '@angular/core';
import { LibraryService } from '../../library.service';
import { FormControl, FormGroup, NgForm, Validators } from "@angular/forms"
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
  selection: any;

  constructor(public libraryService: LibraryService, private activatedRoute: ActivatedRoute,
    private accountService: AccountService){
  }

  @Output() reviewAdded: EventEmitter<Review> = new EventEmitter();

  formData : ReviewDto = new ReviewDto();

  onSubmit(form: NgForm) {
    if(form.valid){
      this.accountService.currentUser$.subscribe(currentUser => {
        if (currentUser) {
          this.formData.userId = currentUser.id
          this.formData.audioBookId = +this.activatedRoute.snapshot.paramMap.get('id')!;
          if (this.formData.rating !== null && this.formData.rating !== undefined) {
            this.formData.rating = +this.formData.rating;
          }
       }
      })
      console.log(this.formData);
      this.libraryService.postNewReview(this.formData).subscribe({
        next: res => {
          console.log(res);
          this.reviewAdded.emit(res);
        },
        error: err => {
          console.log(err);
        }
      });
    }
  }

}
