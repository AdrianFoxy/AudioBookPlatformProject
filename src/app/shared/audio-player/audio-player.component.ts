import { ChangeDetectorRef, Component, Input, OnDestroy, OnInit } from '@angular/core';
import { StreamState } from '../models/stream-state';
import { AudioService } from 'src/app/core/services/audio_service/audio.service';
import { DarkModeService } from 'src/app/core/services/dark-mode-service/dark-mode.service';
import { SingleAudioBook } from '../models/singleAudioBook';

@Component({
  selector: 'app-audio-player',
  templateUrl: './audio-player.component.html',
  styleUrls: ['./audio-player.component.scss']
})
export class AudioPlayerComponent implements OnDestroy, OnInit {

  @Input() audiobook?: SingleAudioBook

  files: Array<any> = [];
  state: StreamState | undefined;
  currentFile: any = {};
  activeItemIndex: number = -1;

  currentAudioKey = 'currentAudio';

  sleepMinutes: number = 0;
  countdownMinutes: number = 0;
  countdownSeconds: number = 0;
  countdownInterval: any;

  constructor(public darkmodeService: DarkModeService, private audioService: AudioService, private cdr: ChangeDetectorRef) {

    // listen to stream state
    this.audioService.getState()
      .subscribe(state => {
        this.state = state;
        // console.log(this.state);

        // if(this.state.playing == false && this.state.readableDuration != null){
        //   console.log('loading file');
        // }
      });

  }

  ngOnInit() {
    this.restorePlayerState();
    this.nextAudioAfterEnded();
    this.saveAudioDataBeforeF5();
  }

  // Basic player methods
  playStream(url: string) {
    this.audioService.playStream(url).subscribe(events => {
    });
  }

  openFile(file: { url: string; name: string }, index: any) {

    // Save old volume for new audio
    var volumeBefore = this.currentFile.currentVolume;
    var playbackRateBefore = this.currentFile.playbackRate;
    this.currentFile = { index, file };
    this.currentFile.name = file.name;
    this.audioService.stop();
    this.playStream(file.url);

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

  pause() {
    this.audioService.pause();

    clearInterval(this.countdownInterval);
    console.log("pause test before if");

    if (this.state && this.state.currentTime !== undefined) {
      console.log("pause test after if");
      const saveData = {
        currentFile: this.currentFile,
        currentTime: this.state?.currentTime,
        currentVolume: this.audioService.getVolume(),
        playbackRate: this.currentFile.playbackRate
      };
      localStorage.setItem(this.currentAudioKey, JSON.stringify(saveData));
    }
  }

  play() {
    console.log(this.state);

    if (localStorage.getItem(this.currentAudioKey) && !this.state?.canplay) {

      // console.log('Saved song data found.');
      this.playStream(this.currentFile.file.url);
      this.audioService.seekTo(this.currentFile.currentTime);
      this.changePlaybackRate(this.currentFile.playbackRate);

    } else {
      this.audioService.play();
    }
    this.hideOverlay();
  }

  playwithoutcontinue() {
    // console.log('playwithoutcontinue', this.state);

    if (localStorage.getItem(this.currentAudioKey) && !this.state?.canplay) {
      // console.log('Saved song data found.');
      this.playStream(this.currentFile.file.url);

      let hasStartedPlaying = false;

      this.audioService.getState().subscribe(state => {
        if (state.canplay && !hasStartedPlaying) {
          hasStartedPlaying = true;
          this.audioService.seekTo(this.currentFile.currentTime);
          this.audioService.pause();
          this.hideOverlay();
        }
      });
    }
    this.hideOverlay();
  }

  stop() {
    this.audioService.stop();
  }

  next() {
    if (!this.isLastPlaying()) {
      const index = this.currentFile.index + 1;
      const file = this.files[index];
      this.setActiveItem(index);
      this.openFile(file, index);
    }
  }

  previous() {
    const index = this.currentFile.index - 1;
    const file = this.files[index];
    this.setActiveItem(index);
    this.openFile(file, index);
  }

  isFirstPlaying() {
    return this.currentFile.index === 0;
  }

  isLastPlaying() {
    return this.currentFile.index === this.files.length - 1;
  }

  onSliderChangeEnd(change: Event) {
    this.audioService.seekTo(change);
    console.log(change);
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


  // ENDED AUDIO ID METHODS
  getPlayedSongIds(): string[] {
    const storedIdsString = localStorage.getItem('playedSongIds');
    return storedIdsString ? JSON.parse(storedIdsString) : [];
  }

  savePlayedSongIds(ids: string[]) {
    localStorage.setItem('playedSongIds', JSON.stringify(ids));
  }

  addToLocalStorage(id: string) {
    let storedIds = this.getPlayedSongIds();

    if (!storedIds.includes(id)) {
      storedIds.push(id);
      this.savePlayedSongIds(storedIds);
    }
  }

  isSongPlayed(id: string): boolean {
    const storedIds = this.getPlayedSongIds();
    return storedIds.includes(id);
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
      this.addToLocalStorage(this.currentFile.file.id);
      if (!this.isLastPlaying()) {
        // console.log(this.currentFile);
        this.next();
      }
    });
  }

  restorePlayerState() {
    const savedSong = localStorage.getItem(this.currentAudioKey);
    console.log("Restore up");

    if (savedSong) {
      const parsedData = JSON.parse(savedSong);
      if (parsedData && parsedData.currentFile) {
        this.currentFile = parsedData.currentFile;
        this.activeItemIndex = this.currentFile.index;
        this.currentFile.currentTime = parsedData.currentTime;
        this.currentFile.playbackRate = parsedData.playbackRate;

        this.changeVolume(parsedData.currentVolume);
        this.currentFile.currentVolume = parsedData.currentVolume;

        const sliderElement = document.querySelector('.seek_slider') as HTMLInputElement;
        if (sliderElement) {
          sliderElement.value = String(parsedData.currentTime);
        }

        // console.log('Parsed currentTime', this.currentFile.currentTime);
        if (this.currentFile.currentTime) {
          console.log("Restore current file");

          const overlay = document.querySelector('.overlay');
          console.log("Overlay value:", overlay);

          if (overlay) {
            console.log("Overlay remove hidden test");

            overlay.classList.remove('hidden');
            // console.log('Hidden overlay removed');
          }
        }
      }
    }
  }

  // SCCS METHOD

  // update audio progress bar
  getProgressBarBackground() {
    if(!this.darkmodeService.isLightTheme()){
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

  // ON DESTROY
  ngOnDestroy() {
    this.pause();
  }
}

