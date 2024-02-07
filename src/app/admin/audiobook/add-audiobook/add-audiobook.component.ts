import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { AdminService } from '../../admin.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { LanguageService } from 'src/app/core/services/language-service/language.service';
import { CustomValidators } from 'src/app/core/validators/customValidators';
import { LibraryService } from 'src/app/library/library.service';
import { SelectBookSeries } from 'src/app/shared/models/selectModels/selectbookSeries';
import { SelectGenre } from 'src/app/shared/models/selectModels/selectGenre';
import { SelectNarrator } from 'src/app/shared/models/selectModels/selectNarrator';
import { SelectBookLanguage } from 'src/app/shared/models/selectModels/selectBookLanguage';
import { SelectAuthor } from 'src/app/shared/models/selectModels/selectAuthor';
import { AddAudioFile } from 'src/app/shared/models/adminModels/audiobook/audiofile/addAudioFile';

@Component({
  selector: 'app-add-audiobook',
  templateUrl: './add-audiobook.component.html',
  styleUrls: ['./add-audiobook.component.scss', '../../admin.component.scss']
})
export class AddAudiobookComponent implements OnInit, OnDestroy{

  private addAudioBookSubscription?: Subscription;
  url = '';

  bookSeries: SelectBookSeries[] = [];
  narrators: SelectNarrator[] = [];
  languages: SelectBookLanguage[] = [];
  genres: SelectGenre[] = [];
  authors: SelectAuthor[] = [];

  addAudioFiles: AddAudioFile[] = [];

  constructor(private adminService: AdminService, private libraryService: LibraryService,
     private toastr: ToastrService, public langService: LanguageService) {
  }
  ngOnInit(): void {
    this.getBookSeriesForSelect();
    this.getNarratorForSelect();
    this.getLanguagesForSelect();
    this.getGenresForSelect();
    this.getAuthorForSelect()
  }

  addAudioBookForm = new FormGroup({
    name: new FormControl('', [Validators.required, Validators.maxLength(256)]),
    description: new FormControl('', [Validators.required, Validators.maxLength(800)]),
    narratorId: new FormControl('', [Validators.required]),
    bookSeriesId: new FormControl('', [Validators.required]),
    orderInSeries: new FormControl('', [Validators.required]),
    bookLanguageId: new FormControl('', [Validators.required]),
    authorsIds: new FormControl([], [Validators.required]),
    genresIds: new FormControl([], [Validators.required]),
    audioFiles: new FormControl([] as AddAudioFile[]),
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
      this.addAudioBookForm.patchValue({
        picture: uploadedfile
      });
    }
  }

  onFormSubmit() {
    console.log(this.addAudioBookForm.value);

    // const translationKeys = ['Added-Success', 'Something-went-wrong'];
    // this.langService.getTranslatedMessages(translationKeys).subscribe((translations: Record<string, string>) => {
    //   const { 'Added-Success': translatedMessage2, 'Something-went-wrong': translatedMessage1 } = translations;

    //   if (this.addAudioBookForm.valid) {
    //     this.addAudioBookSubscription = this.adminService.addAuthor(this.addAudioBookForm.value).subscribe({
    //       next: (response) => {
    //         this.toastr.success(translatedMessage2);
    //         // The problem is that after resetting the field they get an error, bcs it is empty
    //         this.addAudioBookForm.reset();
    //         Object.keys(this.addAudioBookForm.controls).forEach(controlName => {
    //           const control = this.addAudioBookForm.get(controlName);
    //           control?.setErrors(null);
    //         });
    //         this.addAudioBookForm.setErrors({ 'invalid': true });
    //       },
    //       error: (error) => {
    //         this.toastr.error(translatedMessage1);
    //       }
    //     });
    //   }
    // });
  }

  resetForm() {
    this.addAudioBookForm.reset({});
    this.addAudioBookForm.setErrors({ 'invalid': true });
  }

  getBookSeriesForSelect(){
    this.libraryService.getBookSeriesForFilter().subscribe({
      next: response => this.bookSeries = response,
      error: error => console.log(error)
    })
  }

  getNarratorForSelect(){
    this.libraryService.getNarratorsForFilter().subscribe({
      next: response => this.narrators = response,
      error: error => console.log(error)
    })
  }

  getLanguagesForSelect(){
    this.libraryService.getBookLanguagesForFilter().subscribe({
      next: response => this.languages = response,
      error: error => console.log(error)
    })
  }

  getGenresForSelect(){
    this.libraryService.getGenresForFilter().subscribe({
      next: response => this.genres = response,
      error: error => console.log(error)
    })
  }

  getAuthorForSelect(){
    this.libraryService.getAuthorsForFilter().subscribe({
      next: response => this.authors = response,
      error: error => console.log(error)
    })
  }


  ngOnDestroy(): void {
    this.addAudioBookSubscription?.unsubscribe();
  }

}
