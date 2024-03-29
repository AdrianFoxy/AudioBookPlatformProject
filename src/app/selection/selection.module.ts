import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SelectionComponent } from './selection.component';
import { SelectionDetailsComponent } from './selection-details/selection-details.component';
import { SelectionRoutingModule } from './selection-routing.module';
import { SharedModule } from '../shared/shared.module';
import { SelectionItemComponent } from './selection-item/selection-item.component';
import { LibraryModule } from '../library/library.module';



@NgModule({
  declarations: [
    SelectionComponent,
    SelectionDetailsComponent,
    SelectionItemComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    SelectionRoutingModule,
    LibraryModule
 ]
})
export class SelectionModule { }
