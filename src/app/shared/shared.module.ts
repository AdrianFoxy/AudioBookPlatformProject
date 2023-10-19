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

@NgModule({
  declarations: [
    RecomentdationsComponent,
    PagingHeaderComponent,
    PagerComponent,
    AudioPlayerComponent
  ],
  imports: [
    CommonModule,
    SlickCarouselModule,
    RouterModule,
    BsDropdownModule.forRoot(),
    PaginationModule.forRoot(),
    TranslateModule.forChild(),
    ReactiveFormsModule
  ],
  exports:[
    RecomentdationsComponent,
    PagingHeaderComponent,
    PaginationModule,
    PagerComponent,
    AudioPlayerComponent,
    TranslateModule,
    ReactiveFormsModule
  ]
})
export class SharedModule { }
