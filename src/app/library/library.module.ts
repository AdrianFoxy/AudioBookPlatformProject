import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LibraryComponent } from './library.component';
import { BookDetailsComponent } from './book-details/book-details.component';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../shared/shared.module';
import { AudiobookItemComponent } from './audiobook-item/audiobook-item.component';


import {MatFormFieldModule} from '@angular/material/form-field';
import {MatSelectModule} from '@angular/material/select';
import {MatInputModule} from '@angular/material/input';

import {MatSliderModule} from '@angular/material/slider';

import {MatChipsModule} from '@angular/material/chips';
import {MatIconModule} from '@angular/material/icon';


import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { NgxMatSelectSearchModule } from 'ngx-mat-select-search';

import { FilterPipe } from './pipes/filter.pipe';


@NgModule({
  declarations: [
    LibraryComponent,
    BookDetailsComponent,
    FilterPipe,
    AudiobookItemComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    MatFormFieldModule,
    MatSelectModule,
    MatSliderModule,
    MatChipsModule,
    MatIconModule,
    ReactiveFormsModule,
    NgxMatSelectSearchModule,
    MatInputModule,
    FormsModule,
    SharedModule
  ],
  exports:[
    LibraryComponent
  ]
})
export class LibraryModule { }
