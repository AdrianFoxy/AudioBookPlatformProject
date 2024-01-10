import { Component, ElementRef, ViewChild } from '@angular/core';
import { AdminService } from '../admin.service';
import { paginationAndSearchParams } from 'src/app/shared/models/paramsModels/paginationAndSearchParams';
import { Genre } from 'src/app/shared/models/adminModels/genre';

@Component({
  selector: 'app-genre',
  templateUrl: './genre.component.html',
  styleUrls: ['./genre.component.scss']
})
export class GenreComponent {

  @ViewChild('search') searchTerm?: ElementRef;

  paginationAndSearchParams = new paginationAndSearchParams();
  totalCount = 0;

  genres: Genre[] = [];

  constructor(private adminService: AdminService) { }

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


}
