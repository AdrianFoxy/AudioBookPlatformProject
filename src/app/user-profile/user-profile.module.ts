import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserProfileComponent } from './user-profile.component';
import { SharedModule } from '../shared/shared.module';
import { UserProfileRoutingModule } from './user-profile-routing.module';
import { EditUserComponent } from './edit-user/edit-user.component';
import { LibraryModule } from '../library/library.module';
import { FormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    UserProfileComponent,
    EditUserComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    UserProfileRoutingModule,
    LibraryModule,
    FormsModule
  ]
})
export class UserProfileModule { }
