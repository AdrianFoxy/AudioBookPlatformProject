import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { SharedModule } from '../shared/shared.module';
import { FooterComponent } from './footer/footer.component';
import { TranslateModule } from '@ngx-translate/core';
import { RouterModule } from '@angular/router';

import {MatProgressBarModule} from '@angular/material/progress-bar';
import { TestErrorComponent } from './test-error/test-error.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { ServerErrorComponent } from './server-error/server-error.component';

import { ToastrModule } from 'ngx-toastr';

@NgModule({
  declarations: [
    NavBarComponent,
    FooterComponent,
    TestErrorComponent,
    NotFoundComponent,
    ServerErrorComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule,
    TranslateModule.forChild(),
    ToastrModule.forRoot({
      positionClass: 'toast-bottom-right',
      preventDuplicates: true
    }),
    MatProgressBarModule
  ], exports: [
    NavBarComponent,
    FooterComponent
  ]
})
export class CoreModule { }
