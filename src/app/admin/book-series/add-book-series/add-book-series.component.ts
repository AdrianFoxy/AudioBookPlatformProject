import { Component, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { AdminService } from '../../admin.service';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { LanguageService } from 'src/app/core/services/language.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-add-book-series',
  templateUrl: './add-book-series.component.html',
  styleUrls: ['./add-book-series.component.scss', '../../admin.component.scss']
})
export class AddBookSeriesComponent implements OnDestroy{

  private addBookSeriesSubscription?: Subscription;

  constructor(private adminService: AdminService, private fb: FormBuilder, private toastr: ToastrService,
    public langService: LanguageService) {
  }

  addBookSeriesForm = new FormGroup({
    name: new FormControl('', [Validators.required, Validators.maxLength(254)]),
    enName: new FormControl('', [Validators.required, Validators.maxLength(254)])
  })

  onFormSubmit() {
    const translationKeys = ['Added-Success', 'Something-went-wrong'];
    this.langService.getTranslatedMessages(translationKeys).subscribe((translations: Record<string, string>) => {
      const { 'Added-Success': translatedMessage2, 'Something-went-wrong': translatedMessage1 } = translations;

      if (this.addBookSeriesForm.valid) {
        this.addBookSeriesSubscription = this.adminService.addBookSeries(this.addBookSeriesForm.value).subscribe({
          next: (response) => {
            this.toastr.success(translatedMessage2);
            this.addBookSeriesForm.reset();
          },
          error: (error) => {
            this.toastr.error(translatedMessage1);
          }
        });
      }
    });
  }

  ngOnDestroy(): void {
    this.addBookSeriesSubscription?.unsubscribe();
  }
}
