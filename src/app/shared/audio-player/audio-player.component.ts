import { Component } from '@angular/core';
import { StreamState } from '../models/stream-state';
import { AudioService } from 'src/app/core/audio_service/audio.service';

@Component({
  selector: 'app-audio-player',
  templateUrl: './audio-player.component.html',
  styleUrls: ['./audio-player.component.scss']
})
export class AudioPlayerComponent {

  audioList = [
    {url:'/assets/audio/FlyMeToTheMoon.mp3', name: 'Fly Me To The Moon'},
    {url:'/assets/audio/LemonTree.mp3', name: 'Lemon Tree'}
  ]

  files: Array<any> = [];
  state: StreamState | undefined;
  currentFile: any = {};

  constructor(private audioService: AudioService) {

    this.files = this.audioList;

    // listen to stream state
    this.audioService.getState()
    .subscribe(state => {
      this.state = state;
    });
  }

  playStream(url: string) {
    this.audioService.playStream(url).subscribe(events => {
      // listening for fun here
    });
  }

  openFile(file: { url: string; }, index: any) {
    this.currentFile = { index, file };
    this.audioService.stop();
    this.playStream(file.url);
  }

  pause() {
    this.audioService.pause();
  }

  play() {
    this.audioService.play();
  }

  stop() {
    this.audioService.stop();
  }

  next() {
    const index = this.currentFile.index + 1;
    const file = this.files[index];
    this.openFile(file, index);
  }

  previous() {
    const index = this.currentFile.index - 1;
    const file = this.files[index];
    this.openFile(file, index);
  }

  changeVolume(ev:any){
    this.audioService.setVolume(ev);
  }

  isFirstPlaying() {
    return this.currentFile.index === 0;
  }

  isLastPlaying() {
    return this.currentFile.index === this.files.length - 1;
  }

  onSliderChangeEnd(change: Event) {
    this.audioService.seekTo(change);
  }
}
