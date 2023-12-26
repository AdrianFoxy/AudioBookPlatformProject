import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { LibraryService } from '../../library.service';
import { NgForm } from "@angular/forms"
import { ActivatedRoute } from '@angular/router';
import { AccountService } from 'src/app/account/account.service';
import { Review } from 'src/app/shared/models/review/review';
import { ReviewDto } from 'src/app/shared/models/review/reviewDto';
import { ToastrService } from 'ngx-toastr';
import { LanguageService } from 'src/app/core/services/language-service/language.service';

@Component({
  selector: 'app-review-form',
  templateUrl: './review-form.component.html',
  styleUrls: ['./review-form.component.scss']
})
export class ReviewFormComponent {

  constructor(public libraryService: LibraryService, private activatedRoute: ActivatedRoute,
    private accountService: AccountService, private toastr: ToastrService, public langService: LanguageService){
  }

  @Output() reviewAdded: EventEmitter<Review> = new EventEmitter();

  inserReview(form: NgForm){
    this.libraryService.postReview().subscribe({
      next: res => {
        // console.log(res);
        this.reviewAdded.emit(res);
        form.resetForm();
        this.libraryService.formData = new ReviewDto();

        const translationKeys = ['User-Review', 'Successfully-Insert'];
        this.langService.getTranslatedMessages(translationKeys).subscribe((translations: Record<string, string>) => {
          const translatedMessage2 = translations['User-Review'];
          const translatedMessage1 = translations['Successfully-Insert'];
          this.toastr.success(`${translatedMessage1}`, `${translatedMessage2}`);
        });
      },
      error: err => {
        console.log(err);
      }
    });
  }

  updateReview(form: NgForm){
    this.libraryService.putReview().subscribe({
      next: res => {
        this.reviewAdded.emit(res);
        form.resetForm();
        this.libraryService.formData = new ReviewDto();

        const translationKeys = ['User-Review', 'Successfully-Update'];
        this.langService.getTranslatedMessages(translationKeys).subscribe((translations: Record<string, string>) => {
          const translatedMessage2 = translations['User-Review'];
          const translatedMessage1 = translations['Successfully-Update'];
          this.toastr.info(`${translatedMessage1}`, `${translatedMessage2}`);
        });

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

      // console.log(this.libraryService.formData);
    }
  }

}
