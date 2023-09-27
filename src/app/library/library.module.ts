import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LibraryComponent } from './library.component';
import { BookDetailsComponent } from './book-details/book-details.component';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../shared/shared.module';
import { AudiobookItemComponent } from './audiobook-item/audiobook-item.component';



@NgModule({
  declarations: [
    LibraryComponent,
    BookDetailsComponent,
    AudiobookItemComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    SharedModule
  ],
  exports:[
    LibraryComponent
  ]
})
export class LibraryModule { }
