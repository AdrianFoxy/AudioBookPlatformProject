import { Component, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { AdminService } from '../../admin.service';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { LanguageService } from 'src/app/core/services/language.service';

@Component({
  selector: 'app-add-narrator',
  templateUrl: './add-narrator.component.html',
  styleUrls: ['./add-narrator.component.scss', '../../admin.component.scss']
})
export class AddNarratorComponent implements OnDestroy {

  private addNarratorSubscription?: Subscription;

  constructor(private adminService: AdminService, private fb: FormBuilder, private toastr: ToastrService,
    public langService: LanguageService) {
  }

  addNarratorForm = new FormGroup({
    name: new FormControl('', [Validators.required, Validators.maxLength(100)]),
    mediaUrl: new FormControl('', [Validators.required, Validators.maxLength(400)])
  })

  onFormSubmit() {
    const translationKeys = ['Added-Success', 'Something-went-wrong'];
    this.langService.getTranslatedMessages(translationKeys).subscribe((translations: Record<string, string>) => {
      const { 'Added-Success': translatedMessage2, 'Something-went-wrong': translatedMessage1 } = translations;

      if (this.addNarratorForm.valid) {
        this.addNarratorSubscription = this.adminService.addNarrator(this.addNarratorForm.value).subscribe({
          next: (response) => {
            this.toastr.success(translatedMessage2);
            this.addNarratorForm.reset();
          },
          error: (error) => {
            this.toastr.error(translatedMessage1);
          }
        });
      }
    });
  }

  ngOnDestroy(): void {
    this.addNarratorSubscription?.unsubscribe();
  }
}
