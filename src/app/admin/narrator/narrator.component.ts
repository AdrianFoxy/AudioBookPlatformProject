import { ChangeDetectorRef, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Narrator } from 'src/app/shared/models/adminModels/narrator/narrator';
import { paginationAndSearchParams } from 'src/app/shared/models/paramsModels/paginationAndSearchParams';
import { AdminService } from '../admin.service';
import { ToastrService } from 'ngx-toastr';
import { LanguageService } from 'src/app/core/services/language-service/language.service';

@Component({
  selector: 'app-narrator',
  templateUrl: './narrator.component.html',
  styleUrls: ['./narrator.component.scss', '../admin.component.scss']
})
export class NarratorComponent implements OnInit {
  @ViewChild('search') searchTerm?: ElementRef;

  paginationAndSearchParams = new paginationAndSearchParams();
  totalCount = 0;

  narrators: Narrator[] = [];

  constructor(private adminService: AdminService, private toastr: ToastrService, private cdr: ChangeDetectorRef,
              public langService: LanguageService) { }

  ngOnInit() {
    this.getNarratorList();
  }

  getNarratorList() {
    this.adminService.getNarratorsList(this.paginationAndSearchParams).subscribe({
      next: response => {
        this.narrators = response.data;
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
      this.getNarratorList();
    }
  }

  onSearch(event: Event) {
    // Prevent the default form submission
    event.preventDefault();

    this.paginationAndSearchParams.search = this.searchTerm?.nativeElement.value;
    this.paginationAndSearchParams.pageNumber = 1;
    this.getNarratorList();
  }

  onDelete(id: number) {
    const translationKeys = ['Confirm-delete-main', 'Success-delete-main'];

    this.langService.getTranslatedMessages(translationKeys)
    .subscribe(({ 'Confirm-delete-main': confirmMessage, 'Success-delete-main': successMessage }:
     Record<string, string>) => {
      if (confirm(confirmMessage)) {
        this.adminService.deleteNarrator(id).subscribe({
          next: () => {
            this.toastr.error(successMessage);
            this.getNarratorList();
          },
          error: (err) => console.log(err)
        });
      }
    });
  }
}
