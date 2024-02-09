import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { BookLanguage } from 'src/app/shared/models/adminModels/book-language/bookLanguage';
import { AdminService } from '../../admin.service';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { LanguageService } from 'src/app/core/services/language.service';
import { UpdateBookLanguage } from 'src/app/shared/models/adminModels/book-language/updateBookLanguage';

@Component({
  selector: 'app-edit-book-language',
  templateUrl: './edit-book-language.component.html',
  styleUrls: ['./edit-book-language.component.scss', '../../admin.component.scss']
})
export class EditBookLanguageComponent implements OnInit, OnDestroy{

  id: string | null = null;
  paramsSubscription?: Subscription;
  updateBookLanguageSubscription?: Subscription;
  bookLanguage?: BookLanguage;

  constructor(private route: ActivatedRoute, private adminService: AdminService,
    private fb: FormBuilder, private toastr: ToastrService, public langService: LanguageService) {
  }

  editBookLanguageForm = new FormGroup({
    id: new FormControl({ value: '', disabled: true }, [Validators.required]),
    name: new FormControl('', [Validators.required, Validators.maxLength(100)]),
    enName: new FormControl('', [Validators.required, Validators.maxLength(100)]),
    updatedAt: new FormControl({ value: '', disabled: true }, [Validators.required]),
    createdAt: new FormControl({ value: '', disabled: true }, [Validators.required])
  })


  ngOnInit(): void {
    this.paramsSubscription = this.route.paramMap.subscribe({
      next: (params) => {
        this.id = params.get('id');
        if (this.id) {
          this.adminService.getBookLanguageById(this.id)
            .subscribe({
              next: (response) => {
                this.bookLanguage = response;

                this.editBookLanguageForm.patchValue({
                  id: String(this.bookLanguage.id),
                  name: this.bookLanguage.name,
                  enName: this.bookLanguage.enName,
                  createdAt: this.bookLanguage.createdAt,
                  updatedAt: this.bookLanguage.updatedAt
                });
              }
            })
        }
      }
    })
  }

  onFormSubmit(): void {

    const updatBookLanguageRequest: UpdateBookLanguage = {
      name: this.editBookLanguageForm.value.name ?? '',
      enName: this.editBookLanguageForm.value.enName ?? ''
    };

    const translationKeys = ['Updated-Success', 'Something-went-wrong'];
    this.langService.getTranslatedMessages(translationKeys).subscribe((translations: Record<string, string>) => {

      const { 'Updated-Success': translatedMessage2, 'Something-went-wrong': translatedMessage1 } = translations;
      if (this.id) {
        this.updateBookLanguageSubscription = this.adminService.updateBookLanguage(this.id, updatBookLanguageRequest)
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
  }

  ngOnDestroy(): void {
    this.paramsSubscription?.unsubscribe();
    this.updateBookLanguageSubscription?.unsubscribe();
  }

}
