import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AudioPlayerComponent } from './audio-player/audio-player.component';
import { FormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    AudioPlayerComponent
  ],
  imports: [
    CommonModule,
    FormsModule
  ],
  exports: [
    AudioPlayerComponent
  ]
})
export class SharedModule { }
