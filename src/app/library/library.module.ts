import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LibraryComponent } from './library.component';
import { BookDetailsComponent } from './book-details/book-details.component';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../shared/shared.module';
import { AudiobookItemComponent } from './audiobook-item/audiobook-item.component';

import {MatFormFieldModule} from '@angular/material/form-field';
import {MatSelectModule} from '@angular/material/select';

import {MatSliderModule} from '@angular/material/slider';


@NgModule({
  declarations: [
    LibraryComponent,
    BookDetailsComponent,
    AudiobookItemComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    MatFormFieldModule,
    MatSelectModule,
    MatSliderModule,
    SharedModule
  ],
  exports:[
    LibraryComponent
  ]
})
export class LibraryModule { }
