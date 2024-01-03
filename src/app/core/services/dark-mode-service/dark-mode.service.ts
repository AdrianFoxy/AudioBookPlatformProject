import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DarkModeService {

  constructor() { }


  setCurrentTheme(){
    const theme = localStorage.getItem('theme');
    if (!theme) {
      localStorage.setItem('theme', 'light');
    } else {
      this.setBodyTheme(theme);
    }
  }

  changeThemeColor(){
    const body = document.getElementsByTagName('body')[0];
    if (body.classList.contains('dark-theme')){
      body.classList.remove('dark-theme');
      // console.log('Dark removed');
      localStorage.setItem('theme', 'light');

    } else {
      body.classList.add('dark-theme');
      // console.log('Dark added');
      localStorage.setItem('theme', 'dark');
    }
    return true
  }

  private setBodyTheme(theme: string) {
    const body = document.getElementsByTagName('body')[0];
    body.classList.remove('light-theme', 'dark-theme');
    body.classList.add(`${theme}-theme`);
  }

  isLightTheme() {
    return localStorage.getItem('theme') === 'light';
  }

}
