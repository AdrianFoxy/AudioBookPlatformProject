import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { SelectionComponent } from './selection.component';
import { SelectionDetailsComponent } from './selection-details/selection-details.component';

const routes: Routes = [
  {path: '', component: SelectionComponent},
  {path: ':id', component: SelectionDetailsComponent},
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
export class SelectionRoutingModule { }
