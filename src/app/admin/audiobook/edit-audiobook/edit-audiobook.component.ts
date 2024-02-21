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
import { AddAudioFile } from 'src/app/shared/models/adminModels/audiobook/audiofile/addAudioFile';
import { TimeConvertService } from 'src/app/core/services/time-convert.service';
import { UpdateAudioBook } from 'src/app/shared/models/adminModels/audiobook/updateAudioBook';

@Component({
  selector: 'app-edit-audiobook',
  templateUrl: './edit-audiobook.component.html',
  styleUrls: ['./edit-audiobook.component.scss', '../../admin.component.scss']
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

  audioFiles: AddAudioFile[] = [];
  editIndex: number | null = null;

  // files to add and edit
  addedOrEditedAudioFiles: AddAudioFile[] = [];
  // id of files to delete
  deletedIds: number[] = []

  constructor(private route: ActivatedRoute, private adminService: AdminService, private libraryService: LibraryService,
    private fb: FormBuilder, private toastr: ToastrService, public langService: LanguageService, public timeConvertService: TimeConvertService) {
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
                this.audioFiles = this.audiobook.bookAudioFile;
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

  AudioFileForm = new FormGroup({
    id: new FormControl(''),
    name: new FormControl('', [Validators.required, Validators.maxLength(256)]),
    audioFileUrl: new FormControl('', [Validators.required]),
    duration: new FormControl(0, [
      Validators.required,
      CustomValidators.nonZeroValidator()
    ]),
    playbackQueue: new FormControl('', [Validators.required])
  });

  onSubmitAudioBook() {
    const formData = this.editAudiobookForm.value;
    const id = this.id ? parseInt(this.id) : 0;
    const audioBookData: UpdateAudioBook = {
      id: id,
      name: formData.name ?? '',
      description: formData.description ?? '',
      bookLanguageId: formData.bookLanguageId ? parseInt(formData.bookLanguageId) : 0,
      narratorId: formData.narratorId ? parseInt(formData.narratorId) : 0,
      bookSeriesId: formData.bookSeriesId ? parseInt(formData.bookSeriesId) : 0,
      orderInSeries: formData.orderInSeries ? parseInt(formData.orderInSeries) : 0,
      authorsIds: formData.authorsIds ?? [],
      genresIds: formData.genresIds ?? [],
      audioFiles: this.addedOrEditedAudioFiles,
      audioFilesToDelete: this.deletedIds,
      picture: formData.picture!,
    };

    console.log(audioBookData);


    const translationKeys = ['Added-Success', 'Something-went-wrong'];
    this.langService.getTranslatedMessages(translationKeys).subscribe((translations: Record<string, string>) => {
      const { 'Added-Success': translatedMessage2, 'Something-went-wrong': translatedMessage1 } = translations;

      if (this.editAudiobookForm.valid) {
        this.updateAuthorSubscription = this.adminService.updateAudioBook(audioBookData).subscribe({
          next: (response) => {
            this.toastr.success(translatedMessage2);

            this.editAudiobookForm.reset();
            this.AudioFileForm.reset();
            this.url = '';
            this.audioFiles = [];
            this.addedOrEditedAudioFiles = [];
            this.deletedIds = [];

          },
          error: (error) => {
            this.toastr.error(translatedMessage1);
          }
        });
      }
    });
  }



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

  addAudioFile() {
    const newAudioFileValue = this.AudioFileForm.value;

    const isNameUnique = !this.audioFiles.some((file, index) => index !== this.editIndex && file.name === newAudioFileValue.name);
    const isPlaybackQueueUnique = !this.audioFiles.some((file, index) => index !== this.editIndex && Number(file.playbackQueue) === Number(newAudioFileValue.playbackQueue));

    if (!isNameUnique) {
      this.AudioFileForm.controls['name'].setErrors({ 'uniqName': true });
      console.log('uniq name valid text');

      return;
    }

    if (!isPlaybackQueueUnique) {
      this.AudioFileForm.controls['playbackQueue'].setErrors({ 'uniqplaybackQueue': true });
      console.log('uniq queq valid text');
      return;
    }

    const newAudioFile: AddAudioFile = {
      id: newAudioFileValue.id ? +newAudioFileValue.id : undefined,
      name: newAudioFileValue.name ? newAudioFileValue.name : '',
      audioFileUrl: newAudioFileValue.audioFileUrl ? newAudioFileValue.audioFileUrl : '',
      duration: newAudioFileValue.duration !== undefined ? newAudioFileValue.duration : null,
      playbackQueue: newAudioFileValue.playbackQueue ? newAudioFileValue.playbackQueue : '',
    };

    if (this.editIndex !== null) {

      if (this.addedOrEditedAudioFiles.some(file => file.id === newAudioFile.id)) {
        const index = this.addedOrEditedAudioFiles.findIndex(file => file.id === newAudioFile.id);
        this.addedOrEditedAudioFiles[index] = newAudioFile;
      } else {
        this.addedOrEditedAudioFiles.push(newAudioFile);
      }

      this.audioFiles[this.editIndex] = newAudioFile as AddAudioFile;
      this.editIndex = null;
    } else {
      this.audioFiles.push(newAudioFile as AddAudioFile);
      this.addedOrEditedAudioFiles.push(newAudioFile as AddAudioFile);
    }

    this.AudioFileForm.reset();
  }

  editAudioFile(index: number) {
    const audioFile = this.audioFiles[index];
    this.AudioFileForm.patchValue({
      id: String(audioFile.id),
      name: audioFile.name,
      audioFileUrl: audioFile.audioFileUrl,
      duration: audioFile.duration,
      playbackQueue: audioFile.playbackQueue
    });
    this.editIndex = index;
  }

  deleteAudioFile(index: number) {
    const deletedFile = this.audioFiles[index];

    const translationKeys = ['Confirm-delete-main'];

    this.langService.getTranslatedMessages(translationKeys)
      .subscribe(({ 'Confirm-delete-main': confirmMessage }: Record<string, string>) => {
        const confirmDelete = confirm(confirmMessage);

        if (confirmDelete) {
          if (deletedFile.id) {
            this.deletedIds.push(deletedFile.id);
          }
          this.audioFiles.splice(index, 1);
          console.log(this.deletedIds);
        }
      });
  }

  getAudioDuration(event: any) {
    const audioUrl = event?.target?.value;
    if (audioUrl) {
      const audio = new Audio();
      audio.src = audioUrl;
      audio.onloadedmetadata = () => {
        const duration = Math.round(audio.duration);
        this.AudioFileForm.patchValue({ duration: isNaN(duration) ? 0 : duration });
      };
      audio.onerror = () => {
        this.AudioFileForm.controls['audioFileUrl'].setErrors({ 'invalidUrl': true });
      };
    } else {
      this.AudioFileForm.patchValue({ duration: 0 });
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
