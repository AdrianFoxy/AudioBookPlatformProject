import { Component, OnInit } from '@angular/core';
import { DarkModeService } from '../services/dark-mode-service/dark-mode.service';
import { TranslateService } from '@ngx-translate/core';
import { LanguageService } from '../services/language-service/language.service';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss']
})
export class NavBarComponent implements OnInit {

  constructor(public darkmodeService: DarkModeService, public langService: LanguageService) {

    this.langService.setCurrentLang();
  }

  ngOnInit() {
    this.darkmodeService.setCurrentTheme();
  }

}
