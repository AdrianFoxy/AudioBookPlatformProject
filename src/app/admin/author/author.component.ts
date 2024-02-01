import { ChangeDetectorRef, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Author } from 'src/app/shared/models/adminModels/author/author';
import { paginationAndSearchParams } from 'src/app/shared/models/paramsModels/paginationAndSearchParams';
import { AdminService } from '../admin.service';
import { ToastrService } from 'ngx-toastr';
import { LanguageService } from 'src/app/core/services/language-service/language.service';
import { LoaderService } from 'src/app/core/services/loader-service/loader.service';

@Component({
  selector: 'app-author',
  templateUrl: './author.component.html',
  styleUrls: ['./author.component.scss', '../admin.component.scss']
})
export class AuthorComponent implements OnInit{

  @ViewChild('search') searchTerm?: ElementRef;

  paginationAndSearchParams = new paginationAndSearchParams();
  totalCount = 0;

  authors: Author[] = [];

  constructor(private adminService: AdminService, private toastr: ToastrService, private cdr: ChangeDetectorRef,
              public langService: LanguageService, public loaderService : LoaderService) { }

  ngOnInit() {
    this.getAuthorList();
  }

  getAuthorList() {
    this.adminService.getAuthorList(this.paginationAndSearchParams).subscribe({
      next: response => {
        this.authors = response.data;
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
      this.getAuthorList();
    }
  }

  onSearch(event: Event) {
    // Prevent the default form submission
    event.preventDefault();

    this.paginationAndSearchParams.search = this.searchTerm?.nativeElement.value;
    this.paginationAndSearchParams.pageNumber = 1;
    this.getAuthorList();
  }

  onDelete(id: number) {
    const translationKeys = ['Confirm-delete-main', 'Success-delete-main'];

    this.langService.getTranslatedMessages(translationKeys)
    .subscribe(({ 'Confirm-delete-main': confirmMessage, 'Success-delete-main': successMessage }:
     Record<string, string>) => {
      if (confirm(confirmMessage)) {
        this.adminService.deleteAuthor(id).subscribe({
          next: () => {
            this.toastr.error(successMessage);
            this.getAuthorList();
          },
          error: (err) => console.log(err)
        });
      }
    });
  }
}
