import { Component, OnInit } from '@angular/core';
import { DarkModeService } from '../services/dark-mode-service/dark-mode.service';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss']
})
export class NavBarComponent implements OnInit {

  constructor(public darkmodeService: DarkModeService) {
  }

  ngOnInit() {
    this.darkmodeService.setCurrentTheme();
  }

}
