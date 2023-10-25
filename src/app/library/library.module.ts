import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LibraryComponent } from './library.component';
import { FilterPipe } from './pipes/filter.pipe';
import { LibraryRoutingModule } from './library-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';

import {MatFormFieldModule} from '@angular/material/form-field';
import {MatSelectModule} from '@angular/material/select';
import {MatInputModule} from '@angular/material/input';
import {MatSliderModule} from '@angular/material/slider';
import {MatChipsModule} from '@angular/material/chips';
import {MatIconModule} from '@angular/material/icon';
import { NgxMatSelectSearchModule } from 'ngx-mat-select-search';
import { AudiobookItemComponent } from './audiobook-item/audiobook-item.component';
import { BookDetailsComponent } from './book-details/book-details.component';

import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import { AuthorDetailsComponent } from './author-details/author-details.component';

@NgModule({
  declarations: [
    LibraryComponent,
    FilterPipe,
    AudiobookItemComponent,
    BookDetailsComponent,
    AuthorDetailsComponent
  ],
  imports: [
    CommonModule,
    LibraryRoutingModule,
    MatFormFieldModule,
    MatSelectModule,
    MatSliderModule,
    MatChipsModule,
    MatIconModule,
    ReactiveFormsModule,
    NgxMatSelectSearchModule,
    MatProgressSpinnerModule,
    MatInputModule,
    FormsModule,
    SharedModule
  ]
})
export class LibraryModule { }
