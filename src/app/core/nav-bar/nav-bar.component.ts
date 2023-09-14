import { Component, OnInit } from '@angular/core';
import { DarkModeService } from '../services/dark-mode-service/dark-mode.service';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss']
})
export class NavBarComponent implements OnInit {

  constructor(public darkmodeService: DarkModeService, private translate: TranslateService) {
    this.translate.setDefaultLang('en');

  }

  ngOnInit() {
    this.darkmodeService.setCurrentTheme();
  }

}
