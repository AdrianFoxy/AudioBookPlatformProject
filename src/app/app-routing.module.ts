import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LibraryComponent } from './library/library.component';
import { BookDetailsComponent } from './library/book-details/book-details.component';

const routes: Routes = [
  {path: '', component: HomeComponent },
  {path: 'library', component: LibraryComponent},
  {path: 'library/:id', component: BookDetailsComponent},
  {path: '**', redirectTo: '', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
