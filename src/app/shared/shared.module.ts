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


@NgModule({
  declarations: [
    AudioPlayerComponent,
    RecomentdationsComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    BrowserAnimationsModule,
    RouterModule,
    BsDropdownModule.forRoot(),
    SlickCarouselModule,
    TranslateModule.forChild()
  ],
  exports: [
    AudioPlayerComponent,
    RecomentdationsComponent
  ]
})
export class SharedModule { }
