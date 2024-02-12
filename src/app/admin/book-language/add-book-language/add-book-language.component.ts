import { Component, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { AdminService } from '../../admin.service';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { LanguageService } from 'src/app/core/services/language.service';

@Component({
  selector: 'app-add-book-language',
  templateUrl: './add-book-language.component.html',
  styleUrls: ['./add-book-language.component.scss', '../../admin.component.scss']
})
export class AddBookLanguageComponent implements OnDestroy {

  private addBookLanguageSubscription?: Subscription;

  constructor(private adminService: AdminService, private fb: FormBuilder, private toastr: ToastrService,
    public langService: LanguageService) {
  }

  addBookLanguageForm = new FormGroup({
    name: new FormControl('', [Validators.required, Validators.maxLength(100)]),
    enName: new FormControl('', [Validators.required, Validators.maxLength(100)])
  })

  onFormSubmit() {
    const translationKeys = ['Added-Success', 'Something-went-wrong'];
    this.langService.getTranslatedMessages(translationKeys).subscribe((translations: Record<string, string>) => {
      const { 'Added-Success': translatedMessage2, 'Something-went-wrong': translatedMessage1 } = translations;

      if (this.addBookLanguageForm.valid) {
        this.addBookLanguageSubscription = this.adminService.addBookLanguage(this.addBookLanguageForm.value).subscribe({
          next: (response) => {
            this.toastr.success(translatedMessage2);
            this.addBookLanguageForm.reset();
          },
          error: (error) => {
            this.toastr.error(translatedMessage1);
          }
        });
      }
    });
  }
  ngOnDestroy(): void {
    this.addBookLanguageSubscription?.unsubscribe();
  }

}
