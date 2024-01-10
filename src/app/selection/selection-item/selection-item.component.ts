import { Component, Input } from '@angular/core';
import { LanguageService } from 'src/app/core/services/language-service/language.service';
import { Selection } from 'src/app/shared/models/libraryModels/selection';

@Component({
  selector: 'app-selection-item',
  templateUrl: './selection-item.component.html',
  styleUrls: ['./selection-item.component.scss']
})
export class SelectionItemComponent {

  constructor(public langService: LanguageService){
  }

  @Input() selection?: Selection;
}
