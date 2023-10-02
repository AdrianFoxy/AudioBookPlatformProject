import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Injectable({
  providedIn: 'root'
})
export class LanguageService {

  constructor(private translate: TranslateService) { }

  switchLanguage(language: string) {
    this.translate.use(language);
    localStorage.setItem('lang', language);
  }

  setCurrentLang() {
    const currentLang = this.whatCurrentLang();
    if (currentLang) {
      this.switchLanguage(currentLang);
    } else {
      this.translate.setDefaultLang('en');
      localStorage.setItem('lang', 'en');
    }
  }

  whatCurrentLang() {
    return localStorage.getItem('lang');
  }
}
