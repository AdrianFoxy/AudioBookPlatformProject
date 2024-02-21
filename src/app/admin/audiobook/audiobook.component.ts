import { ChangeDetectorRef, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { AudioBookInList } from 'src/app/shared/models/adminModels/audiobook/audiobookInList';
import { paginationAndSearchParams } from 'src/app/shared/models/paramsModels/paginationAndSearchParams';
import { AdminService } from '../admin.service';
import { ToastrService } from 'ngx-toastr';
import { LanguageService } from 'src/app/core/services/language.service';
import { LoaderService } from 'src/app/core/services/loader.service';

@Component({
  selector: 'app-audiobook',
  templateUrl: './audiobook.component.html',
  styleUrls: ['./audiobook.component.scss', '../admin.component.scss']
})
export class AudiobookComponent implements OnInit {

  @ViewChild('search') searchTerm?: ElementRef;

  paginationAndSearchParams = new paginationAndSearchParams();
  totalCount = 0;

  audiobooks: AudioBookInList[] = [];

  constructor(private adminService: AdminService, private toastr: ToastrService, private cdr: ChangeDetectorRef,
              public langService: LanguageService, public loaderService : LoaderService) { }

  ngOnInit() {
    this.getAudiobookList();
  }

  getAudiobookList() {
    this.adminService.getAudioBooksList(this.paginationAndSearchParams).subscribe({
      next: response => {
        this.audiobooks = response.data;
        this.paginationAndSearchParams.pageNumber = response.pageIndex;
        this.paginationAndSearchParams.pageSize = response.pageSize;
        this.totalCount = response.count;

        // without it, getting error after delete last element on page
        this.cdr.detectChanges();
      },
      error: error => console.log(error)
    });
  }

  onPageChanged(event: any) {
    if (this.paginationAndSearchParams.pageNumber !== event) {
      this.paginationAndSearchParams.pageNumber = event;
      this.getAudiobookList();
    }
  }

  onSearch(event: Event) {
    // Prevent the default form submission
    event.preventDefault();

    this.paginationAndSearchParams.search = this.searchTerm?.nativeElement.value;
    this.paginationAndSearchParams.pageNumber = 1;
    this.getAudiobookList();
  }

  onDelete(id: number) {
    const translationKeys = ['Confirm-delete-main', 'Success-delete-main'];

    this.langService.getTranslatedMessages(translationKeys)
    .subscribe(({ 'Confirm-delete-main': confirmMessage, 'Success-delete-main': successMessage }:
     Record<string, string>) => {
      if (confirm(confirmMessage)) {
        this.adminService.deleteAudiobook(id).subscribe({
          next: () => {
            this.toastr.error(successMessage);
            this.getAudiobookList();
          },
          error: (err) => console.log(err)
        });
      }
    });
  }


}
