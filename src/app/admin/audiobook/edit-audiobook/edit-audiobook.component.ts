import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { AudioBook } from 'src/app/shared/models/adminModels/audiobook/audiobook';
import { AdminService } from '../../admin.service';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { LanguageService } from 'src/app/core/services/language.service';
import { CustomValidators } from 'src/app/core/validators/customValidators';
import { SelectBookSeries } from 'src/app/shared/models/selectModels/selectbookSeries';
import { SelectNarrator } from 'src/app/shared/models/selectModels/selectNarrator';
import { SelectBookLanguage } from 'src/app/shared/models/selectModels/selectBookLanguage';
import { SelectGenre } from 'src/app/shared/models/selectModels/selectGenre';
import { SelectAuthor } from 'src/app/shared/models/selectModels/selectAuthor';
import { LibraryService } from 'src/app/library/library.service';

@Component({
  selector: 'app-edit-audiobook',
  templateUrl: './edit-audiobook.component.html',
  styleUrls: ['./edit-audiobook.component.scss']
})
export class EditAudiobookComponent {

  id: string | null = null;
  paramsSubscription?: Subscription;
  updateAuthorSubscription?: Subscription;
  audiobook?: AudioBook;
  url = '';
  authorDefaultUrl = '';

  bookSeries: SelectBookSeries[] = [];
  narrators: SelectNarrator[] = [];
  languages: SelectBookLanguage[] = [];
  genres: SelectGenre[] = [];
  authors: SelectAuthor[] = [];

  constructor(private route: ActivatedRoute, private adminService: AdminService, private libraryService: LibraryService,
    private fb: FormBuilder, private toastr: ToastrService, public langService: LanguageService) {
  }

  ngOnInit(): void {

    this.getBookSeriesForSelect();
    this.getNarratorForSelect();
    this.getLanguagesForSelect();
    this.getGenresForSelect();
    this.getAuthorForSelect();

    this.paramsSubscription = this.route.paramMap.subscribe({
      next: (params) => {
        this.id = params.get('id');
        if (this.id) {
          this.adminService.getAudioBookById(this.id)
            .subscribe({
              next: (response) => {
                this.audiobook = response;
                const genreIds = this.audiobook.genre.map(genre => genre.id);
                const authorIds = this.audiobook.author.map(author => author.id);
                this.editAudiobookForm.patchValue({
                  id: String(this.audiobook.id),
                  name: this.audiobook.name,
                  description: this.audiobook.description,
                  genresIds: genreIds,
                  authorsIds: authorIds,
                  narratorId: String(this.audiobook.narrator.id),
                  bookSeriesId: String(this.audiobook.bookSeries.id),
                  orderInSeries: String(this.audiobook.orderInSeries),
                  bookLanguageId: String(this.audiobook.bookLanguage.id),
                  rating: String(this.audiobook.rating),
                  bookDuration: this.audiobook.bookDuration,
                  viewCount: String(this.audiobook.viewCount),
                  bookMarksCount: String(this.audiobook.bookMarksCount),
                  createdAt: this.audiobook.createdAt,
                  updatedAt: this.audiobook.updatedAt
                });
                this.authorDefaultUrl = this.audiobook.pictureUrl;
              }
            })
        }
      }
    })

  }

  editAudiobookForm = new FormGroup({
    id: new FormControl({ value: '', disabled: true }, [Validators.required]),
    name: new FormControl('', [Validators.required, Validators.maxLength(256)]),
    description: new FormControl('', [Validators.required, Validators.maxLength(2500)]),
    rating: new FormControl({ value: '', disabled: true }, [Validators.required]),
    bookDuration: new FormControl({ value: '', disabled: true }, [Validators.required]),
    viewCount: new FormControl({ value: '', disabled: true }, [Validators.required]),
    bookMarksCount: new FormControl({ value: '', disabled: true }, [Validators.required]),
    narratorId: new FormControl('', [Validators.required]),
    bookSeriesId: new FormControl('', [Validators.required]),
    orderInSeries: new FormControl('', [Validators.required]),
    bookLanguageId: new FormControl('', [Validators.required]),
    genresIds: new FormControl([] as number[], [Validators.required]),
    authorsIds: new FormControl([] as number[], [Validators.required]),
    updatedAt: new FormControl({ value: '', disabled: true }, [Validators.required]),
    createdAt: new FormControl({ value: '', disabled: true }, [Validators.required]),
    picture: new FormControl(null as File | null, [
      CustomValidators.fileExtensionValidator(['jpg', 'jpeg', 'png']),
      CustomValidators.fileSizeValidator(2 * 1024 * 1024)
    ])
  });

  onFileSelected(event: any) {
    const uploadedfile: File = event.target.files[0];
    if (uploadedfile) {
      const reader = new FileReader();
      reader.onload = (e: any) => {
        // Assign the data URL to the 'url' variable
        this.url = e.target.result;
      };
      // Read the image as a data URL
      reader.readAsDataURL(uploadedfile);
      this.editAudiobookForm.patchValue({
        picture: uploadedfile
      });
    }
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
  }



}
