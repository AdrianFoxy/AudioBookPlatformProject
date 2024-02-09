import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Subscription } from 'rxjs';
import { AdminService } from '../../admin.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { LanguageService } from 'src/app/core/services/language.service';
import { CustomValidators } from 'src/app/core/validators/customValidators';
import { LibraryService } from 'src/app/library/library.service';
import { SelectBookSeries } from 'src/app/shared/models/selectModels/selectbookSeries';
import { SelectGenre } from 'src/app/shared/models/selectModels/selectGenre';
import { SelectNarrator } from 'src/app/shared/models/selectModels/selectNarrator';
import { SelectBookLanguage } from 'src/app/shared/models/selectModels/selectBookLanguage';
import { SelectAuthor } from 'src/app/shared/models/selectModels/selectAuthor';
import { AddAudioFile } from 'src/app/shared/models/adminModels/audiobook/audiofile/addAudioFile';
import { AddAudioBook } from 'src/app/shared/models/adminModels/audiobook/addAudioBook';
import { TimeConvertService } from 'src/app/core/services/time-convert.service';

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
  editIndex: number | null = null;

  constructor(private adminService: AdminService, private libraryService: LibraryService,
     private toastr: ToastrService, public langService: LanguageService, public timeConvertService: TimeConvertService) {
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
    picture: new FormControl(null as File | null, [
      Validators.required,
      CustomValidators.fileExtensionValidator(['jpg', 'jpeg', 'png']),
      CustomValidators.fileSizeValidator(2 * 1024 * 1024)
    ]),
  });

  newAudioFileForm = new FormGroup({
    name: new FormControl('', [Validators.required, Validators.maxLength(256)]),
    audioFileUrl: new FormControl('', [Validators.required]),
    duration: new FormControl(0, [
      Validators.required,
      CustomValidators.nonZeroValidator()
    ]),
    playbackQueue: new FormControl(0, [Validators.required])
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
      this.addAudioBookForm.patchValue({
        picture: uploadedfile
      });
    }
  }

  onSubmitAudioBook() {

    const formData = this.addAudioBookForm.value;
    const audioBookData: AddAudioBook = {
      name: formData.name ?? '',
      description: formData.description ?? '',
      bookLanguageId: formData.bookLanguageId ? parseInt(formData.bookLanguageId, 10) : 0,
      narratorId: formData.narratorId ? parseInt(formData.narratorId, 10) : 0,
      bookSeriesId: formData.bookSeriesId ? parseInt(formData.bookSeriesId, 10) : 0,
      orderInSeries: formData.orderInSeries ? parseInt(formData.orderInSeries, 10) : 0,
      authorsIds: formData.authorsIds ?? [],
      genresIds: formData.genresIds ?? [],
      audioFileUrls: this.addAudioFiles,
      picture: formData.picture!
    };

    if (this.addAudioBookForm.valid) {
      this.addAudioBookSubscription = this.adminService.addAudioBook(audioBookData).subscribe({
        next: (response) => {
          this.addAudioBookForm.reset();
          this.newAudioFileForm.reset();
          this.addAudioFiles = [];
        },
        error: (error) => {
          console.log('error');
        }
      });
    }

    console.log(audioBookData);
  }


  addAudioFile() {
    const newAudioFileValue = this.newAudioFileForm.value;

    const isNameUnique = !this.addAudioFiles.some(file => file.name === newAudioFileValue.name);
    const isPlaybackQueueUnique = !this.addAudioFiles.some(file => file.playbackQueue === newAudioFileValue.playbackQueue);

    if (!isNameUnique) {
      this.newAudioFileForm.controls['name'].setErrors({ 'uniqName': true });
      return;
    }

    if (!isPlaybackQueueUnique) {
      this.newAudioFileForm.controls['playbackQueue'].setErrors({ 'uniqplaybackQueue': true });
      return;
    }

    const newAudioFile: AddAudioFile = {
      name: newAudioFileValue.name ? newAudioFileValue.name : '',
      audioFileUrl: newAudioFileValue.audioFileUrl ? newAudioFileValue.audioFileUrl : '',
      duration: newAudioFileValue.duration !== undefined ? newAudioFileValue.duration : null,
      playbackQueue: newAudioFileValue.playbackQueue !== undefined ? newAudioFileValue.playbackQueue : null
    };

    if (this.editIndex !== null) {
      this.addAudioFiles[this.editIndex] = newAudioFile as AddAudioFile;
      this.editIndex = null;
    } else {
      this.addAudioFiles.push(newAudioFile as AddAudioFile);
    }

    this.newAudioFileForm.reset();
  }


  editAudioFile(index: number) {
    const audioFile = this.addAudioFiles[index];
    this.newAudioFileForm.patchValue({
      name: audioFile.name,
      audioFileUrl: audioFile.audioFileUrl,
      duration: audioFile.duration,
      playbackQueue: audioFile.playbackQueue
    });
    this.editIndex = index;
  }

  deleteAudioFile(index: number) {
    this.addAudioFiles.splice(index, 1);
  }


  getAudioDuration(event: any) {
    const audioUrl = event?.target?.value;
    if (audioUrl) {
      const audio = new Audio();
      audio.src = audioUrl;
      audio.onloadedmetadata = () => {
        const duration = Math.round(audio.duration);
        this.newAudioFileForm.patchValue({ duration: isNaN(duration) ? 0 : duration });
      };
      audio.onerror = () => {
        this.newAudioFileForm.controls['audioFileUrl'].setErrors({ 'invalidUrl': true });
      };
    } else {
      this.newAudioFileForm.patchValue({ duration: 0 });
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
    this.addAudioBookSubscription?.unsubscribe();
  }

}
