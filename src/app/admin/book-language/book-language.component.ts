import { ChangeDetectorRef, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { BookLanguage } from 'src/app/shared/models/adminModels/book-language.ts/bookLanguage';
import { paginationAndSearchParams } from 'src/app/shared/models/paramsModels/paginationAndSearchParams';
import { AdminService } from '../admin.service';
import { ToastrService } from 'ngx-toastr';
import { LanguageService } from 'src/app/core/services/language-service/language.service';

@Component({
  selector: 'app-book-language',
  templateUrl: './book-language.component.html',
  styleUrls: ['./book-language.component.scss', '../admin.component.scss']
})
export class BookLanguageComponent implements OnInit{
  @ViewChild('search') searchTerm?: ElementRef;

  paginationAndSearchParams = new paginationAndSearchParams();
  totalCount = 0;

  bookLanguages: BookLanguage[] = [];

  constructor(private adminService: AdminService, private toastr: ToastrService, private cdr: ChangeDetectorRef,
              public langService: LanguageService) { }

  ngOnInit() {
    this.getBookLanguageList();
  }

  getBookLanguageList() {
    this.adminService.getBookLanguageList(this.paginationAndSearchParams).subscribe({
      next: response => {
        this.bookLanguages = response.data;
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
      this.getBookLanguageList();
    }
  }

  onSearch(event: Event) {
    // Prevent the default form submission
    event.preventDefault();

    this.paginationAndSearchParams.search = this.searchTerm?.nativeElement.value;
    this.paginationAndSearchParams.pageNumber = 1;
    this.getBookLanguageList();
  }

  onDelete(id: number) {
    const translationKeys = ['Confirm-delete-main', 'Success-delete-main'];

    this.langService.getTranslatedMessages(translationKeys)
    .subscribe(({ 'Confirm-delete-main': confirmMessage, 'Success-delete-main': successMessage }:
     Record<string, string>) => {
      if (confirm(confirmMessage)) {
        this.adminService.deleteBookLanguage(id).subscribe({
          next: () => {
            this.toastr.error(successMessage);
            this.getBookLanguageList();
          },
          error: (err) => console.log(err)
        });
      }
    });
  }

}
