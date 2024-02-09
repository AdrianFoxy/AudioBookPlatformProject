import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { Narrator } from 'src/app/shared/models/adminModels/narrator/narrator';
import { AdminService } from '../../admin.service';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { LanguageService } from 'src/app/core/services/language.service';
import { UpdateNarrator } from 'src/app/shared/models/adminModels/narrator/updateNarrator';

@Component({
  selector: 'app-edit-narrator',
  templateUrl: './edit-narrator.component.html',
  styleUrls: ['./edit-narrator.component.scss', '../../admin.component.scss']
})
export class EditNarratorComponent implements OnInit, OnDestroy{

  id: string | null = null;
  paramsSubscription?: Subscription;
  updateNarratorSubscription?: Subscription;
  narrator?: Narrator;

  constructor(private route: ActivatedRoute, private adminService: AdminService,
    private fb: FormBuilder, private toastr: ToastrService, public langService: LanguageService) {
  }

  editNarratorForm = new FormGroup({
    id: new FormControl({ value: '', disabled: true }, [Validators.required]),
    name: new FormControl('', [Validators.required, Validators.maxLength(100)]),
    mediaUrl: new FormControl('', [Validators.required, Validators.maxLength(400)]),
    updatedAt: new FormControl({ value: '', disabled: true }, [Validators.required]),
    createdAt: new FormControl({ value: '', disabled: true }, [Validators.required])
  })


  ngOnInit(): void {
    this.paramsSubscription = this.route.paramMap.subscribe({
      next: (params) => {
        this.id = params.get('id');

        if (this.id) {
          this.adminService.getNarratorById(this.id)
            .subscribe({
              next: (response) => {
                this.narrator = response;

                this.editNarratorForm.patchValue({
                  id: String(this.narrator.id),
                  name: this.narrator.name,
                  mediaUrl: this.narrator.mediaUrl,
                  createdAt: this.narrator.createdAt,
                  updatedAt: this.narrator.updatedAt
                });
              }
            })
        }
      }
    })
  }

  onFormSubmit(): void {

    const updateNarratorRequest: UpdateNarrator = {
      name: this.editNarratorForm.value.name ?? '',
      mediaUrl: this.editNarratorForm.value.mediaUrl ?? ''
    };

    const translationKeys = ['Updated-Success', 'Something-went-wrong'];
    this.langService.getTranslatedMessages(translationKeys).subscribe((translations: Record<string, string>) => {

      const { 'Updated-Success': translatedMessage2, 'Something-went-wrong': translatedMessage1 } = translations;
      if (this.id) {
        this.updateNarratorSubscription = this.adminService.updateNarrator(this.id, updateNarratorRequest)
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
    this.updateNarratorSubscription?.unsubscribe();
  }

}
