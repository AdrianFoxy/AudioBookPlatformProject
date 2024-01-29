import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LibraryComponent } from './library.component';
import { FilterPipe } from './pipes/filter.pipe';
import { LibraryRoutingModule } from './library-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';

import {MatInputModule} from '@angular/material/input';
import { NgxMatSelectSearchModule } from 'ngx-mat-select-search';
import { AudiobookItemComponent } from './audiobook-item/audiobook-item.component';
import { BookDetailsComponent } from './book-details/book-details.component';

import { AuthorDetailsComponent } from './author-details/author-details.component';
import { ReviewFormComponent } from './book-details/review-form/review-form.component';

@NgModule({
  declarations: [
    LibraryComponent,
    FilterPipe,
    AudiobookItemComponent,
    BookDetailsComponent,
    AuthorDetailsComponent,
    ReviewFormComponent
 ],
  imports: [
    CommonModule,
    LibraryRoutingModule,
    ReactiveFormsModule,
    NgxMatSelectSearchModule,
    MatInputModule,
    FormsModule,
    SharedModule
  ],
  exports:[AudiobookItemComponent]
})
export class LibraryModule { }
