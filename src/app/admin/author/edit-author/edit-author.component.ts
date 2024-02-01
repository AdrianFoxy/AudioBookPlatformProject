import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { Author } from 'src/app/shared/models/adminModels/author/author';
import { AdminService } from '../../admin.service';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { LanguageService } from 'src/app/core/services/language-service/language.service';
import { updateAuthor } from 'src/app/shared/models/adminModels/author/updateAuthor';

@Component({
  selector: 'app-edit-author',
  templateUrl: './edit-author.component.html',
  styleUrls: ['./edit-author.component.scss', '../../admin.component.scss']
})
export class EditAuthorComponent implements OnInit, OnDestroy{

  id: string | null = null;
  paramsSubscription?: Subscription;
  updateAuthorSubscription?: Subscription;
  author?: Author;
  url = '';
  authorDefaultUrl = '';

  constructor(private route: ActivatedRoute, private adminService: AdminService,
    private fb: FormBuilder, private toastr: ToastrService, public langService: LanguageService) {
  }

  ngOnInit(): void {
    this.paramsSubscription = this.route.paramMap.subscribe({
      next: (params) => {
        this.id = params.get('id');
        if (this.id) {
          this.adminService.getAuthorById(this.id)
            .subscribe({
              next: (response) => {
                this.author = response;

                this.editAuthorForm.patchValue({
                  id: String(this.author.id),
                  name: this.author.name,
                  enName: this.author.enName,
                  description: this.author.description,
                  enDescription: this.author.enDescription,
                  createdAt: this.author.createdAt,
                  updatedAt: this.author.updatedAt
                });
                this.authorDefaultUrl = this.author.imageUrl;
              }
            })
        }
      }
    })
  }

  editAuthorForm = new FormGroup({
    id: new FormControl({ value: '', disabled: true }, [Validators.required]),
    name: new FormControl('', [Validators.required, Validators.maxLength(256)]),
    enName: new FormControl('', [Validators.required, Validators.maxLength(256)]),
    description: new FormControl('', [Validators.required, Validators.maxLength(2500)]),
    enDescription: new FormControl('', [Validators.required, Validators.maxLength(2500)]),
    updatedAt: new FormControl({ value: '', disabled: true }, [Validators.required]),
    createdAt: new FormControl({ value: '', disabled: true }, [Validators.required]),
    picture: new FormControl(null as File | null, [
      this.fileExtensionValidator(['jpg', 'jpeg', 'png']),
      this.fileSizeValidator(2 * 1024 * 1024)
    ])
  });

  fileExtensionValidator(allowedExtensions: string[]) {
    return (control: AbstractControl): { [key: string]: any } | null => {
      if (control.value) {
        const fileExtension = control.value.name.split('.').pop()?.toLowerCase();
        if (fileExtension && allowedExtensions.indexOf(fileExtension) === -1) {
          return { invalidExtension: true };
        }
      }
      return null;
    };
  }

  fileSizeValidator(maxSize: number) {
    return (control: AbstractControl): { [key: string]: any } | null => {
      if (control.value) {
        const fileSize = control.value.size
        if (fileSize > maxSize) {
          return { invalidSize: true };
        }
      }
      return null;
    };
  }

  onFormSubmit(): void {

    const updatAuthorRequest: updateAuthor = {
      name: this.editAuthorForm.value.name ?? '',
      enName: this.editAuthorForm.value.enName ?? '',
      description: this.editAuthorForm.value.description ?? '',
      enDescription: this.editAuthorForm.value.enDescription ?? '',
      picture: this.editAuthorForm.value.picture ?? ''
    };

    const translationKeys = ['Updated-Success', 'Something-went-wrong'];
    this.langService.getTranslatedMessages(translationKeys).subscribe((translations: Record<string, string>) => {

      const { 'Updated-Success': translatedMessage2, 'Something-went-wrong': translatedMessage1 } = translations;
      if (this.id) {
        this.updateAuthorSubscription = this.adminService.updateAuthor(this.id, updatAuthorRequest)
          .subscribe({
            next: (response) => {
              this.toastr.success(translatedMessage2)
            },
            error: (error) => {
              this.toastr.error(translatedMessage1)
            }
          });
      }
    });

    console.log('Submit' + this.editAuthorForm.value);
    console.log(this.editAuthorForm.value);


  }

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
      this.editAuthorForm.patchValue({
        picture: uploadedfile
      });
    }
  }

  ngOnDestroy(): void {
    this.paramsSubscription?.unsubscribe();
    this.updateAuthorSubscription?.unsubscribe();
  }


}
