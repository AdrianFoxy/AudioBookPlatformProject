import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RecomentdationsComponent } from './recomentdations/recomentdations.component';
import { TranslateModule } from '@ngx-translate/core';
import { SlickCarouselModule } from 'ngx-slick-carousel';
import { RouterModule } from '@angular/router';
import { PagingHeaderComponent } from './paging-header/paging-header.component';
import { PagerComponent } from './pager/pager.component';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';

import { PaginationModule } from 'ngx-bootstrap/pagination';
import { AudioPlayerComponent } from './audio-player/audio-player.component';
import { ReactiveFormsModule } from '@angular/forms';
import { TextInputComponent } from './components/text-input/text-input.component';

import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatNativeDateModule} from '@angular/material/core';

@NgModule({
  declarations: [
    RecomentdationsComponent,
    PagingHeaderComponent,
    PagerComponent,
    AudioPlayerComponent,
    TextInputComponent
  ],
  imports: [
    CommonModule,
    SlickCarouselModule,
    RouterModule,
    BsDropdownModule.forRoot(),
    PaginationModule.forRoot(),
    TranslateModule.forChild(),
    ReactiveFormsModule,
    MatFormFieldModule, MatInputModule, MatDatepickerModule, MatNativeDateModule
  ],
  exports:[
    RecomentdationsComponent,
    PagingHeaderComponent,
    PaginationModule,
    PagerComponent,
    AudioPlayerComponent,
    TranslateModule,
    ReactiveFormsModule,
    BsDropdownModule,
    TextInputComponent,
    MatFormFieldModule, MatInputModule, MatDatepickerModule, MatNativeDateModule
  ]
})
export class SharedModule { }
