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

  streamObservable(url: string) {
    return new Observable(observer => {
      this.audioObj.src = url;

      const loadedmetadataHandler = () => {
        // Audio is ready to play, so you can call play() here
        this.audioObj.play();
      };

      const eventHandler = (event: Event) => {
        this.updateStateEvents(event);
        observer.next(event);
      };

      const errorHandler = (error: Event) => {
        // Handle any errors that may occur during loading or playback
        observer.error(error);
      };

      // Add event listeners
      this.audioObj.addEventListener("loadedmetadata", loadedmetadataHandler);
      this.addEvent(this.audioObj, this.audioEvents, eventHandler);
      this.audioObj.addEventListener("error", errorHandler);

      // Cleanup function
      const cleanup = () => {
        // Remove event listeners
        this.audioObj.removeEventListener("loadedmetadata", loadedmetadataHandler);
        this.removeEvent(this.audioObj, this.audioEvents, eventHandler);
        this.audioObj.removeEventListener("error", errorHandler);

        // Stop playing and reset audio
        this.audioObj.pause();
        this.audioObj.currentTime = 0;
      };

      return cleanup;
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

  currentAudioFile(){
    return this.audioObj.src;
  }

  setCurrentAudioFile(url: string){
    this.audioObj.src = url;
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

  getVolume(){
    return this.audioObj.volume;
  }

  seekTo(ev: any) {
    if (ev && ev.target && ev.target.value !== undefined) {
      this.audioObj.currentTime = ev.target.value;
    } else {
      this.audioObj.currentTime = ev;
    }
  }

  setPlaybackRate(speed: number){
    if(this.audioObj){
      this.audioObj.playbackRate = speed;
    }
  }

  getPlayBackRate(){
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
