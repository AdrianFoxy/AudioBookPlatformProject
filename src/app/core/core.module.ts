import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { SharedModule } from '../shared/shared.module';
import { FooterComponent } from './footer/footer.component';
import { TranslateModule } from '@ngx-translate/core';
import { RouterModule } from '@angular/router';

import {MatProgressBarModule} from '@angular/material/progress-bar';


@NgModule({
  declarations: [
    NavBarComponent,
    FooterComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule,
    TranslateModule.forChild(),
    MatProgressBarModule
  ], exports: [
    NavBarComponent,
    FooterComponent
  ]
})
export class CoreModule { }
