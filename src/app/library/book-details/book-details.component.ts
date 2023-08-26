import { Component } from '@angular/core';

@Component({
  selector: 'app-book-details',
  templateUrl: './book-details.component.html',
  styleUrls: ['./book-details.component.scss']
})
export class BookDetailsComponent {
  song = new Audio();
  songs = [
    {url:'/assets/audio/FlyMeToTheMoon.mp3', name: 'Fly Me To The Moon'},
    {url:'/assets/audio/LemonTree.mp3', name: 'Lemon Tree'}
  ]

  currentTime = '0:00';
  duration = '0:00';
  currentPercentage = 0;

  openSong(song:any){
    this.song.src = song;
    this.song.load();
    this.song.play();
    this.song.addEventListener('loadedmetadata', () => {
      const minutes = Math.floor(this.song.duration / 60);
      const seconds = Math.floor(this.song.duration % 60);
      this.duration = `${minutes}:${String(seconds).padStart(2, '0')}`;
    });
    this.song.addEventListener('timeupdate', () => {
      const minutes = Math.floor(this.song.currentTime / 60);
      const seconds = Math.floor(this.song.currentTime % 60);
      this.currentTime = `${minutes}:${String(seconds).padStart(2, '0')}`;
      this.currentPercentage = (this.song.currentTime / this.song.duration) * 100;
    });
  }

  playSong(){
    this.song.play();
  }

  pauseSong(){
    this.song.pause();
  }

  stopSong(){
    this.song.pause();
    this.song.currentTime = 0;
  }

  vol(vl:any){
    this.song.volume=vl.target.value;
  }

  seekSong(event: MouseEvent) {
    const progressBar = event.target as HTMLProgressElement;
    const clickPosition = event.offsetX;
    const progressBarWidth = progressBar.offsetWidth;
    const seekTime = (clickPosition / progressBarWidth) * this.song.duration;
  }

}
