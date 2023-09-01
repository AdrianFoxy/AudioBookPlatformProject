import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AudioPlayerComponent } from './audio-player/audio-player.component';



@NgModule({
  declarations: [
    AudioPlayerComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    AudioPlayerComponent
  ]
})
export class SharedModule { }
