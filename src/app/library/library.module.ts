import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LibraryComponent } from './library.component';
import { BookDetailsComponent } from './book-details/book-details.component';
import { RouterModule } from '@angular/router';



@NgModule({
  declarations: [
    LibraryComponent,
    BookDetailsComponent
  ],
  imports: [
    CommonModule,
    RouterModule
  ],
  exports:[
  ]
})
export class LibraryModule { }
