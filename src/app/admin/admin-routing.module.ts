import { NgModule } from '@angular/core';
import { AdminComponent } from './admin.component';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../core/guards/auth.guard';
import { adminGuard } from '../core/guards/admin.guard';
import { GenreComponent } from './genre/genre.component';

const routes: Routes = [
  {path: '', component: AdminComponent, canActivate: [AuthGuard, adminGuard]},
  {path: 'genre', component: GenreComponent, canActivate: [AuthGuard, adminGuard]}
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
