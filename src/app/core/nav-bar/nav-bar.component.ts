import { Component, OnInit } from '@angular/core';
import { DarkModeService } from '../services/dark-mode-service/dark-mode.service';
import { LanguageService } from '../services/language-service/language.service';
import { LoaderService } from '../services/loader-service/loader.service';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss']
})

export class NavBarComponent {

  constructor(public darkmodeService: DarkModeService, public langService: LanguageService,
    public loaderService: LoaderService) {
    this.langService.setCurrentLang();
  }

  ngOnInit() {
    this.darkmodeService.setCurrentTheme();
  }
}
