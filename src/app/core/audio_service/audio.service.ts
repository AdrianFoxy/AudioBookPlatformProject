import { Injectable } from '@angular/core';
import * as moment from 'moment';
import { BehaviorSubject, Observable, Subject, takeUntil } from 'rxjs';
import { StreamState } from 'src/app/shared/models/stream-state';

@Injectable({
  providedIn: 'root'
})
export class AudioService {

  private stop$ = new Subject();
  audioObj = new Audio();

  audioEvents = [
    "ended",
    "error",
    "play",
    "playing",
    "pause",
    "timeupdate",
    "canplay",
    "loadedmetadata",
    "loadstart"
  ];

  // default state
  private state: StreamState = {
    playing: false,
    readableCurrentTime: '',
    readableDuration: '',
    duration: undefined,
    currentTime: undefined,
    canplay: false,
    error: false,
    ended: false
  };
  currentFile: any;

  constructor() { }

  streamObservable(url: string){
    return new Observable(observer => {

      // Code to play choosen audio
      this.audioObj.src = url;
      this.audioObj.load();
      this.audioObj.play();

      const handler = (event: Event) => {
        this.updateStateEvents(event);
        observer.next(event);
      }

      this.addEvent(this.audioObj, this.audioEvents, handler);

      return () => {
        // Stop Playing
        this.audioObj.pause();
        this.audioObj.currentTime = 0;
        // remove event listeners
        this.removeEvent(this.audioObj, this.audioEvents, handler);
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

  // playback methods

  playStream(url: string) {
    return this.streamObservable(url).pipe(takeUntil(this.stop$));
  }

  play() {
    this.audioObj.play();
  }

  pause() {
    this.audioObj.pause();
  }

  stop() {
    this.audioObj.pause();
    this.audioObj.currentTime = 0;
  }

  setVolume(ev:any){
    if(ev && ev.target && ev.target.value !== undefined){
      this.audioObj.volume = ev.target.value;
    } else {
      this.audioObj.volume = ev;
    }
  }

  seekTo(ev: any) {
    if (ev && ev.target && ev.target.value !== undefined) {
      this.audioObj.currentTime = ev.target.value;
    } else {
      this.audioObj.currentTime = ev;
    }
  }

  getVolume(){
    //console.log(this.audioObj.volume);
    return this.audioObj.volume;
  }

  formatTime(time: number, format: string = 'HH:mm:ss') {
    const momentTime = time * 1000;
    return moment.utc(momentTime).format(format);
  }

  private stateChange: BehaviorSubject<StreamState> = new BehaviorSubject(
    this.state
  );

  private updateStateEvents(event: Event): void {
    switch (event.type) {
      case "canplay":
        this.state.duration = this.audioObj.duration;
        this.state.readableDuration = this.formatTime(this.state.duration);
        this.state.canplay = true;
        break;
      case "playing":
        this.state.ended = false;
        this.state.playing = true;
        break;
      case "pause":
        this.state.playing = false;
        break;
      case "timeupdate":
        this.state.currentTime = this.audioObj.currentTime;
        this.state.readableCurrentTime = this.formatTime(
          this.state.currentTime
        );
        break;
      case "error":
        this.resetState();
        this.state.error = true;
        break;
      case "ended":
        // Добавляем вывод в консоль при событии "ended"

        console.log("Аудиофайл завершил воспроизведение.");
        this.state.ended = true;

        break;

    }
    this.stateChange.next(this.state);
  }

  private resetState() {
    this.state = {
      playing: false,
      readableCurrentTime: '',
      readableDuration: '',
      duration: undefined,
      currentTime: undefined,
      canplay: false,
      error: false,
      ended: false
    };

  }

  getState(): Observable<StreamState> {
    return this.stateChange.asObservable();
  }

}
