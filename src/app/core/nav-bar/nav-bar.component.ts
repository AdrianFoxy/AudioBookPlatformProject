import { Component, OnInit } from '@angular/core';
import { DarkModeService } from '../services/dark-mode.service';
import { LanguageService } from '../services/language.service';
import { LoaderService } from '../services/loader.service';
import { AccountService } from 'src/app/account/account.service';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss']
})

export class NavBarComponent {

  constructor(public darkmodeService: DarkModeService, public langService: LanguageService,
    public loaderService: LoaderService, public accountService: AccountService) {
    this.langService.setCurrentLang();
  }

  ngOnInit() {
    this.darkmodeService.setCurrentTheme();
  }
}
