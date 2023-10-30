import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserProfileComponent } from './user-profile.component';
import { RouterModule, Routes } from '@angular/router';
import { authGuard } from '../core/guards/auth.guard';

const routes: Routes = [
  {path: ':username', component: UserProfileComponent, canActivate: [authGuard]},
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
export class UserProfileRoutingModule { }
