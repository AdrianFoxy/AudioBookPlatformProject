import { Component } from '@angular/core';
import { Selection } from 'src/app/shared/models/libraryModels/selection';
import { SelectionService } from '../selection.service';
import { ActivatedRoute } from '@angular/router';
import { LanguageService } from 'src/app/core/services/language-service/language.service';
import { AudioBook } from 'src/app/shared/models/libraryModels/audiobook';
import { sortingAndPaginationParams } from 'src/app/shared/models/paramsModels/sortingAndPaginationParams';
import { LoaderService } from 'src/app/core/services/loader-service/loader.service';

@Component({
  selector: 'app-selection-details',
  templateUrl: './selection-details.component.html',
  styleUrls: ['./selection-details.component.scss']
})
export class SelectionDetailsComponent {

  selection?: Selection;
  audioBooks: AudioBook[] = [];
  sortingAndPaginationParams = new sortingAndPaginationParams();

  totalCount = 0;


  constructor(private selectionService: SelectionService, private activatedRoute: ActivatedRoute,
    public langService: LanguageService, public loaderService:LoaderService) {
  }

  async ngOnInit(): Promise<void> {
    await this.loadSingleAudioBook();
    this.getAudioBooksOfSelection();
  }

  async loadSingleAudioBook() {
    const id = this.activatedRoute.snapshot.paramMap.get('id')
    if (id) {
      const selection = await this.selectionService.getSingleSelection(+id).toPromise();
      this.selection = selection;
    }
  }

  formatDescription(description: string): string {
    return description.replace(/\r\n\r\n/g, '<br><br>');
  }

  getAudioBooksOfSelection() {
    const id = this.activatedRoute.snapshot.paramMap.get('id');

    if (id !== null) {
      this.selectionService.getAudioBooksOfSelection(+id, this.sortingAndPaginationParams).subscribe({
        next: response => {
          this.audioBooks = response.data;
          this.sortingAndPaginationParams.pageNumber = response.pageIndex;
          this.sortingAndPaginationParams.pageSize = response.pageSize;
          this.totalCount = response.count;
        },
        error: error => console.log(error)
      });
    }
  }

  onPageChanged(event: any){
    if(this.sortingAndPaginationParams.pageNumber !== event) {
      this.sortingAndPaginationParams.pageNumber = event;
      this.getAudioBooksOfSelection();
    }
  }

}
