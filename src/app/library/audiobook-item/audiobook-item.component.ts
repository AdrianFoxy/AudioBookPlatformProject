import { Component, Input } from '@angular/core';
import { LanguageService } from 'src/app/core/services/language-service/language.service';
import { AudioBook } from 'src/app/shared/models/libraryModels/audiobook';

@Component({
  selector: 'app-audiobook-item',
  templateUrl: './audiobook-item.component.html',
  styleUrls: ['./audiobook-item.component.scss']
})
export class AudiobookItemComponent {

  constructor(public langService: LanguageService) {}

  @Input() audiobook?: AudioBook;
}
