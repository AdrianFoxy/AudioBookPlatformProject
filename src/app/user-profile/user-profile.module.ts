import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserProfileComponent } from './user-profile.component';
import { SharedModule } from '../shared/shared.module';
import { UserProfileRoutingModule } from './user-profile-routing.module';
import { EditUserComponent } from './edit-user/edit-user.component';
import { LibraryModule } from '../library/library.module';
import { FormsModule } from '@angular/forms';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatInputModule } from '@angular/material/input';



@NgModule({
  declarations: [
    UserProfileComponent,
    EditUserComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    UserProfileRoutingModule,
    MatProgressSpinnerModule,
    MatInputModule,
    LibraryModule,
    FormsModule
  ]
})
export class UserProfileModule { }
