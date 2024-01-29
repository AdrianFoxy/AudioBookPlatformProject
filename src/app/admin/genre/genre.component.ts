import { ChangeDetectorRef, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { AdminService } from '../admin.service';
import { paginationAndSearchParams } from 'src/app/shared/models/paramsModels/paginationAndSearchParams';
import { Genre } from 'src/app/shared/models/adminModels/genre/genre';
import { ToastrService } from 'ngx-toastr';
import { LanguageService } from 'src/app/core/services/language-service/language.service';
import { LoaderService } from 'src/app/core/services/loader-service/loader.service';

@Component({
  selector: 'app-genre',
  templateUrl: './genre.component.html',
  styleUrls: ['./genre.component.scss', '../admin.component.scss']
})
export class GenreComponent implements OnInit{

  @ViewChild('search') searchTerm?: ElementRef;

  paginationAndSearchParams = new paginationAndSearchParams();
  totalCount = 0;

  genres: Genre[] = [];

  constructor(private adminService: AdminService, private toastr: ToastrService, private cdr: ChangeDetectorRef,
              public langService: LanguageService, public loaderService : LoaderService) { }

  ngOnInit() {
    this.getGenreList();
  }

  getGenreList() {
    this.adminService.getGenresList(this.paginationAndSearchParams).subscribe({
      next: response => {
        this.genres = response.data;
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
      this.getGenreList();
    }
  }

  onSearch(event: Event) {
    // Prevent the default form submission
    event.preventDefault();

    this.paginationAndSearchParams.search = this.searchTerm?.nativeElement.value;
    this.paginationAndSearchParams.pageNumber = 1;
    this.getGenreList();
  }

  onDelete(id: number) {
    const translationKeys = ['Confirm-delete-main', 'Success-delete-main'];

    this.langService.getTranslatedMessages(translationKeys)
    .subscribe(({ 'Confirm-delete-main': confirmMessage, 'Success-delete-main': successMessage }:
     Record<string, string>) => {
      if (confirm(confirmMessage)) {
        this.adminService.deleteGenre(id).subscribe({
          next: () => {
            this.toastr.error(successMessage);
            this.getGenreList();
          },
          error: (err) => console.log(err)
        });
      }
    });
  }

}
