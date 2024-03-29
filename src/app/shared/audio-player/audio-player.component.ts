import { ChangeDetectorRef, Component, Input, OnChanges, OnDestroy, OnInit, SimpleChanges } from '@angular/core';
import { StreamState } from '../models/stream-state';
import { AudioService } from 'src/app/core/services/audio.service';
import { DarkModeService } from 'src/app/core/services/dark-mode.service';
import { SingleAudioBook } from '../models/libraryModels/singleAudioBook';
import { ActivatedRoute, NavigationStart, Router } from '@angular/router';
import { BookAudioFile } from '../models/libraryModels/bookAudioFile';
import { LanguageService } from 'src/app/core/services/language.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-audio-player',
  templateUrl: './audio-player.component.html',
  styleUrls: ['./audio-player.component.scss']
})
export class AudioPlayerComponent implements OnChanges, OnDestroy, OnInit {

  @Input() audiobook?: SingleAudioBook

  files: Array<any> = [];
  state: StreamState | undefined;

  currentFile: any = {};

  activeItemIndex: number = -1;

  sleepMinutes: number = 0;
  countdownMinutes: number = 0;
  countdownSeconds: number = 0;
  countdownInterval: any;

  currentAudioBookId = this.activatedRoute.snapshot.paramMap.get('id');
  currentAudioKey = 'AudioBook_' + this.currentAudioBookId;

  routerSubscription: Subscription | undefined;

  constructor(public darkmodeService: DarkModeService, private audioService: AudioService,
    private cdr: ChangeDetectorRef, private activatedRoute: ActivatedRoute,
    public langService: LanguageService, private router: Router) {

    // listen to stream state
    this.audioService.getState()
      .subscribe(state => {
        this.state = state;
      });

    this.routerSubscription = router.events.subscribe(event => {
      if (event instanceof NavigationStart) {
        // Check if the component is being destroyed during navigation
        // console.log('pause works in router subs');
        this.pause();
        // console.log('NavigationStart event:', event);
      }
    });
  }

  ngOnInit() {
    // console.log('ngOnInit');
    this.initPlayer();
    this.addEvents();
  }

  ngOnChanges(changes: SimpleChanges): void {
    // console.log('ngOnChanges');
    const test = this.audiobook?.id?.toString();
    if (this.currentAudioBookId !== test) {
      this.resetCurrentFile();
      this.initPlayer();
    }
  }

  ngOnDestroy() {
    if (this.routerSubscription) {
      this.routerSubscription.unsubscribe();
    }
  }

  initPlayer(){
    // console.log('initPlayer');
    this.currentAudioBookId = this.activatedRoute.snapshot.paramMap.get('id');
    this.currentAudioKey = 'AudioBook_' + this.currentAudioBookId;
    this.setDefaultAudioValumeAndPlayBackRate();
    this.restorePlayerState();
  }

  addEvents(){
    // console.log('addEvents');
    this.removeEvents();
    this.nextAudioAfterEnded();
    this.saveAudioDataBeforeF5();
  }

  removeEvents() {
    // console.log('removeEvents');
    this.audioService.audioObj.removeEventListener('ended', this.nextAudioAfterEnded);
    window.removeEventListener('beforeunload', this.saveAudioDataBeforeF5);
  }

  resetCurrentFile() {
    this.currentFile = {};
    this.activeItemIndex = -1;
  }

  // Basic player methods
  playStream(url: string) {
    this.audioService.playStream(url).subscribe(events => {
    });
  }

  openFile(file: BookAudioFile, index: any) {

    if (index != this.activeItemIndex) {
      // Save old volume for new audio
      var volumeBefore = this.currentFile.currentVolume !== undefined ? this.currentFile.currentVolume : 1;

      var playbackRateBefore = this.currentFile.playbackRate !== undefined ? this.currentFile.playbackRate : 1;

      // this.currentFileMain = {index, file}
      this.currentFile = { index, file };

      this.audioService.stop();
      this.playStream(file.audioFileUrl);

      // UpdatePlaybackRate
      this.currentFile.playbackRate = playbackRateBefore;
      if (this.currentFile.playbackRate) {
        this.changePlaybackRate(this.currentFile.playbackRate);
      }

      // Set old volume for new song
      this.currentFile.currentVolume = volumeBefore;
      if (this.currentFile.currentVolume) {
        this.changeVolume(this.currentFile.currentVolume);
      }
    }
  }

  pause() {
    if (this.state && this.state.playing === true) {
      // console.log(this.currentAudioKey + '| pause works |' + this.currentFile.name);

      this.audioService.pause(
        this.currentAudioBookId || undefined,
        this.currentAudioKey,
        this.currentFile
      );
      clearInterval(this.countdownInterval);
    }
  }

  play() {
    const currentAudioFileUrl = this.currentFile.file?.audioFileUrl;

    if (currentAudioFileUrl) {
      const isDifferentAudio = this.audioService.currentAudioFile() !== currentAudioFileUrl;
      const isLocalStorageSet = localStorage.getItem(this.currentAudioKey);

      if (isDifferentAudio || (isLocalStorageSet && !this.state?.canplay)) {
        this.audioService.setCurrentAudioFile(currentAudioFileUrl);
        this.playStream(currentAudioFileUrl);
        this.audioService.seekTo(this.currentFile.currentTime);
        this.changePlaybackRate(this.currentFile.playbackRate);
      } else {
        this.audioService.play();
      }
    }

    this.hideOverlay();
  }


  // DO SOMETHING LATER
  playwithoutcontinue() {
    this.play();
  }

  stop() {
    this.audioService.stop();
  }

  next() {
    if (!this.isLastPlaying()) {
      const index = this.currentFile.index + 1;
      const file = this.audiobook?.bookAudioFile[index];
      if (file) {
        this.openFile(file, index);
        this.setActiveItem(index);
      }
    }
  }

  previous() {
    const index = this.currentFile.index - 1;
    const file = this.audiobook?.bookAudioFile[index];

    if (file) {
      this.openFile(file, index);
      this.setActiveItem(index);
    }
  }

  isFirstPlaying() {
    return this.currentFile.index === 0;
  }

  isLastPlaying() {
    return this.currentFile.index === (this.audiobook?.bookAudioFile?.length ?? -1) - 1;
  }

  onSliderChangeEnd(change: Event) {
    this.audioService.seekTo(change);
    // console.log(change);
  }

  skipForward() {
    if (this.state && this.state.currentTime !== undefined && this.state.duration !== undefined) {
      const currentTime = this.state.currentTime + 10;
      if (currentTime < this.state.duration) {
        this.audioService.seekTo(currentTime);
      } else {
        this.next();
      }
    }
  }

  skipBackward() {
    if (this.state && this.state.currentTime !== undefined) {
      const currentTime = this.state.currentTime - 10;
      if (currentTime >= 0) {
        this.audioService.seekTo(currentTime);
      } else {
        this.previous();
      }
    }
  }

  // SETTING METHODS, LIKE VOLUME AND PLAYBACK RATE
  changeVolume(ev: any) {
    this.audioService.setVolume(ev);
    this.currentFile.currentVolume = this.audioService.getVolume();
  }

  changePlaybackRate(speed: number) {
    if (isFinite(speed) && speed >= 0.5 && speed <= 4.0) {
      this.audioService.setPlaybackRate(speed);
      this.currentFile.playbackRate = speed;
    } else {
      // Handle invalid playback rate value here (e.g., show an error message)
      console.error('Invalid playback rate value:', speed);
    }
  }


  getPlayedSongIds(): Set<number> {
    const existingDataString = localStorage.getItem(this.currentAudioKey);
    let existingData = existingDataString ? JSON.parse(existingDataString) : {};

    if (existingData.hasOwnProperty('playedAudioIds')) {
      return new Set(existingData.playedAudioIds);
    } else {
      return new Set();
    }
  }


  savePlayedSongIds(ids: Set<number>) {
    const localStorageValue = localStorage.getItem(this.currentAudioKey);

    if (localStorageValue) {
      const currentAudioData = JSON.parse(localStorageValue);
      const playedAudioIds = new Set(currentAudioData.playedAudioIds || []);

      ids.forEach(id => playedAudioIds.add(id));

      currentAudioData.playedAudioIds = Array.from(playedAudioIds);
      localStorage.setItem(this.currentAudioKey, JSON.stringify(currentAudioData));
    } else {
      const playedAudioIds = Array.from(ids);
      localStorage.setItem(this.currentAudioKey, JSON.stringify({ playedAudioIds }));
    }
  }

  addToLocalStorage(id: number) {
    const storedIds = this.getPlayedSongIds();
    // console.log('ADD TO LOCAL STORAGE');
    if (!storedIds.has(id)) {
      storedIds.add(id);
      this.savePlayedSongIds(storedIds);
    }
  }

  isSongPlayed(id: number): boolean {
    const storedIds = this.getPlayedSongIds();
    return storedIds.has(id);
  }

  // TIMER METHODS
  stopTimer() {
    clearInterval(this.countdownInterval);
    this.countdownInterval = null;
    this.countdownMinutes = 0;
    this.countdownSeconds = 0;
  }

  setSleepTimer(minutes: number) {
    this.stopTimer();
    const totalSeconds = minutes * 60;
    this.countdownMinutes = Math.floor(totalSeconds / 60);
    this.countdownSeconds = totalSeconds % 60;
    this.startCountdown();
  }

  startCountdown() {
    this.countdownInterval = setInterval(() => {
      if (this.countdownSeconds === 0) {
        if (this.countdownMinutes === 0) {
          clearInterval(this.countdownInterval); // Stop timer if 0
          this.pause();
        } else {
          this.countdownMinutes--;
          this.countdownSeconds = 59;
        }
      } else {
        this.countdownSeconds--;
      }
      this.cdr.detectChanges(); // Update
    }, 1000); // Update every 1 second
  }

  formatWithLeadingZeros(value: number): string {
    return value < 10 ? `0${value}` : `${value}`;
  }

  // Secondary methods, data converting, restore data, method for OnInit and etc
  convertToPercentage(value: number): string {
    if (value < 0) {
      value = 0;
    } else if (value > 1) {
      value = 1;
    }
    const percentage = Math.round(value * 100);
    return percentage + '%';
  }

  formatTime(time: number) {
    return this.audioService.formatTime(time);
  }

  saveAudioDataBeforeF5() {
    window.addEventListener('beforeunload', () => {
      this.pause();
    });
  }

  nextAudioAfterEnded() {
    this.audioService.audioObj.addEventListener('ended', () => {
      if (this.currentFile)
        this.addToLocalStorage(this.currentFile.file.id);

      if (!this.isLastPlaying()) {
        this.next();
      }
    });
  }

  restorePlayerState() {
    const savedSong = localStorage.getItem(this.currentAudioKey);
    // console.log("Restore up");

    if (savedSong) {
      const parsedData = JSON.parse(savedSong);
      const id = this.currentAudioBookId;
      // console.log(parsedData.audioBookId + ' ' + id);

      if (parsedData && parsedData.currentFile && parsedData.audioBookId == id) {

        this.currentFile = parsedData.currentFile;

        this.activeItemIndex = this.currentFile.index;
        this.currentFile.currentTime = parsedData.currentFile.currentTime;
        this.currentFile.playbackRate = parsedData.playbackRate;

        this.changeVolume(parsedData.currentVolume);
        this.currentFile.currentVolume = parsedData.currentVolume;

        const sliderElement = document.querySelector('.seek_slider') as HTMLInputElement;
        if (sliderElement) {
          sliderElement.value = String(parsedData.currentFile.currentTime);
        }
        if (this.currentFile.currentTime) {
          // console.log("Restore current file");
          const overlay = document.querySelector('.overlay');
          // console.log("Overlay value:", overlay);

          if (overlay) {
            // console.log("Overlay remove hidden test");
            overlay.classList.remove('hidden');
          }
        }
      }
    } else {
      const overlay = document.querySelector('.overlay');
      if (overlay) overlay.classList.add('hidden');
    }
  }

  private setDefaultAudioValumeAndPlayBackRate() {
    this.currentFile.currentVolume = this.currentFile.currentVolume || 1;
    this.currentFile.playbackRate = this.currentFile.playbackRate || 1;
  }

  // SCCS METHOD

  // update audio progress bar
  getProgressBarBackground() {
    if (!this.darkmodeService.isLightTheme()) {
      if (this.state && this.state.duration !== undefined && this.state.currentTime !== undefined) {
        const percentage = (this.state.currentTime / this.state.duration) * 100;
        return {
          background: `linear-gradient(to right, #546ace ${percentage}%, #d7d7d8 ${percentage}%)`
        };
      }
      return {
        background: '#546ace'
      };
    } else {
      if (this.state && this.state.duration !== undefined && this.state.currentTime !== undefined) {
        const percentage = (this.state.currentTime / this.state.duration) * 100;
        return {
          background: `linear-gradient(to right, #47d38d ${percentage}%, #d5e0ff ${percentage}%)`
        };
      }
      return {
        background: '#47d38d'
      };
    }
  }

  // active element in playlist
  setActiveItem(index: number) {
    this.activeItemIndex = index;
    // console.log('Set active is ok' + this.activeItemIndex);
  }

  // overlay after using F5 or just open page after
  hideOverlay() {
    if (this.currentFile.currentTime) {
      const overlay = document.querySelector('.overlay');
      if (overlay) {
        overlay.classList.add('hidden');
        // console.log('Hidden overlay added');
      }
    }
  }
}
