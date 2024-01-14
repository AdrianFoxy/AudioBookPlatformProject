import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Observable } from 'rxjs';

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
      this.translate.setDefaultLang('en-US');
      localStorage.setItem('lang', 'en-US');
    }
  }

  whatCurrentLang() {
    return localStorage.getItem('lang');
  }

  getTranslatedMessage(key: string): Observable<string> {
    return this.translate.get(key);
  }
  getTranslatedMessages(keys: string[]): Observable<Record<string, string>> {
    return this.translate.get(keys);
  }

}
