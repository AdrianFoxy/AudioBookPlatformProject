import { NgModule } from '@angular/core';
import { AdminComponent } from './admin.component';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../core/guards/auth.guard';
import { adminGuard } from '../core/guards/admin.guard';
import { GenreComponent } from './genre/genre.component';
import { AddGenreComponent } from './genre/add-genre/add-genre.component';
import { EditGenreComponent } from './genre/edit-genre/edit-genre.component';
import { NarratorComponent } from './narrator/narrator.component';
import { AddNarratorComponent } from './narrator/add-narrator/add-narrator.component';
import { EditNarratorComponent } from './narrator/edit-narrator/edit-narrator.component';
import { BookSeriesComponent } from './book-series/book-series.component';
import { AddBookSeriesComponent } from './book-series/add-book-series/add-book-series.component';
import { EditBookSeriesComponent } from './book-series/edit-book-series/edit-book-series.component';
import { BookLanguageComponent } from './book-language/book-language.component';
import { AddBookLanguageComponent } from './book-language/add-book-language/add-book-language.component';
import { EditBookLanguageComponent } from './book-language/edit-book-language/edit-book-language.component';

const routes: Routes = [
  {path: '', component: AdminComponent, canActivate: [AuthGuard, adminGuard]},
  {path: 'genre', component: GenreComponent, canActivate: [AuthGuard, adminGuard]},
  {path: 'genre/add-genre', component: AddGenreComponent, canActivate: [AuthGuard, adminGuard]},
  {path: 'genre/edit-genre/:id', component: EditGenreComponent, canActivate: [AuthGuard, adminGuard]},
  {path: 'narrator', component: NarratorComponent,  canActivate: [AuthGuard, adminGuard]},
  {path: 'narrator/add-narrator', component: AddNarratorComponent, canActivate: [AuthGuard, adminGuard]},
  {path: 'narrator/edit-narrator/:id', component: EditNarratorComponent, canActivate: [AuthGuard, adminGuard]},
  {path: 'book-series', component: BookSeriesComponent,  canActivate: [AuthGuard, adminGuard]},
  {path: 'book-series/add-book-series', component: AddBookSeriesComponent, canActivate: [AuthGuard, adminGuard]},
  {path: 'book-series/edit-book-series/:id', component: EditBookSeriesComponent, canActivate: [AuthGuard, adminGuard]},
  {path: 'book-language', component: BookLanguageComponent,  canActivate: [AuthGuard, adminGuard]},
  {path: 'book-language/add-book-language', component: AddBookLanguageComponent, canActivate: [AuthGuard, adminGuard]},
  {path: 'book-language/edit-book-language/:id', component: EditBookLanguageComponent, canActivate: [AuthGuard, adminGuard]}
]

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [
    RouterModule
  ]
})
export class AdminRoutingModule { }
