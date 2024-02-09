import { Component } from '@angular/core';
import { Subscription } from 'rxjs';
import { AdminService } from '../../admin.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { LanguageService } from 'src/app/core/services/language.service';
import { CustomValidators } from 'src/app/core/validators/customValidators';

@Component({
  selector: 'app-add-author',
  templateUrl: './add-author.component.html',
  styleUrls: ['./add-author.component.scss', '../../admin.component.scss']
})
export class AddAuthorComponent {

  private addAuthorSubscription?: Subscription;
  url = '';

  constructor(private adminService: AdminService, private toastr: ToastrService,
    public langService: LanguageService) {
  }

  addAuthorForm = new FormGroup({
    name: new FormControl('', [Validators.required, Validators.maxLength(256)]),
    enName: new FormControl('', [Validators.required, Validators.maxLength(256)]),
    description: new FormControl('', [Validators.required, Validators.maxLength(800)]),
    enDescription: new FormControl('', [Validators.required, Validators.maxLength(800)]),
    picture: new FormControl(null as File | null, [
      Validators.required,
      CustomValidators.fileExtensionValidator(['jpg', 'jpeg', 'png']),
      CustomValidators.fileSizeValidator(2 * 1024 * 1024)
    ])
  });

  onFileSelected(event: any) {
    const uploadedfile: File = event.target.files[0];

    // Check if a file is selected
    if (uploadedfile) {
      const reader = new FileReader();

      reader.onload = (e: any) => {
        // Assign the data URL to the 'url' variable
        this.url = e.target.result;
      };

      // Read the image as a data URL
      reader.readAsDataURL(uploadedfile);

      // Update the form control value
      this.addAuthorForm.patchValue({
        picture: uploadedfile
      });
    }
  }

  onFormSubmit() {
    const translationKeys = ['Added-Success', 'Something-went-wrong'];
    this.langService.getTranslatedMessages(translationKeys).subscribe((translations: Record<string, string>) => {
      const { 'Added-Success': translatedMessage2, 'Something-went-wrong': translatedMessage1 } = translations;

      if (this.addAuthorForm.valid) {
        this.addAuthorSubscription = this.adminService.addAuthor(this.addAuthorForm.value).subscribe({
          next: (response) => {
            this.toastr.success(translatedMessage2);
            // The problem is that after resetting the field they get an error, bcs it is empty
            this.addAuthorForm.reset();
            Object.keys(this.addAuthorForm.controls).forEach(controlName => {
              const control = this.addAuthorForm.get(controlName);
              control?.setErrors(null);
            });
            this.addAuthorForm.setErrors({ 'invalid': true });
          },
          error: (error) => {
            this.toastr.error(translatedMessage1);
          }
        });
      }
    });
  }

  resetForm() {
    this.addAuthorForm.reset({});
    this.addAuthorForm.setErrors({ 'invalid': true });
  }

  ngOnDestroy(): void {
    this.addAuthorSubscription?.unsubscribe();
  }

}
