import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminComponent } from './admin.component';

import { NgChartsModule } from 'ng2-charts';
import { AdminRoutingModule } from './admin-routing.module';
import { MatCardModule} from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { SharedModule } from '../shared/shared.module';
import { GenreComponent } from './genre/genre.component';
import { AddGenreComponent } from './genre/add-genre/add-genre.component';
import { EditGenreComponent } from './genre/edit-genre/edit-genre.component';
import { NarratorComponent } from './narrator/narrator.component';
import { AddNarratorComponent } from './narrator/add-narrator/add-narrator.component';
import { EditNarratorComponent } from './narrator/edit-narrator/edit-narrator.component';
import { BookSeriesComponent } from './book-series/book-series.component';
import { EditBookSeriesComponent } from './book-series/edit-book-series/edit-book-series.component';
import { AddBookSeriesComponent } from './book-series/add-book-series/add-book-series.component';
import { BookLanguageComponent } from './book-language/book-language.component';
import { AddBookLanguageComponent } from './book-language/add-book-language/add-book-language.component';
import { EditBookLanguageComponent } from './book-language/edit-book-language/edit-book-language.component';
import { AuthorComponent } from './author/author.component';
import { AddAuthorComponent } from './author/add-author/add-author.component';
import { EditAuthorComponent } from './author/edit-author/edit-author.component';


@NgModule({
  declarations: [
    AdminComponent,
    GenreComponent,
    AddGenreComponent,
    EditGenreComponent,
    NarratorComponent,
    AddNarratorComponent,
    EditNarratorComponent,
    BookSeriesComponent,
    EditBookSeriesComponent,
    AddBookSeriesComponent,
    BookLanguageComponent,
    AddBookLanguageComponent,
    EditBookLanguageComponent,
    AuthorComponent,
    AddAuthorComponent,
    EditAuthorComponent,
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    NgChartsModule,
    MatCardModule,
    MatIconModule,
    SharedModule
  ]
})
export class AdminModule { }
