import { Component, OnDestroy } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { AdminService } from '../../admin.service';
import { Subscription } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { LanguageService } from 'src/app/core/services/language.service';

@Component({
  selector: 'app-add-genre',
  templateUrl: './add-genre.component.html',
  styleUrls: ['./add-genre.component.scss', '../../admin.component.scss']
})
export class AddGenreComponent implements OnDestroy {

  // addGenreForm: FormGroup;
  private addGenreSubscription?: Subscription;

  constructor(private adminService: AdminService, private fb: FormBuilder, private toastr: ToastrService,
    public langService: LanguageService) {
  }

  addGenreForm = new FormGroup({
    name: new FormControl('', [Validators.required, Validators.maxLength(50)]),
    enName: new FormControl('', [Validators.required, Validators.maxLength(50)])
  })

  onFormSubmit() {
    const translationKeys = ['Added-Success', 'Something-went-wrong'];
    this.langService.getTranslatedMessages(translationKeys).subscribe((translations: Record<string, string>) => {
      const { 'Added-Success': translatedMessage2, 'Something-went-wrong': translatedMessage1 } = translations;

      if (this.addGenreForm.valid) {
        this.addGenreSubscription = this.adminService.addGenre(this.addGenreForm.value).subscribe({
          next: (response) => {
            this.toastr.success(translatedMessage2);
            // The problem is that after resetting the field they get an error, bcs it is empty
            this.addGenreForm.reset();
            Object.keys(this.addGenreForm.controls).forEach(controlName => {
              const control = this.addGenreForm.get(controlName);
              control?.setErrors(null);
            });
            this.addGenreForm.setErrors({ 'invalid': true });
          },
          error: (error) => {
            this.toastr.error(translatedMessage1);
          }
        });
      }
    });
  }

  resetForm() {
    this.addGenreForm.reset({});
    this.addGenreForm.setErrors({ 'invalid': true });
  }


  ngOnDestroy(): void {
    this.addGenreSubscription?.unsubscribe();
  }
}
