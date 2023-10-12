import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { SelectionComponent } from './selection/selection.component';
import { AboutComponent } from './about/about.component';

const routes: Routes = [
  {path: '', component: HomeComponent },
  {path: 'library', loadChildren: () => import('./library/library.module').then(m => m.LibraryModule)},
  {path: 'selection', component: SelectionComponent},
  {path: 'about', component: AboutComponent},
  {path: '**', redirectTo: '', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    scrollPositionRestoration: 'top',
  })],
  exports: [RouterModule]
})

export class AppRoutingModule { }
