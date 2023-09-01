import { Component } from '@angular/core';
import * as moment from 'moment';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-book-details',
  templateUrl: './book-details.component.html',
  styleUrls: ['./book-details.component.scss']
})
export class BookDetailsComponent {
  audio = new Audio();
  audioList = [
    {url:'/assets/audio/FlyMeToTheMoon.mp3', name: 'Fly Me To The Moon'},
    {url:'/assets/audio/LemonTree.mp3', name: 'Lemon Tree'}
  ]

  audioEvents = [
    "ended",
    "error",
    "play",
    "pause",
    "timeupdate",
    "canplay",
    "loadedmetadata",
    "loadstart"
  ];

  currentTime = '00:00:00';
  duration = '00:00:00';
  seek = 0;


  openAudioFile(audio:any){
    this.streamObserver(audio).subscribe(event => {});

    console.log(audio);
  }

  playAudio(){
    this.audio.play();
    console.log("Clicked play btn");
  }

  pauseAudio(){
    this.audio.pause();
    console.log("Clicked pause btn");
  }

  stopAudio(){
    this.audio.pause();
    this.audio.currentTime = 0;
    console.log("Clicked stop btn");
  }

  setVolume(ev:any){
    this.audio.volume = ev.target.value;
    console.log(ev.target.value);
  }

  formatTime(time: number, format: string = "HH:mm:ss") {
    const momentTime = time * 1000;
    return moment.utc(momentTime).format(format);
  }

  setSeekTo(ev: any){
    this.audio.currentTime = ev.target.value;
  }

  streamObserver(audio:any){
    return new Observable(observer => {

      this.audio.src = audio;
      this.audio.load();
      this.audio.play();

      const handler = (event: Event) => {
        console.log(event);
        this.seek = this.audio.currentTime;
        this.duration = this.formatTime(this.audio.duration);
        this.currentTime = this.formatTime(this.audio.currentTime);
      }

      this.addEvent(this.audio, this.audioEvents, handler);

      return () => {
        this.audio.pause();
        this.audio.currentTime = 0;

        this.removeEvent(this.audio, this.audioEvents, handler);
      }
    });
  }

  addEvent(obj: EventTarget, events: string[], handler: (event: Event) => void) {
    events.forEach(event => {
      obj.addEventListener(event, handler);
    });
  }

  removeEvent(obj: EventTarget, events: string[], handler: (event: Event) => void) {
    events.forEach(event => {
      obj.removeEventListener(event, handler);
    });
  }




}
