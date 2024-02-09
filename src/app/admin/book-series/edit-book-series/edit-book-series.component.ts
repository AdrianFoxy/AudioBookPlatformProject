import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { BookSeries } from 'src/app/shared/models/adminModels/book-series/book-series';
import { AdminService } from '../../admin.service';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { LanguageService } from 'src/app/core/services/language.service';
import { UpdateBookSeries } from 'src/app/shared/models/adminModels/book-series/updateBookSeries';

@Component({
  selector: 'app-edit-book-series',
  templateUrl: './edit-book-series.component.html',
  styleUrls: ['./edit-book-series.component.scss', '../../admin.component.scss']
})
export class EditBookSeriesComponent implements OnInit, OnDestroy{

  id: string | null = null;
  paramsSubscription?: Subscription;
  updateBookSeriesSubscription?: Subscription;
  bookSeries?: BookSeries;

  constructor(private route: ActivatedRoute, private adminService: AdminService,
    private fb: FormBuilder, private toastr: ToastrService, public langService: LanguageService) {
  }

  editBookSeriesForm = new FormGroup({
    id: new FormControl({ value: '', disabled: true }, [Validators.required]),
    name: new FormControl('', [Validators.required, Validators.maxLength(254)]),
    enName: new FormControl('', [Validators.required, Validators.maxLength(254)]),
    updatedAt: new FormControl({ value: '', disabled: true }, [Validators.required]),
    createdAt: new FormControl({ value: '', disabled: true }, [Validators.required])
  })

  ngOnInit(): void {
    this.paramsSubscription = this.route.paramMap.subscribe({
      next: (params) => {
        this.id = params.get('id');

        if (this.id) {
          this.adminService.getBookSeriesById(this.id)
            .subscribe({
              next: (response) => {
                this.bookSeries = response;

                this.editBookSeriesForm.patchValue({
                  id: String(this.bookSeries.id),
                  name: this.bookSeries.name,
                  enName: this.bookSeries.enName,
                  createdAt: this.bookSeries.createdAt,
                  updatedAt: this.bookSeries.updatedAt
                });
              }
            })
        }
      }
    })
  }

  onFormSubmit(): void {

    const updateBookSeriesRequest: UpdateBookSeries = {
      name: this.editBookSeriesForm.value.name ?? '',
      enName: this.editBookSeriesForm.value.enName ?? ''
    };

    const translationKeys = ['Updated-Success', 'Something-went-wrong'];
    this.langService.getTranslatedMessages(translationKeys)
    .subscribe((translations: Record<string, string>) => {
      const { 'Updated-Success': translatedMessage2, 'Something-went-wrong': translatedMessage1 } = translations;
      if (this.id) {
        this.updateBookSeriesSubscription = this.adminService.updateBookSeries(this.id, updateBookSeriesRequest)
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
    this.updateBookSeriesSubscription?.unsubscribe();
  }

}
