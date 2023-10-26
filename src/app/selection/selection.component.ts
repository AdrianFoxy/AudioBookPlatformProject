import { Component, OnInit } from '@angular/core';
import { SelectionService } from './selection.service';
import { LanguageService } from '../core/services/language-service/language.service';
import { LoaderService } from '../core/services/loader-service/loader.service';
import { Selection } from '../shared/models/selection';

@Component({
  selector: 'app-selection',
  templateUrl: './selection.component.html',
  styleUrls: ['./selection.component.scss']
})
export class SelectionComponent  implements OnInit{

  selections: Selection[] = [];

  constructor(private selectionService: SelectionService, public langService: LanguageService,
    public loaderService:LoaderService){

  }
  ngOnInit(): void {
    this.getSelections();
  }

  getSelections() {
    this.selectionService.getSelections().subscribe({
      next: response => this.selections = response,
      error: error => console.log(error)
    })
  }

}
