import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AudioPlayerComponent } from './audio-player/audio-player.component';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { RecomentdationsComponent } from './recomentdations/recomentdations.component';
import { RouterModule } from '@angular/router';
import { SlickCarouselModule } from 'ngx-slick-carousel';
import { TranslateModule } from '@ngx-translate/core';

import { PaginationModule } from 'ngx-bootstrap/pagination';
import { PagingHeaderComponent } from './paging-header/paging-header.component';
import { PagerComponent } from './pager/pager.component';


@NgModule({
  declarations: [
    AudioPlayerComponent,
    RecomentdationsComponent,
    PagingHeaderComponent,
    PagerComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    BrowserAnimationsModule,
    RouterModule,
    BsDropdownModule.forRoot(),
    SlickCarouselModule,
    PaginationModule.forRoot(),
    TranslateModule.forChild()
  ],
  exports: [
    AudioPlayerComponent,
    RecomentdationsComponent,
    PagingHeaderComponent,
    PaginationModule,
    PagerComponent,
    TranslateModule
  ]
})
export class SharedModule { }
