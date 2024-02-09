import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { DarkModeService } from 'src/app/core/services/dark-mode.service';
import { LanguageService } from 'src/app/core/services/language.service';

@Component({
  selector: 'app-image-upload',
  templateUrl: './image-upload.component.html',
  styleUrls: ['./image-upload.component.scss']
})
export class ImageUploadComponent {

  constructor(public langService: LanguageService, public darkmodeService: DarkModeService){
  }

  @Input() form!: FormGroup;
  @Input() imageUrl: string = '';
  @Input() defaultImgUrl: string = '';

  @Output() fileSelected = new EventEmitter<Event>();

  onFileSelected(event: Event): void {
    const fileInput = event.target as HTMLInputElement;
    const file = fileInput.files?.[0];

    if (file) {
      this.form.patchValue({ image: file });
    } else {
      this.form.get('image')?.reset();
    }

    this.fileSelected.emit(event);
  }
}
