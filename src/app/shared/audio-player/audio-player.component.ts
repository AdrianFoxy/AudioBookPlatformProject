import { ChangeDetectorRef, Component, OnDestroy } from '@angular/core';
import { StreamState } from '../models/stream-state';
import { AudioService } from 'src/app/core/audio_service/audio.service';

@Component({
  selector: 'app-audio-player',
  templateUrl: './audio-player.component.html',
  styleUrls: ['./audio-player.component.scss']
})
export class AudioPlayerComponent implements OnDestroy {

  audioList = [
    { id: 'asd1asd', url: '/assets/audio/FlyMeToTheMoon.mp3', name: 'Fly Me To The Moon' },
    { id: 'asd2asd', url: '/assets/audio/LemonTree.mp3', name: 'Lemon Tree' },
    { id: 'asd3asd', url: '/assets/audio/y2mate.is - Life Is Beautiful-a3v-WcQR8T0-192k-1693653889.mp3', name: 'Life Is Beautiful' },
    { id: 'asd4asd', url: '/assets/audio/y2mate.is - Stray Gods The Ritual Red Path Everybody Wants to See You Fall in Love -qEyScxu714w-128k-1693649903.mp3', name: 'Everybody Wants to See You Fall in Love' },
    { id: 'asd5asd', url: '/assets/audio/y2mate.is - JP Cooper She s On My Mind Official Video -5Z0EWqe6cLM-128k-1693650679.mp3', name: 'She s On My Mind' },
    { id: 'asd6asd', url: '/assets/audio/y2mate.is - Adrift feat. Laura Bailey and Ashley Johnson from Stray Gods --HMq_9-Nn-A-192k-1693650865.mp3', name: 'Adrift' },
    { id: 'asd7asd', url: '/assets/audio/y2mate.is - Morena Mariana Nolasco part. Vitor Kley Fan Animated Music Video Witch Bunny -jTWb-RIdN-I-192k-1693650931.mp3', name: 'Morena' },
    { id: 'asd8asd', url: '/assets/audio/y2mate.is - Just The Two Of Us-52avIJWQWAY-192k-1693651021.mp3', name: 'Just Two Of Us' },
    { id: 'asd9asd', url: '/assets/audio/y2mate.is - the_world_outside__is_gonna_be_the_death_of_me_-3qKf4GMz9Jo-192k-1693654398.mp3', name: 'The World Outside (Is Gonna Be the Death of Me)' }
  ]

  files: Array<any> = [];
  state: StreamState | undefined;
  currentFile: any = {};
  activeItemIndex: number = -1;

  currentAudioKey = 'currentAudio';

  sleepMinutes: number = 0;
  countdownMinutes: number = 0;
  countdownSeconds: number = 0;
  countdownInterval: any;

  constructor(private audioService: AudioService, private cdr: ChangeDetectorRef) {
    this.files = this.audioList;
    // listen to stream state
    this.audioService.getState()
      .subscribe(state => {
        this.state = state;
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

    if (this.state && this.state.currentTime !== undefined) {
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

      console.log('Saved song data found.');
      this.playStream(this.currentFile.file.url);
      this.audioService.seekTo(this.currentFile.currentTime);
      this.changePlaybackRate(this.currentFile.playbackRate);

    } else {
      this.audioService.play();
    }
    this.hideOverlay();
  }

  playwithoutcontinue() {
    console.log('playwithoutcontinue', this.state);

    if (localStorage.getItem(this.currentAudioKey) && !this.state?.canplay) {
      // console.log('Saved song data found.');
      this.playStream(this.currentFile.file.url);
      this.audioService.seekTo(this.currentFile.currentTime);
      this.pause();
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
    if (savedSong) {
      const parsedData = JSON.parse(savedSong);
      if (parsedData && parsedData.currentFile) {
        this.currentFile = parsedData.currentFile;
        this.activeItemIndex = this.currentFile.index;
        this.currentFile.currentTime = parsedData.currentTime;
        this.currentFile.playbackRate = parsedData.playbackRate;

        this.changeVolume(parsedData.currentVolume);
        this.currentFile.currentVolume = parsedData.currentVolume;

        // console.log('Parsed currentTime', this.currentFile.currentTime);
        if (this.currentFile.currentTime) {
          const overlay = document.querySelector('.overlay');
          if (overlay) {
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
    if (this.state && this.state.duration !== undefined && this.state.currentTime !== undefined) {
      const percentage = (this.state.currentTime / this.state.duration) * 100;
      return {
        background: `linear-gradient(to right, #47d38d ${percentage}%, #8adeb4 ${percentage}%)`
      };
    }
    return {
      background: '#47d38d'
    };
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

