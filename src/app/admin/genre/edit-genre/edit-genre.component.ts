import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { AdminService } from '../../admin.service';
import { Genre } from 'src/app/shared/models/adminModels/genre/genre';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { UpdateGenre } from 'src/app/shared/models/adminModels/genre/updateGenre';
import { ToastrService } from 'ngx-toastr';
import { LanguageService } from 'src/app/core/services/language.service';

@Component({
  selector: 'app-edit-genre',
  templateUrl: './edit-genre.component.html',
  styleUrls: ['./edit-genre.component.scss', '../../admin.component.scss']
})
export class EditGenreComponent implements OnInit, OnDestroy {

  id: string | null = null;
  paramsSubscription?: Subscription;
  updateGenreSubscription?: Subscription;
  genre?: Genre;

  constructor(private route: ActivatedRoute, private adminService: AdminService,
    private fb: FormBuilder, private toastr: ToastrService, public langService: LanguageService) {
  }

  editGenreForm = new FormGroup({
    id: new FormControl({ value: '', disabled: true }, [Validators.required]),
    name: new FormControl('', [Validators.required, Validators.maxLength(50)]),
    enName: new FormControl('', [Validators.required, Validators.maxLength(50)]),
    updatedAt: new FormControl({ value: '', disabled: true }, [Validators.required]),
    createdAt: new FormControl({ value: '', disabled: true }, [Validators.required])
  })


  ngOnInit(): void {
    this.paramsSubscription = this.route.paramMap.subscribe({
      next: (params) => {
        this.id = params.get('id');

        if (this.id) {
          this.adminService.getGenreById(this.id)
            .subscribe({
              next: (response) => {
                this.genre = response;

                this.editGenreForm.patchValue({
                  id: String(this.genre.id),
                  name: this.genre.name,
                  enName: this.genre.enName,
                  createdAt: this.genre.createdAt,
                  updatedAt: this.genre.updatedAt
                });
                // console.log(this.editGenreForm.value);
              }
            })
        }
      }
    })
  }

  onFormSubmit(): void {

    const updateGenreRequest: UpdateGenre = {
      name: this.editGenreForm.value.name ?? '',
      enName: this.editGenreForm.value.enName ?? ''
    };

    const translationKeys = ['Updated-Success', 'Something-went-wrong'];
    this.langService.getTranslatedMessages(translationKeys).subscribe((translations: Record<string, string>) => {

      const { 'Updated-Success': translatedMessage2, 'Something-went-wrong': translatedMessage1 } = translations;
      if (this.id) {
        this.updateGenreSubscription = this.adminService.updateGenre(this.id, updateGenreRequest)
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
    this.updateGenreSubscription?.unsubscribe();
  }

}
